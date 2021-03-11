<template lang="pug"> 
card.search-result
  .grid 
    .content.col
      .grid
        .result-name.col {{ value.aka_name }}
          span.margin-left-xxs.result-license (LICENSE \#{{ value.license_ }})
        .result-date.col {{ value.inspection_date }}
      .grid
        .result-type.col {{ value.inspection_type }}
        .result-results.col {{ value.results }}
    .action.col-1.grid
      router-link.breakout-link(:to="{ name: 'details', query: { id: value.inspection_id } }") >
</template>

<script>
import Card from '#/Card.vue'
// eslint-disable-next-line no-unused-vars
const example = {
  inspection_id: '317219',
  dba_name: 'ST JEROME SCHOOL',
  aka_name: 'ST JEROME SCHOOL',
  license_: '2275640',
  facility_type: 'School',
  risk: 'Risk 3 (Low)',
  address: '2801 S PRINCETON AVE BLDG ',
  city: 'CHICAGO',
  state: 'IL',
  zip: '60616',
  inspection_date: '2010-07-22T00:00:00.000',
  inspection_type: 'CANVASS/SPECIAL EVENT',
  results: 'Pass',
  violations:
    '31. CLEAN MULTI-USE UTENSILS AND SINGLE SERVICE ARTICLES PROPERLY STORED: NO REUSE OF SINGLE SERVICE ARTICLES - Comments: INVERT/PROTECT ALL MULTI-USE UTENSILS | 32. FOOD AND NON-FOOD CONTACT SURFACES PROPERLY DESIGNED, CONSTRUCTED AND MAINTAINED - Comments: RUSTY SURFACES AND CHIP PAINT SERVICES, SEAL/REPLACE ALL RUSTY SHELVES IN WALK-IN COOLER AND BEVERAGE COOLER BEHIND BAR AREA, ALSO SHELVES OF PREP TABLE IN KITCHEN. | 34. FLOORS: CONSTRUCTED PER CODE, CLEANED, GOOD REPAIR, COVING INSTALLED, DUST-LESS CLEANING METHODS USED - Comments: REPLACE ALL MISSING/BROKEN FLOOR TILES IN 1ST FLOOR BOYS AND GIRLS WASHROOMS AND THROUGHOUT WHERE NEEDED.  DETAIL CLEAN FLOORS THROUGHOUT, BEHIND/UNDER ALL HEAVY EQUIPTMENT,CORNERS AND IN WALK-IN COOLERS. | 35. WALLS, CEILINGS, ATTACHED EQUIPMENT CONSTRUCTED PER CODE: GOOD REPAIR, SURFACES CLEAN AND DUST-LESS CLEANING METHODS - Comments: WALLS AND CEILINGS OF ALL ROOMS IN WHICH FOOD OR DRINK IS STORED, SOLD, PREPARD, COOKED, OR IN WHICH UTENSILS AND EQUIPTMENT ARE WASHED SHALL BE CLEAN, NON-ABSORBENT, SMOOTH, WASHABLE AND SHALL BE PAINTED OR FINISHED IN LIGHT COLOR. PG 91 SEC.B OF CONSTRUCTION AND MAINTENANCE OF BUILDING FACILITIES IN THE FOOD SANITATION MUNICIPAL CODE OF THE CITY OF CHICAGO. REMOVING SOAP AND PAPER TOWEL DISPENSERS ABOVE THE 3 COMP SINK IN KITCHEN. WALLS IN KITCHEN PREP AREA | 38. VENTILATION: ROOMS AND EQUIPMENT VENTED AS REQUIRED: PLUMBING: INSTALLED AND MAINTAINED - Comments: DETAIL CLEAN ALL FILTERS OVER COOKING EQUIPTMENT AND VENT COVERS THROUGHOUT, REMOVING ALL DUST ETC',
  latitude: '41.84251537227376',
  longitude: '-87.63406529386454',
  location: {
    type: 'Point',
    coordinates: [41.84251537227376, -87.63406529386454],
  },
}

export default {
  name: 'search-result',
  components: { Card },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },

  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
}
</script>

<style lang="sass" scoped>
.search-result
  position: relative
  margin-top: var(--space-sm)

.breakout-link::before
  content: ""
  display: block
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
</style>
