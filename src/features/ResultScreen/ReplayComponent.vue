<script setup>
const emits = defineEmits(['replay']);

const onReplayClicked = () => {
  emits('replay');
};
</script>

<template>
  <button @click="onReplayClicked">
    Replay
  </button>
  <br>
  <button>
    Go To StartScreen
  </button>
</template>

<style scoped>

</style>