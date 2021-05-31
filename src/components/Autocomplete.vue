<template lang="pug"> 
.autocomplete-container
  input.form-control.autocomplete-input(
    v-model="searchInput"
    :placeholder="placeholder"
    @input="() => dirty = true"
    @keydown.up="selectedIndex--"
    @keydown.down="selectedIndex++"
    @keydown.enter="handleEnter"
    @focus="$emit('selected')"
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
      dirty: false,
      selectedIndex: -1,
    }
  },
  watch: {
    searchInput(newInput) {
      if (!newInput || !this.showSuggestions) this.selectedIndex = -1
      if (!newInput) this.$emit('cleared')
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
    showSuggestions() {
      return this.dirty || !this.searchInput
    },
  },
  methods: {
    handleEnter() {
      if (this.dirty || this.selectedIndex >= 0) this.selectItem()
      else this.$emit('confirm')
    },
    selectItem(index) {
      const selected = index == undefined ? this.selectedItem : index
      this.searchInput = this.suggestionList[selected] || this.searchInput
      this.$emit('changed', this.searchOptions[this.searchInput])
      this.dirty = false
      this.selectedIndex = -1
    },
  },
}
</script>

<style lang="sass">
\:root
  --autocomplete-max-height: 75vh
  --autocomplete-z-index: 2
</style>

<style lang="sass" scoped>
.autocomplete
  &-container
    position: relative

  &-input
    padding: var(--space-md)
    width: 100%

  &-list:hover,
  &-input:focus + &-list
    display: block

  &-list
    display: none
    position: absolute
    top: 100%
    left: 0
    right: 0
    border: 1px solid var(--color-primary-light)
    border-bottom: none

  &-list
    max-height: var(--autocomplete-max-height)
    overflow: auto
    z-index: var(--autocomplete-z-index)
</style>
