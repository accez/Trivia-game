<script setup>
const emit = defineEmits(['clicked']);
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

const handleClick = () =>{
  emit('clicked');

};

/**
 * Function that escapes HTML
 * The api gives us a lot of encoded HTML and this helps us fix those problems
 * 
 * @param {String} html The String you want to 
 */
const decodeHtml = (html)  =>{
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

</script>

<template>
  <h3>{{ decodeHtml(props.question) }}</h3>
  <button
    v-for="(answer, i) in props.answers.value"
    :key="i"
    @click="handleClick"
  >
    {{ answer }}
  </button>
</template>

<style scoped>

</style>