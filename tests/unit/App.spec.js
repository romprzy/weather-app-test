import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

// const vm = wrapper.vm;

describe('App', () => {
  test('Renders title corectly', () => {
    const title = 'Test title';
    const wrapper = shallowMount(App, {
      data () {
        return { title }
      }
    });

    expect(wrapper.html()).toContain(title);
  })
})
