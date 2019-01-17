<template>
  <WeatherDisplay v-if="weather" :weather="weather" />
</template>

<script>
import WeatherDisplay from './WeatherDisplay';

export default {
  components: {
    WeatherDisplay
  },
  data () {
    return {
      message: false,
      weather: false,
      location: {},
    }
  },
  methods: {
    getLocation () {
      if (navigator && navigator.hasOwnProperty('geolocation') && navigator.geolocation !== undefined) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.location = {
              lat: position.coords.latitude,
              lon: position.coords.longitude
            }
          },
          error => {
            this.message = error.message;
          }
        );
      } else {
        this.message = 'Geolocation is not available on this device.';
      }
    }
  },
  created () {
    this.getLocation()
  }
}
</script>
