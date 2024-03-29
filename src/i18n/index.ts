import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './messages/en';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en
  }
});

const loadedLanguages = ['en']; // our default language that is preloaded

export function setI18nLanguage(lang: string): string {
  i18n.locale = lang;
  // axios.defaults.headers.common["Accept-Language"] = lang;
  document.querySelector('html')?.setAttribute('lang', lang);
  return lang;
}

export function loadLanguageAsync(lang?: string): Promise<string> {
  if (lang == null) {
    return Promise.resolve(setI18nLanguage(i18n.locale));
  }

  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language hasn't been loaded yet
  return import(
    /* webpackChunkName: "lang-[request]" */ `@/i18n/messages/${lang}.ts`
  )
    .then((messages) => {
      i18n.setLocaleMessage(lang, messages.default);
      loadedLanguages.push(lang);
      return setI18nLanguage(lang);
    })
    .catch(() => Promise.resolve(setI18nLanguage(i18n.locale)));
}

export default i18n;
