import { mount } from '@vue/test-utils'
import Message from '@/components/Message.vue'

describe('Default state of Message', () => {
  const wrapper = mount(Message, {
    propsData: {
      message: 'some value'
    }
  })

  it('message to be "some value"', () => {
    expect(wrapper.props().message).toBe('some value')
  })

  it('renders message"', () => {
    expect(wrapper.html()).toContain('some value');
  })
})
