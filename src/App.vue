<script setup>
import StartScreen from './features/StartScreen.vue';
import QuestionScreen from './features/QuestionScreen/QuestionScreen.vue';
import { ref } from 'vue';
import * as databaseHelper from './features/ApiDataFetcher.js';

//Send this data as a prop to questions component
let questionsData =  ref([]);
const isStartScreen = ref(true);
const isFetching = ref(true);

const fetchQuestions = (url) =>
{
  databaseHelper.fetchDataFromApi(url,(fetchedData) =>
  {
    questionsData.value = fetchedData;
    isTheQuestionFetched();
  });
};

const startScreenNotShowing = () =>{
  return isStartScreen.value = false;
};

const isTheQuestionFetched = () =>{
  if(questionsData.value.results.length > 0){
    isFetching.value = false;
  }
};

</script> 

<template>
  <div class="container">
    <StartScreen
      v-if="isStartScreen"
      @questionsApiUrl="fetchQuestions"
      @is-start-screen="startScreenNotShowing"
    />
    <div v-else-if="isFetching === true">
      loading...
    </div>
    <QuestionScreen
      v-else
      :question-data="questionsData"
    />
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
