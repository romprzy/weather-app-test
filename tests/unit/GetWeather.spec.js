import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import GetWeather from '@/components/GetWeather.vue'

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
    expect(vm.location).toEqual({})
  })

  it('get message when try to use geolocation', () => {
    expect(vm.message).toBeTruthy();
    expect(typeof vm.message).toBe('string');
  })
})

describe('geolocation test', () => {
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
        })
        // (error) => Promise.reject(error({
        //   message: 'Geolocation is not available'
        // }))
        ))
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

    // describe('Geolocation rejects', () => {
    //   // const mockGeolocation = {
    //   //   getCurrentPosition: jest.fn()
    //   //     .mockImplementationOnce(
    //   //       (success) => Promise.resolve(success({
    //   //         coords: {
    //   //           latitude: lat,
    //   //           longitude: lon
    //   //         }
    //   //       })),
    //   //       (error) => Promise.reject(error({
    //   //         message: 'Geolocation is not available'
    //   //       }))
    //   //     )
    //   // }

    //   // navigator.geolocation = mockGeolocation;

    //   it('location is empty object', async () => {
    //     // expect.assertions(1);
    //     await vm.getLocation();

    //     expect(vm.location).toEqual({})
    //   })

    //   it('message is equal to "Geolocation is not available"', async () => {
    //     // expect.assertions(1);
    //     await vm.getLocation();

    //     expect(vm.message).toBe('Geolocation is not available')
    //   })
    // })
  })
})
