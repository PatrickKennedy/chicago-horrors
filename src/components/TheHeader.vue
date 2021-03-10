<template lang="pug">
header.header
  .container.max-width-lg
    router-link(to="/").branding Chicago Horrors
    
  
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
  --header-height: 3rem
</style>

<style lang="sass" scoped>
.header
  height: var(--header-height)
  width: 100%
  background-color: var(--color-white)

  .container
    height: 100%
    display: flex
    justify-content: space-between
    align-items: center
</style>
