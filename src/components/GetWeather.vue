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
      weather: false
    }
  }
}
</script>
