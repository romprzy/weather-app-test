import { mount } from '@vue/test-utils'
import App from '@/App.vue'

// const vm = wrapper.vm;

describe('App.vue', () => {
  test('Do not show message by default', () => {
    const message = false;
    const wrapper = mount(App, {
      data () {
        return { message }
      }
    });

    expect(wrapper.html()).not.toContain('alert alert-danger');
  })

  test('Show message container when passed', () => {
    const message = 'some message';
    const wrapper = mount(App, {
      data () {
        return { message }
      }
    });

    expect(wrapper.html()).toContain('alert alert-danger');
  })
})
