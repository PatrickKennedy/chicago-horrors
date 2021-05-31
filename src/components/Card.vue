<template lang="pug">
.card
  slot
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'boiler-plate',
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
  --card-padding: var(--space-sm)
</style>

<style lang="sass" scoped>
.card
  padding: var(--card-padding)
  background-color: var(--color-white)
  border: var(--color-primary) 1px solid
  box-shadow: var(--color-primary) 0px 3px
  border-radius: .25rem
</style>
