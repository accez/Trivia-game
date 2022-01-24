<script setup>
import QuestionComponent from './QuestionComponent.vue';
import {onBeforeMount, reactive,ref } from 'vue';
const currentQuestion = ref(0);
const answers = ref([]);
const questions = reactive({
  results: [
    {
      question:"In the book &quot;The Martian&quot;, how long was Mark Watney trapped on Mars (in Sols)?",
      correct_answer: "549 Days",
      incorrect_answers: [
        "765 Days",
        "401 Days",
        "324 Days"
      ]
    },
    {
      question:"Which of these elements on the Periodic Table is a Noble Gas?",
      correct_answer:"Neon",
      incorrect_answers: [
        "Potassium",
        "Iodine",
        "Colbalt"
      ]
    },{
      question:"What bird is born with claws on its wing digits?",
      correct_answer:"Hoatzin",
      incorrect_answers: [
        "Cormorant",
        "Cassowary",
        "Secretary bird"
      ]
    }
  ]
});

const addAnswersToArray = (array, incorrectAnswers, correctAnswers) =>{
  return array.value = [...incorrectAnswers,correctAnswers];
};

const changeQuestion = () =>{
  if(currentQuestion.value + 1 < questions.results.length){
    currentQuestion.value++;
    let changedArray = addAnswersToArray(answers.value,questions.results[currentQuestion.value].incorrect_answers,questions.results[currentQuestion.value].correct_answer);
    shuffleAnswers(changedArray);
  }
};

const emit = () =>{
  changeQuestion();
};

const shuffleAnswers = (array) =>{
  return array.sort( ()=>Math.random()-0.5 );
};

onBeforeMount(() =>{
  let mountedArray = addAnswersToArray(answers.value,questions.results[currentQuestion.value].incorrect_answers,questions.results[currentQuestion.value].correct_answer);
  shuffleAnswers(mountedArray);
});

</script>

<template>
  <QuestionComponent
    :answers="answers"
    :question="questions.results[currentQuestion].question"
    @clicked="emit"
  />
</template>

<style scoped>
</style>