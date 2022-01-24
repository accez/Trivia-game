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

onUpdated(()=>{
answers.value = [...props.results[props.currentQuestion].incorrect_answers,props.results[props.currentQuestion].correct_answer]
console.log(question.value)
})

</script>

<template>
  <h3>{{ props.results[currentQuestion].question }}</h3>
  <button
    v-for="(answer, i) in answers[0]"
    :key="i"
  >
    {{ answer }}
  </button>
</template>

<style scoped>

</style>