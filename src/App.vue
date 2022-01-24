<script setup>
import StartScreen from './features/StartScreen.vue';
import QuestionScreen from './features/QuestionScreen/QuestionScreen.vue';
import { ref, reactive, onMounted } from 'vue';
import * as databaseHelper from './features/ApiDataFetcher.js';

//Send this data as a prop to questionscomponent
let questionsData = ref([]);
const startScreen = ref(false);

const fetchQuestions = (url) =>
{
  databaseHelper.fetchDataFromApi(url,(fetchedData) =>
  {
    questionsData.value = fetchedData;
    console.log(fetchedData);
    setTimeout(() => console.log(questionsData.value), 1000);
  });
};

</script>

<template>
  <div class="container">
    <StartScreen
      v-if="startScreen"
      @questionsApiUrl="fetchQuestions"
    />
    <QuestionScreen v-else />
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
