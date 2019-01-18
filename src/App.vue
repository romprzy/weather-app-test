<template>
  <div id="app" class="text-center">
    <h1 class="text-secondary">{{ title }}</h1>

    <Message v-if="message" :message="message" />

    <GetWeather @message="getMessage" />
  </div>
</template>

<script>
import Message from '@/components/Message';
import GetWeather from '@/components/GetWeather';

export default {
  name: 'app',
  components: {
    Message,
    GetWeather
  },
  data () {
    return {
      title: 'Weather app',
      message: false
    }
  },
  methods: {
    getMessage (message) {
      this.message = message;
    }
  }
}
</script>

<style lang="scss">
  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-weight: 300;
  }

  h1 {
    font-weight: 300;
    font-size: 2.5rem;
    margin-bottom: 1em;
  }

  .spinner {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, .75);
    transition: background .35s;
  }

  .status-icon {
    display: inline-block;
    border-radius: 50%;
    width: .75rem;
    height: .75rem;
    margin-right: .5em;
    vertical-align: baseline;
  }
</style>
