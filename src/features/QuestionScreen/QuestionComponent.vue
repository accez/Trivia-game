<script setup>
import { onUpdated,ref } from "@vue/runtime-core";
import { decodeHtml } from "../../helper/helper";

const emit = defineEmits(['clicked']);
const userAnswer = ref([]);
const props = defineProps({
  answers:{
    type:Array,
    required:true
  },
  question:{
    type: String,
    required:true
  }
});

const handleClick = (event) =>{
  event.target.innerHTML;
  userAnswer.value.push(event.target.innerHTML);
  emit('clicked',userAnswer.value);
};

/**
 * Function that escapes HTML
 * The api gives us a lot of encoded HTML and this helps us fix those problems
 * 
 * @param {String} html The String you want to 
 */


</script>

<template>
  <h3>{{ decodeHtml(props.question) }}</h3>
  <button
    v-for="(answer, i) in props.answers.value"
    :key="i"
    @click="handleClick"
  >
    {{ decodeHtml(answer) }}
  </button>
</template>

<style scoped>

</style>