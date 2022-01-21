<script setup>
import { ref, reactive } from 'vue'
import * as databaseHelper from './ApiDataFetcher.js';



//Todo: category list fetched from api and passed into reactive method.
const categoryList = reactive(["Sport","Science"]);
let chosenCategory = "";

const chosenNumberOfQuestions = ref("");

//Todo: difficulty list fetched from api and passed into reactive method below.
const difficultyList = reactive(["Easy", "Medium", "Hard"]);
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
        console.log("finns");
        userExist = true;
      }
      
    });

    if(!userExist)
    {
      databaseHelper.post(inputedUsername.value,0);
    }
  });


  // Call Api check if user exists.
  // If user dont exist save user to- api database.
  console.log("Database check");
}

const onScreenClicked = () => {
  console.log("clicked on screen");
}
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
  </div>
</template>

<style scoped>
.screen-div{
  height: 100%;
  width: 100;
}
</style>