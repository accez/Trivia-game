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

const addAnswersToArray = (array, incorrectAnswers, correctAnswers) =>{
  return array.value = [...incorrectAnswers,correctAnswers];
};

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