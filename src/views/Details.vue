<template lang="pug">
.details
  .card.grid 
    .content.col
      .grid
        .detail-name.col {{ inspectionData.aka_name }}
          span.margin-left-xxs.detail-license (LICENSE \#{{ inspectionData.license_ }})
        .detail-date.col {{ inspectionData.inspection_date }}
      .grid
        .detail-type.col {{ inspectionData.inspection_type }}
        .detail-results.col {{ inspectionData.results }}
      .detail-violations
        .detail-violation(v-for="violation in violations") {{ violation }}

</template>

<script>
import { getInspection } from '@/api'

export default {
  name: 'inspection-details',
  data() {
    return {
      inspectionData: {},
    }
  },
  async created() {
    const result = await getInspection(this.$route.query.id)
    if (result.error) return // TODO: add error handling
    this.inspectionData = result.data[0]
  },
  computed: {
    violations() {
      let violations = this.inspectionData.violations || ''
      return violations.split(' | ')
    },
  },
}
</script>

<style lang="sass" scoped>
.card
  background-color: var(--color-white)
</style>
