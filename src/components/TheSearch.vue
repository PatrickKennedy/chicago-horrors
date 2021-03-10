<template lang="pug">
.container.search
  autocomplete(:searchOptions="searchOptions" @changed="performQuery")
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
  async created() {
    const result = await api.getFieldOptions('inspection_type')
    if (result.error) return // TODO: add error handling
    this.searchOptions = api.utils.normalizeAndGroupOptions(result)
  },
  methods: {
    async performQuery([, fields]) {
      this.results = (await search({ inspection_type: fields })).data
    },
  },
}
</script>
