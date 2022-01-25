<script setup>
const emits = defineEmits(['replay','to-start-screen']);

const onReplayClicked = () => {
  emits('replay');
};

const onStartScreenClicked = () => {
  emits('to-start-screen');
};

</script>

<template>
  <button @click="onReplayClicked">
    Replay
  </button>
  <br>
  <button @click="onStartScreenClicked">
    Go To StartScreen
  </button>
</template>

<style scoped>

</style>