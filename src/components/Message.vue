<template>
  <div class="alert alert-danger">
    {{ message }}<br>
    Please try again later...
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String
    }
  }
}
</script>
