<script setup>
import QuestionScreen from './features/QuestionScreen/QuestionScreen.vue';

</script>

<template>
  <div class="container"> 
    <QuestionScreen />
  </div>
</template>

<style>

body{
  margin:0px;
}

.container{
    width: 60vw;
    height: 60vh;
    background-color: #fff;
}
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #2c3e50;
}
</style>
