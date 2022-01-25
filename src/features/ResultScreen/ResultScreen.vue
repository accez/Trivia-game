<script setup>
import { onMounted,ref } from "@vue/runtime-core";
import {updateUserScore} from "../ApiDataFetcher.js";
const allDataTogether = ref([]);
let score = ref(0);

const props = defineProps({
  questionData:{
    type: Object,
    required:true
  },
  userAnswer:{
    type:Array,
    required:true
  },
  currentUserId:{
    type: Number,
    required:true
  },
  currentUserScore:{
    type:Number,
    required: true
  }
});

onMounted(() =>{
  addAllDataToOneObject();
  addToScore();
  if(score.value > props.currentUserScore){
    updateUserScore(props.currentUserId,score.value);
  }
});


const addAllDataToOneObject = () => {
  let obj1 = props.questionData.results.map((item) =>{
    return{
      question: item.question,
      correct_answer: item.correct_answer
    };
  });

  const obj2 = props.userAnswer.map((value) =>{
    return {
      user_input: value
    };
  });

  for (let i = 0; i < props.questionData.results.length; i++) {
    let obj = {
      question: obj1[i].question,
      correct_answer: obj1[i].correct_answer,
      user_input: obj2[i].user_input
    };
    allDataTogether.value.push(obj);
  }
};

const addToScore = () =>{
  for (const items of allDataTogether.value) {
    if(items.correct_answer === items.user_input){
      score.value += 10;
    }
  }
};

</script>

<template>
  <h2>Results</h2>
  <h4>Score: {{ score }}</h4>
  <div class="scroll-box">
    <div
      v-for="(items,i) in allDataTogether"
      :key="i"
    >
      <h3>{{ items.question }}</h3>
      <p>Correct answer: {{ items.correct_answer }}</p>
      <p>Your answer: {{ items.user_input }}</p>
    </div>
  </div>
</template>

<style scoped>
.scroll-box {
    height: 500px;
    overflow-y: scroll;
}
  
</style>