<template>
  <div class="weather">
    <h2 v-if="weather.name" class="city">{{ weather.name }}</h2>
    <div>
      <p v-if="temp" class="temp text-primary">{{ temp }}</p>
      <p v-if="description">
        <img v-if="icon" :src="`http://openweathermap.org/img/w/${icon}.png`" :alt="description" class="weather-icon" width="50" height="50">
        <span class="weather-description pl-4 text-light">{{ description }}</span>
      </p>
      <p v-if="pressure" class="pressure weather-block">
        <span class="weather-label text-light">
          Pressure:
        </span>
        <span class="weather-value">
          {{ pressure }}
        </span>
      </p>
      <p v-if="windSpeed" class="weather-block">
        <span class="weather-label text-light">
        Wind:
        </span>
        <span class="weather-value weather-value-wind wind">
          {{ windSpeed }}
          <span v-if="windDirection" class="wind-direction">
            <span class="wind-direction-arrow" :style="`transform: translate(-50%, -50%) rotate(${windDirection}deg)`">&darr;</span>
          </span>
        </span>
      </p>
    </div>
    <!-- <button class="btn btn-primary">Save for offline use</button> -->
  </div>
</template>

<script>
export default {
  name: 'DisplayWeather',
  props: {
    weather: {
      type: Object
    }
  },
  computed: {
    description () {
      return this.weather.weather[0].description;
    },
    icon () {
      return this.weather.weather[0].icon;
    },
    humidity () {
      return this.weather.main.humidity;
    },
    temp () {
      return Number(this.weather.main.temp) - 272.15 + '°C';
    },
    pressure () {
      return this.weather.main.pressure + ' hPa';
    },
    windSpeed () {
      return `${this.weather.wind.speed} m/s`;
    },
    windDirection () {
      return this.weather.wind.deg;
    }
  }
}
</script>

<style lang="scss">
  $gray: #999;

  .weather {
    border: 1px solid rgba(255, 255, 255, .2);
    display: inline-flex;
    flex-direction: column;
    padding: 20px 40px;

    &-block {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .city {
    font-size: 2.5rem;
    font-weight: 300;
  }

  .temp {
    font-size: 3rem;
    margin: 0;
  }

  .wind {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &-direction {
      position: relative;
      display: inline-block;
      width: 1em;
      height: 1em;
      margin-left: .5em;

      &-arrow {
        position: absolute;
        left: 50%;
        top: 50%;
        font-size: 1.5em;
      }
    }
  }

  h2, p {
    margin: .25em 0;
  }
</style>
