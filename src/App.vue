<template lang="pug">
#app
  the-header
  router-view.container.max-width-md
</template>

<script>
import TheHeader from '#/TheHeader.vue'

export default {
  name: 'app',
  components: { TheHeader },
}
</script>

<style lang="sass">
html, body
  height: 100%

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: var(--color-contrast-high)
</style>
