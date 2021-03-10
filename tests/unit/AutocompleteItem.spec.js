import { shallowMount } from '@vue/test-utils'
import AutocompleteItem from '#/AutocompleteItem.vue'

describe('AutocompleteItem.vue', () => {
  it('renders its value', () => {
    const value = 'breakfast'
    const wrapper = shallowMount(AutocompleteItem, {
      propsData: { value },
    })
    expect(wrapper.text()).toMatch(value)
  })

  it('splits text when passed a matchLength', () => {
    const value = 'breakfast'
    const matchLength = 4
    const wrapper = shallowMount(AutocompleteItem, {
      propsData: { value, matchLength },
    })
    expect(wrapper.text()).toMatch(value)

    const splits = wrapper.findAll('span')

    expect(splits.at(0).classes()).toContain('bold')
    expect(splits.at(0).text()).toContain('brea')
    expect(splits.at(1).text()).toContain('kfast')
  })
})
