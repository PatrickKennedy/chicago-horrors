<template lang="pug">
header.header
  .container.flex.justify-content-between.max-width-lg
    router-link(to="/").branding Chicago Horrors
    .acknowledgement
      | Data provided by 
      | 
      a(href="https://data.cityofchicago.org/") City of Chicago

    
  
</template>

<script>
export default {
  name: 'the-header',
  components: {},
  mixins: [],
  props: {},
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

<style lang="sass">
\:root
  --header-height: 3.5rem
</style>

<style lang="sass" scoped>
.header
  height: var(--header-height)
  width: 100%
  background-color: var(--color-white)
  box-shadow: var(--color-primary) 1px 3px

  .container
    height: 100%
    display: flex
    justify-content: space-between
    align-items: center
</style>
