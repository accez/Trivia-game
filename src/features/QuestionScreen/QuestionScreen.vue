<script setup>
import QuestionComponent from './QuestionComponent.vue';
import {onBeforeMount,ref } from 'vue';

const props = defineProps({
  questionData:{
    type: Object,
    required:true
  }
});

const currentQuestion = ref(0);
const answers = ref([]);

/**
 * Adds answers to given array
 * 
 * @param {Array} array The array 
 * @param {*} incorrectAnswers The incorrect answers
 * @param {*} correctAnswers The correct answer
 */
const addAnswersToArray = (array, incorrectAnswers, correctAnswers) =>{
  return array.value = [...incorrectAnswers,correctAnswers];
};

/**
 * Changes the question
 * Function that changes the question adds the answers to an array and shuffles them.
 */
const changeQuestion = () =>{
  if(currentQuestion.value + 1 < props.questionData.results.length){
    currentQuestion.value++;
    let changedArray = addAnswersToArray(answers.value,props.questionData.results[currentQuestion.value].incorrect_answers,props.questionData.results[currentQuestion.value].correct_answer);
    shuffleAnswers(changedArray);
  }
};

const emit = () =>{
  changeQuestion();
};

/**
 * Shuffles the answers
 * 
 * @param {Array} array The array of answers
 */

const shuffleAnswers = (array) =>{
  return array.sort( () => Math.random() - 0.5);
};

onBeforeMount(() =>{
  let mountedArray = addAnswersToArray(answers.value,props.questionData.results[currentQuestion.value].incorrect_answers,props.questionData.results[currentQuestion.value].correct_answer);
  shuffleAnswers(mountedArray);
});

</script>

<template>
  <QuestionComponent
    :answers="answers"
    :question="props.questionData.results[currentQuestion].question"
    @clicked="emit"
  />
</template>

<style scoped>
</style>