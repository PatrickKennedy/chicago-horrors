<template lang="pug">
input(
  :value=value
  @input="handleInput"
  @keydown.enter="$emit('confirm')"
  :attrs="$attrs"
  :listeners="$listeners"
)
</template>

<script>
/** Input wrapper to add a "cleared" event when it's empty */
export default {
  name: 'search-input',
  props: ['value'],
  methods: {
    handleInput($evt) {
      const value = $evt.target.value
      this.$emit('input', value)
      if (!value) this.$emit('cleared')
    },
  },
}
</script>
