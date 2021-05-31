<template lang="pug"> 
li.autocomplete-item(
  :class="{active}"
  @click="$emit('selected', value)"
)
  span.bold {{ splitHighlight[0] }}
  span {{ splitHighlight[1] }}
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'autocomplete-item',
  components: {},
  mixins: [],
  props: {
    value: {
      type: String,
      required: true,
    },
    matchLength: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },

  created() {},
  mounted() {},
  watch: {},
  computed: {
    splitHighlight() {
      return [
        this.value.slice(0, this.matchLength || 0),
        this.value.slice(this.matchLength || 0),
      ]
    },
  },
  methods: {},
}
</script>

<style lang="sass" scoped>
.autocomplete-item
  text-align: left
  padding: .75em
  cursor: pointer
  background-color: var(--color-white)
  border-bottom: 1px solid var(--color-primary-light)

  &:hover
    background-color: var(--color-contrast-lower)

  &.active
    color: var(--color-white)
    background-color: var(--color-accent)

  & .bold
    font-weight: bold
</style>
