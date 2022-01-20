<script setup>
  import { reactive,ref } from 'vue';
    const currentQuestion = ref(0)
    
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
  })

  const changeQuestion = () =>{
    if(currentQuestion.value + 1 < questions.results.length){
      currentQuestion.value++
    }else{
      return
    }
  }
</script>

<template>
  <h3>
    {{ questions.results[currentQuestion].question }}
  </h3>
  <button @click="changeQuestion">
    Change Question
  </button>
</template>

<style scoped>
</style>