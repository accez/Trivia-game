<script setup>
import ReplayComponent from './features/ResultScreen/ReplayComponent.vue';
import StartScreen from './features/StartScreen.vue';
import QuestionScreen from './features/QuestionScreen/QuestionScreen.vue';
import ResultScreen from './features/ResultScreen/ResultScreen.vue';
import { createRenderer, ref } from 'vue';
import * as databaseHelper from './features/ApiDataFetcher.js';

//Send this data as a prop to questions component
let questionsData =  ref([]);
const isStartScreen = ref(true);
const isResultScreen = ref(false);
const isFetching = ref(true);
let currentUserId;
let questionsURL;

const getCurrentUserId = (userId) =>
{
  currentUserId = userId;
};

const fetchQuestions = (url) =>
{
  questionsURL = url;
  databaseHelper.fetchDataFromApi(url,(fetchedData) =>
  {
    questionsData.value = fetchedData;
    console.log(isFetching.value);
    isDataFetched(questionsData.value);
    console.log(questionsData.value);
  });
};

/**
 * Sets isStartScreen to false.
 */
const startScreenNotShowing = () =>{
  return isStartScreen.value = false;
};

/**
 * Set isResultScreen to true to display the ResultScreen
 */
const setResultScreen = () =>{
  isResultScreen.value = true;
};

/**
 * Check if the data have been fetched
 * 
 * Function to see if the data you have provided has loaded.
 * If the data has loaded it sets isFetching to false.
 * 
 * @param {Array} data The data you want to check
 */
const isDataFetched = (data) =>{
  if(data.results.length > 0){
    isFetching.value = false;
  }
};

const onReplay = () =>{
  isResultScreen.value = false;
  isFetching.value = true;
  fetchQuestions(questionsURL);
};

const onToStartScreen = () =>{
  isResultScreen.value = false;
  isStartScreen.value = true;
  isFetching.value = true;
};

</script> 

<template>
  <div class="container">
    <StartScreen
      v-if="isStartScreen"
      @questions-api-url="fetchQuestions"
      @is-start-screen="startScreenNotShowing"
      @current-user-id="getCurrentUserId"
    />
    <div v-else-if="isFetching === true">
      loading...
    </div>
    <ResultScreen
      v-else-if="isResultScreen"
      :question-data="questionsData"
    />
    <QuestionScreen
      v-else-if="isStartScreen === false"
      :question-data="questionsData"
      @is-result-screen="setResultScreen"
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
