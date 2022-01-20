<script setup>
import { ref, reactive } from 'vue'


const userName = ref("");
//Todo: category list fetched from api and passed into reactive method.
const categoryList = reactive(["Sport","Science"]);
const chosenCategory = "";

const chosenNumberOfQuestions = ref("");

//Todo: difficulty list fetched from api and passed into reactive method below.
const difficultyList = reactive(["Easy", "Medium", "Hard"]);
const chosenDifficulty = "";

const onDifficultyChanged = (event) => {
  chosenDifficulty = event.target.value;
}

const onCategoryChanged = (event) => {
  chosenCategory = event.target.value;
}

const onUsernameClicked = () => {
  // Call Api check if user exists.
  // If user dont exist save user to- api database.
  console.log("Database check");
}
</script>

<template>
  <h1> Start Screen </h1>
  <h2>Please enter your user name</h2>
  <input
    v-model="userName"
    type="text"
  >
  <button @click="onUsernameClicked">
    Enter
  </button>

  <h3>Select Category</h3>
  <select
    name="select-category"
    @change="onCategoryChanged"
  >
    <option value="">
      Choose
    </option>
    <option
      v-for="category in categoryList"
      :key="category"
    >
      {{ category }}
    </option>>
  </select>

  <h3>Enter number of questions</h3>
  <input
    v-model="chosenNumberOfQuestions"
    type="number"
    max="50"
    min="1"
  >

  <h3>Select Difficulty</h3>
  <select
    name="select-difficulty"
    @change="onDifficultyChanged"
  >
    <option value="">
      Choose
    </option>
    <option
      v-for="difficulty in difficultyList"
      :key="difficulty"
    >
      {{ difficulty }}
    </option>>
  </select>
</template>

<style scoped>

</style>