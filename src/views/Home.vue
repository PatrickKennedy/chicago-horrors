<template lang="pug">
.home.container.max-width-md
  the-search.margin-top-xl
</template>

<script>
// @ is an alias to /src
import TheSearch from '#/TheSearch.vue'

export default {
  name: 'Home',
  components: {
    TheSearch,
  },
}
</script>

<style lang="sass" scoped>
.home
  display: flex
  flex-direction: column
  height: 100%
</style>
