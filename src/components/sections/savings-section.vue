<template>
  <heading-section
    has-expand-button
    :name="$t('savings.lblSavings')"
    navigate-to-name="savings-manage"
  >
    <template v-slot:heading>
      {{ $t('savings.lblSavingsHeader', { amount: totalAmountInSavings }) }}
    </template>

    {{
      $t('savings.lblSavingsEarnedTodaySection', {
        amount: amountEarnedToday
      })
    }}
  </heading-section>
</template>

<script lang="ts">
import Vue from 'vue';

import HeadingSection from './heading-section.vue';

export default Vue.extend({
  name: 'SavingsSection',
  components: {
    HeadingSection
  },
  data() {
    return {
      totalAmountInSavings: '$22,984.49',
      amountEarnedToday: '+$24.89'
    };
  }
});
</script>
