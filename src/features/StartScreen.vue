<script setup>
import { ref, reactive, onMounted } from 'vue';
import * as databaseHelper from './ApiDataFetcher.js';

const emits = defineEmits(['questionsApiUrl']);
const chosenNumberOfQuestions = ref("");
let buttonClicked = false;

let categories = ref([]);
let categoriesKeyValuePair = {};

databaseHelper.fetchDataFromApi("https://opentdb.com/api_category.php", (data) => {
  data.trivia_categories.forEach((category, index) =>
  {
    categories.value.push(category.name);
    categoriesKeyValuePair[category.name] = category.id;
  });
});

let chosenCategory = "";
const onCategoryChanged = (event) => {
  chosenCategory = event.target.value;
};


const difficultyList = ref(["easy", "medium", "hard"]);
let chosenDifficulty = "";
const onDifficultyChanged = (event) => {
  chosenDifficulty = event.target.value;
};

const inputedUsername = ref("");

const onUsernameClicked = () => {
  let userExist = false;
  console.log("clicked");
  databaseHelper.fetchDataFromApi("https://trivia-game-users.herokuapp.com/trivia", (data) => {
    data.forEach(element => {
      console.log(inputedUsername.value + " " + element.username);
      if(element.username === inputedUsername.value)
      {
        if(inputedUsername.value === "") return;
        alert("Welcome back " + inputedUsername.value + "!");
        userExist = true;
        return;
      }
    });

    if(!userExist)
    {
      if(inputedUsername.value === "") return;

      alert("Welcome " + inputedUsername.value);

      databaseHelper.postUser(inputedUsername.value,0);
    }
  });
};

let questionsApiUrl = "";
const onScreenClicked = () => {
  console.log("screen clicked");
  questionsApiUrl = `https://opentdb.com/api.php?amount=${chosenNumberOfQuestions.value}&category=${categoriesKeyValuePair[chosenCategory]}&difficulty=${chosenDifficulty}`;
  if(chosenCategory !== "" && chosenDifficulty !== "" && inputedUsername.value !== "" && chosenNumberOfQuestions.value  > 0)
  {
    emits('questionsApiUrl', questionsApiUrl);
    console.log("Vidare");
  }
  else
  {
    setTimeout(() => 
    {
      console.log(buttonClicked);
      if(!buttonClicked)
      {
        alert("Please fill in all choices!");
      }
      buttonClicked = false;
    } ,500);
  }
};  

const onButtonClicked = () => {
  buttonClicked = true;
  console.log(buttonClicked + "button clicked");
};
</script>

<template>
  <div
    class="screen-div"
    @click="onScreenClicked"
  >
    <h1> Start Screen </h1>
    <h2>Please enter your user name</h2>
    <input
      v-model="inputedUsername"
      type="text"
      @keyup="validateUsernameInput"
      @click="onButtonClicked"
    >
    <button @click="onUsernameClicked">
      Enter
    </button>

    <h3>Select Category</h3>
    <select
      name="select-category"
      @change="onCategoryChanged"
      @click="onButtonClicked"
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
      @click="onButtonClicked"
    >

    <h3>Select Difficulty</h3>
    <select
      name="select-difficulty"
      @change="onDifficultyChanged"
      @click="onButtonClicked"
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
    <button @click="onScreenClicked,onButtonClicked">
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