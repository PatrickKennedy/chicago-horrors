<template lang="pug">
.container.search
  autocomplete(
    :searchOptions="searchOptions.inspection_type"
    @changed="performQuery"
    @selected="loadFieldOptions('inspection_type')")
  .results
    search-result(v-for="result in results" :value="result")
</template>

<script>
// @ is an alias to /src
import api, { search } from '@/api'
import Autocomplete from '#/Autocomplete.vue'
import SearchResult from '#/SearchResult.vue'

export default {
  name: 'the-search',
  components: {
    Autocomplete,
    SearchResult,
  },
  data() {
    return {
      searchOptions: {},
      results: [],
    }
  },
  methods: {
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
    async performQuery([, fields]) {
      this.results = (await search({ inspection_type: fields })).data
    },
  },
}
</script>
