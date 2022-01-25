<script setup>
import { onMounted,ref } from "@vue/runtime-core";

const props = defineProps({
  questionData:{
    type: Object,
    required:true
  }
});

</script>

<template>
  <h2>Results</h2>
  <div class="scroll-box">
    <div
      v-for="(questions,i) in props.questionData.results"
      :key="i"
    >
      <h3>{{ questions.question }}</h3>
      <p>Correct answer: {{ questions.correct_answer }}</p>
      <p>Your answer: </p>
    </div>
  </div>
</template>

<style scoped>
.scroll-box {
    height: 500px;
    overflow-y: scroll;
}
  
</style>