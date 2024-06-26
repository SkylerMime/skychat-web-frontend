import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ChatFrame from '../ChatFrame.vue'

describe('ChatFrame', () => {
  it('renders properly', () => {
    const wrapper = mount(ChatFrame)
    expect(wrapper.text()).toContain('Alice')
  })
})
