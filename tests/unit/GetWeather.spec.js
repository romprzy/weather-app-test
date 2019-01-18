// import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import GetWeather from '@/components/GetWeather.vue'

// const fetch = jest.fn(() => new Promise(resolve => resolve()));

describe('Default state of GetWeather', () => {
  const defaultData = GetWeather.data();
  const methods = GetWeather.methods;

  it('message to be falsy', () => {
    expect(defaultData.message).toBeFalsy()
  })

  it('weather to be falsy', () => {
    expect(defaultData.weather).toBeFalsy()
  })

  it('location to be empty object', () => {
    expect(defaultData.location).toEqual({})
  })

  it('getLocation to be function', () => {
    expect(typeof methods.getLocation).toBe('function');
  })
})

describe('geolocation test - geolocation does not work on device', () => {
  navigator.geolocation = undefined;
  const wrapper = shallowMount(GetWeather);
  const vm = wrapper.vm;

  it('does not set location when geolocation is not available', () => {
    expect(vm.location).toBeFalsy()
  })

  it('get message when try to use geolocation', () => {
    expect(vm.message).toBeTruthy();
    expect(typeof vm.message).toBe('string');
  })
})

describe('geolocation test success', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = shallowMount(GetWeather);
    vm = wrapper.vm;

    const mockGeolocation = {
      getCurrentPosition: jest.fn()
        .mockImplementationOnce((success) => Promise.resolve(success({
          coords: {
            latitude: lat,
            longitude: lon
          }
        })))
    }

    navigator.geolocation = mockGeolocation;
  })

  const lat = 51.1;
  const lon = 45.3

  describe('geolocation success', () => {
    it('Geolocation success', async () => {
      expect.assertions(1);
      await vm.getLocation();

      expect(vm.location).toEqual({
        lat: lat,
        lon: lon
      })
    })
  })
})

describe('Geolocation test rejects', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = shallowMount(GetWeather, {
      data () {
        return {
          location: false,
          weather: false
        }
      }
    });
    vm = wrapper.vm;

    vm.getFromLocalStorage = jest.fn();
    vm.saveToLocalStorage = jest.fn();

    const mockGeolocation = {
      getCurrentPosition: jest.fn()
        .mockRejectedValueOnce(new Error('Geolocation is not available'))
    }

    navigator.geolocation = mockGeolocation;
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('location is empty object', async () => {
    expect.assertions(1);
    await vm.getLocation();

    vm.$nextTick(() => {
      expect(vm.location).toBeFalsy()
    })
  })

  // it('message is equal to "Geolocation is not available"', async () => {
  //   expect.assertions(1);
  //   await vm.getLocation();

  //   expect(vm.message).toBe('Geolocation is not available')
  //   // vm.$nextTick(() => {
  //   //   expect(vm.message).toBe('Geolocation is not available')
  //   // })
  // })
})

describe('getWeather tests', () => {
  const defaultData = GetWeather.data();
  // const methods = GetWeather.methods;

  // const wrapper = shallowMount(GetWeather)

  it('data.offline === true', () => {
    expect(defaultData.offline).toBe(true)
  })

  it('data.weather === false', () => {
    expect(defaultData.weather).toBe(false)
  })
})
