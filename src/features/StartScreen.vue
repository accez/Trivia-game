<script setup>
import { ref, reactive, onMounted } from 'vue'
import * as databaseHelper from './ApiDataFetcher.js';

const emits = defineEmits(['questionsApiUrl']);

let categories = ref([]);
let categoriesKeyValuePair = {};

databaseHelper.fetchDataFromApi("https://opentdb.com/api_category.php", (data) => {
  data.trivia_categories.forEach((category, index) =>
  {
    categories.value.push(category.name);
    categoriesKeyValuePair[category.name] = category.id;
  })
})

let chosenCategory = "";
const chosenNumberOfQuestions = ref("");

//Todo: difficulty list categories from api and passed into reactive method below.
const difficultyList = ref(["easy", "medium", "hard"]);
let chosenDifficulty = "";

const onDifficultyChanged = (event) => {
  chosenDifficulty = event.target.value;
  console.log(chosenDifficulty);
}

const inputedUsername = ref("");
const onCategoryChanged = (event) => {
  chosenCategory = event.target.value;
  console.log(chosenCategory);
  
}

const onUsernameClicked = () => {

  let userExist = false;
  databaseHelper.fetchDataFromApi("https://trivia-game-users.herokuapp.com/trivia", (data) => {
    data.forEach(element => {
      if(element.username === inputedUsername.value)
      {
        if(inputedUsername.value === "") return;
        alert("Welcome back " + inputedUsername.value + "!");
        userExist = true;
      }
    });

    if(!userExist)
    {
      if(inputedUsername.value === "") return;
      alert("Welcome " + inputedUsername.value);
      databaseHelper.post(inputedUsername.value,0);
    }
  });
}

let questionsApiUrl = "";
const onScreenClicked = () => {
  //Screen click, switch page if all is filled in.
  console.log("clicked on screen");

  questionsApiUrl = `https://opentdb.com/api.php?amount=${chosenNumberOfQuestions.value}&category=${categoriesKeyValuePair[chosenCategory]}&difficulty=${chosenDifficulty}`;
  console.log(inputedUsername.value);
  console.log(chosenCategory);
  console.log(chosenNumberOfQuestions.value);
  console.log(chosenDifficulty);
  if(chosenCategory !== "" && chosenDifficulty !== "" && inputedUsername.value !== "" && chosenNumberOfQuestions.value  > 0)
  {
    emits('questionsApiUrl', questionsApiUrl);
    console.log(questionsApiUrl);
  }
  else
  {
    alert("Please fill in all choices!")
  }
}

const validateUsernameInput = () => {
  
}
</script>

<template>
  <div
    class="screen-div"
    @click="bla"
  >
    <h1> Start Screen </h1>
    <h2>Please enter your user name</h2>
    <input
      v-model="inputedUsername"
      type="text"
      @keyup="validateUsernameInput"
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
        v-for="category in categories"
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
    <br>
    <br>
    <button @click="onScreenClicked">
      start game
    </button>
  </div>
</template>

<style scoped>
.screen-div{
  height: 100%;
  width: 100;
}
</style>