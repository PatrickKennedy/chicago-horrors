<template lang="pug"> 
.autocomplete-container
  input.autocomplete-input(
    v-model="searchInput"
    :placeholder="placeholder"
    @keydown.up="selectedIndex--"
    @keydown.down="selectedIndex++"
    @keydown.enter="selectItem(null)"
  )
  ul.autocomplete-list(v-if="showSuggestions")
    template(v-if="suggestionList.length")
      autocomplete-item(
        v-for="(result, i) in suggestionList" :key="result"
        :value="result"
        :matchLength="searchLength"
        :active="selectedItem == i"
        @selected="selectItem(i)"
      )
    autocomplete-item(v-else-if="searchInput.length" value="No matches found.")
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import AutocompleteItem from '#/AutocompleteItem.vue'

export default {
  name: 'autocomplete',
  components: { AutocompleteItem },
  mixins: [],
  props: {
    placeholder: {
      type: String,
      default: 'What are you looking for?',
    },
    searchOptions: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      searchInput: '',
      selectedIndex: -1,
    }
  },
  watch: {
    searchInput(newInput, oldInput) {
      if (newInput === oldInput) return
      if (this.exactMatch) this.selectItem(0)
      if (!newInput || !this.showSuggestions) this.selectedIndex = -1
    },
  },
  computed: {
    normalizedInput() {
      return this.searchInput.toLowerCase()
    },
    searchLength() {
      return this.searchInput.length
    },
    /** cycle through items when reaching the end */
    selectedItem() {
      return this.selectedIndex < 0
        ? -1
        : this.selectedIndex % this.suggestionList.length
    },
    suggestionList() {
      const options = Object.keys(this.searchOptions)
      const suggestionList = this.normalizedInput
        ? options.filter(opt => opt.startsWith(this.normalizedInput))
        : options
      return suggestionList
    },
    exactMatch() {
      return this.normalizedInput === this.suggestionList[0]
    },
    showSuggestions() {
      return !this.exactMatch
    },
  },
  methods: {
    selectItem(index) {
      const selected = index == undefined ? this.selectedItem : index
      this.searchInput = this.suggestionList[selected] || this.searchInput
      this.$emit('changed', [
        this.searchInput,
        this.searchOptions[this.searchInput],
      ])
    },
  },
}
</script>

<style lang="sass">
\:root
  --autocomplete-max-height: 150px
</style>

<style lang="sass" scoped>
.autocomplete
  &-container
    position: relative
    display: flex
    flex: 1

  &-input
    flex: 1
    padding: 1.25em
    border-radius: 5px
    border: none

  &-list:hover,
  &-input:focus + &-list
    display: block

  &-list
    display: none
    position: absolute
    top: 100%
    left: 0
    right: 0
    border: 1px solid var(--color-contrast-medium)
    border-bottom: none

  &-list
    max-height: var(--autocomplete-max-height)
    overflow: auto
</style>
