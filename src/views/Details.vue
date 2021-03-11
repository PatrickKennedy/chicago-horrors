<template lang="pug">
.details.padding-top-md
  .grid.gap-sm(v-if="inspectionData")
    .data(class="col-12 col-6@md")
      card.margin-bottom-sm
        .grid
          .name.col {{ inspectionData.aka_name }}
            span.license.margin-left-xxs (LICENSE \#{{ inspectionData.license_ }})
          .date.col {{ inspectionData.inspection_date }}
        .grid
          .type.col {{ inspectionData.inspection_type }}
          .results.col {{ inspectionData.results }}

      card.location
        iframe(:src="mapSrc" width="100%" height="300px")

    .violations(class="col-12 col-6@md")
      template(v-if="violations")
        card.violation(v-for="violation in violations") 
          .violation-code {{ violation.code }}
          .violation-comment {{ violation.comment }}
      card.violation(v-else)
        | No Violations Recorded
  card(v-else-if="errorData")
    .error An error occurred loading inspection data
      .error-details {{ errorData }}
  card(v-else)
    | Loading...
</template>

<script>
import { getInspection } from '@/api'
import Card from '#/Card.vue'

export default {
  name: 'inspection-details',
  components: { Card },
  data() {
    return {
      inspectionData: null,
      errorData: null,
    }
  },
  async created() {
    const result = await getInspection(this.$route.query.id)
    if (result.error) {
      this.errorData = result.error
      return
    }
    this.inspectionData = result.data[0]
  },
  computed: {
    violations() {
      let violations = this.inspectionData.violations
      if (!violations) return null
      return violations.split(' | ').map(item => {
        const [code, comment] = item.split(' - Comments: ')
        return {
          code,
          comment,
        }
      })
    },
    address() {
      return [
        this.inspectionData.address,
        this.inspectionData.city,
        this.inspectionData.state,
        this.inspectionData.zip,
      ].join(' ')
    },
    mapSrc() {
      const apiKey = 'AIzaSyDlNs1lUttoEK3VyOac3reod5Fp4NaUX5k'
      const q = encodeURIComponent(this.address)
      return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${q}`
    },
  },
}
</script>

<style lang="sass" scoped>
.violation
  margin-bottom: var(--space-sm)
</style>
