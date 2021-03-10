import { shallowMount } from '@vue/test-utils'
import Autocomplete from '#/Autocomplete.vue'
import AutocompleteItem from '#/AutocompleteItem.vue'

describe('Autocomplete.vue', () => {
  it('component compiles w/ a default placeholder', () => {
    const wrapper = shallowMount(Autocomplete)
    expect(wrapper.find('input').attributes().placeholder).toBeTruthy()
  })

  it('placeholder is reflected in dom', () => {
    const placeholder = 'Choose a meal'
    const wrapper = shallowMount(Autocomplete, {
      propsData: {
        placeholder,
      },
    })
    expect(wrapper.find('input').attributes().placeholder).toEqual(placeholder)
  })

  it('suggestions render', () => {
    const searchOptions = {
      breakfast: ['bacon', 'eggs'],
      lunch: ['blt', 'tomato soup'],
    }
    const wrapper = shallowMount(Autocomplete, {
      propsData: {
        searchOptions,
      },
    })

    const itemList = wrapper.find('.autocomplete-list')
    const items = wrapper.findAllComponents(AutocompleteItem) /*?*/

    expect(items).toHaveLength(2)
    expect(items.exists()).toBe(true)

    items.wrappers.forEach(item => {
      expect(searchOptions[item.props().value]).toBeTruthy()
    })

    expect(itemList.exists()).toBe(true)
  })
})
