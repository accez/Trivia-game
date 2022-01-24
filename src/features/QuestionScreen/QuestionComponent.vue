<script setup>
import { onMounted, onUpdated, ref } from 'vue';
const answers = ref([])
const props = defineProps({
 results:{
  type:Array,
  required:true
 },
 currentQuestion:{
  type:Number,
  required: true
 }
})

const shuffleAnswers = (array) =>{
 return array.sort( ()=>Math.random()-0.5 );
}


onMounted(() =>{
 answers.value = [...props.results[props.currentQuestion].incorrect_answers,props.results[props.currentQuestion].correct_answer]
 shuffleAnswers(answers.value)
})

onUpdated(()=>{

})

</script>

<template>
  <h3>{{ props.results[currentQuestion].question }}</h3>
  <button
    v-for="(answer, i) in answers"
    :key="i"
  >
    {{ answer }}
  </button>
</template>

<style scoped>

</style>