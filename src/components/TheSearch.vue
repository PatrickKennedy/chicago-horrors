<template lang="pug">
.container
  .search.grid.gap-sm.justify-between
    autocomplete(
      class="col-12 col-4@md"
      v-for="(placeholder, field) in autocompleteFields" :key="field"
      :placeholder="placeholder"
      :searchOptions="searchOptions[field]"
      @changed="selection => fuzzyTerms[field] = selection"
      @cleared="() => $delete(fuzzyTerms, field)"
      @selected="loadFieldOptions(field)"
    )
    search-input.form-control(
      class="col-12 col-3@md"
      placeholder="Search comments"
      v-model="textTerms['violations']"
      @cleared="() => $delete(exactTerms, 'inspection_id')"
    )
    search-input.form-control(
      class="col-12 col-3@md"
      placeholder="License #"
      v-model="exactTerms['license_']"
      @cleared="() => $delete(exactTerms, 'inspection_id')"
    )
    search-input.form-control(
      class="col-12 col-3@md"
      placeholder="Inspection ID"
      v-model="exactTerms['inspection_id']"
      @cleared="() => $delete(exactTerms, 'inspection_id')"
    )
    button.btn(
      class="col-12 col-3@md"
      @click="performQuery"
    ) Search
  
  .results.margin-top-lg
    template(v-if="results && results.length")
      search-result(v-for="result in results" :key="result.inspection_id" :value="result")

    card.margin-top-lg(v-else-if="results")
      | No Results Found

</template>

<script>
// @ is an alias to /src
import api, { search } from '@/api'
import Autocomplete from '#/Autocomplete.vue'
import SearchResult from '#/SearchResult.vue'
import SearchInput from '#/SearchInput.vue'
import Card from '#/Card.vue'

export default {
  name: 'the-search',
  components: {
    Autocomplete,
    SearchResult,
    SearchInput,
    Card,
  },
  data() {
    return {
      autocompleteFields: {
        inspection_type: 'Inspection Type',
        facility_type: 'Facility Type',
        results: 'Results',
      },
      searchOptions: {},
      fuzzyTerms: {},
      exactTerms: {},
      textTerms: {},
      results: null,
    }
  },
  methods: {
    setOrClear(terms, field, value) {
      value ? (terms[field] = value) : this.$delete(terms, field)
    },
    async loadFieldOptions(field) {
      if (this.searchOptions[field]) return
      const result = await api.getFieldOptions(field)
      if (result.error) return // TODO: add error handling
      this.$set(
        this.searchOptions,
        field,
        api.utils.normalizeAndGroupOptions(result)
      )
    },
    async performQuery() {
      this.results = (
        await search({
          fuzzy: this.fuzzyTerms,
          exact: this.exactTerms,
          text: this.textTerms,
        })
      ).data
    },
  },
}
</script>
