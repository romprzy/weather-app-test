<template>
  <DisplayWeather v-if="weather" :weather="weather" />
</template>

<script>
import DisplayWeather from './DisplayWeather';

export default {
  components: {
    DisplayWeather
  },
  data () {
    return {
      message: false,
      api: {
        base_url: 'https://api.openweathermap.org/data/2.5/weather',
        appid: 'ade7a099018e4beaa468a7b3dbab2c04'
      },
      loading: false,
      offline: true,
      location: false || this.getFromLocalStorage('location'),
      weather: false || this.getFromLocalStorage('weather')
    }
  },
  computed: {
    url () {
      let location = {};
      if (this.location && this.location.lat && this.location.lon) {
        location = `lat=${this.location.lat}&lon=${this.location.lon}`;
      }

      return `${this.api.base_url}?appid=${this.api.appid}&${location}`;
    }
  },
  methods: {
    getLocation () {
      if (navigator && 'geolocation' in navigator && navigator.geolocation !== undefined) {
        navigator.geolocation.getCurrentPosition(
          position => {
            // console.log(position);
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
    },
    getWeather () {
      this.loading = true;
      fetch (this.url)
        .then(response => {
          return response.json();
        })
        .then(body => {
          this.weather = body;
          this.saveToLocalStorage('weather', body);
          this.loading = false;
          this.offline = false;
        })
        .catch (error => {
          this.loading = false;
          this.offline = true;
          if ('message' in error) {
            this.message = error.message;
          }
        })
    },
    getFromLocalStorage (item) {
      const data = JSON.parse(localStorage.getItem(item));
      return data;
    },
    saveToLocalStorage (item, data) {
      localStorage.setItem(item, data);
    }
  },
  created () {
    this.getLocation()
  },
  watch: {
    location () {
      if (this.location) {
        this.getWeather(this.location);
        this.saveToLocalStorage ('location', JSON.stringify(this.location));
      }
    },
    weather () {
      if (this.weather) {
        this.saveToLocalStorage ('weather', JSON.stringify(this.weather));
      }
    },
    message () {
      this.$emit('message', this.message);
    }
  }
}
</script>
