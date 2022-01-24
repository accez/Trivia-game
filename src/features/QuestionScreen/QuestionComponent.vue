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

</script>

<template>
  <h3>{{ props.question }}</h3>
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