<script setup>
import { ref, reactive, onMounted, defineComponent } from 'vue';
import * as databaseHelper from './ApiDataFetcher.js';

const emits = defineEmits(['questions-api-url',"is-start-screen", "current-user-data"]);

let categories = ref([]);
let categoriesKeyValuePair = {};
// Fetches all the categories from trivia api and pushes them to list which is displayed in a dropdown list.
databaseHelper.fetchDataFromApi("https://opentdb.com/api_category.php", (data) => {
  data.trivia_categories.forEach((category, index) =>
  {
    categories.value.push(category.name);
    categoriesKeyValuePair[category.name] = category.id;
  });
});

let chosenCategory = "";
const chosenNumberOfQuestions = ref("");

//Todo: difficulty list categories from api and passed into reactive method below.
const difficultyList = ref(["easy", "medium", "hard"]);
let chosenDifficulty = "";

const onDifficultyChanged = (event) => {
  chosenDifficulty = event.target.value;
};

const inputedUsername = ref("");
const onCategoryChanged = (event) => {
  chosenCategory = event.target.value;  
};



let currentUserId;
let questionsApiUrl = "";
// This method is invoked when user clicks anywhere on the screen.
// If user has filled in all the choices, user will be registered in the user database and questions will be fetched from the trivia questions api.
// Emit events will be invoked with user data. 
function onScreenClicked(element){
  if(elementClicked)
  {
    elementClicked = false;  
    return;
  } 

  if(chosenCategory !== "" && chosenDifficulty !== "" && inputedUsername.value !== "" && chosenNumberOfQuestions.value  > 0)
  {
    if(element === "start") return;
    let userExist = false;
    databaseHelper.fetchDataFromApi("https://trivia-game-users.herokuapp.com/trivia", (data) => {
      data.forEach(element => {
        if(element.username === inputedUsername.value)
        {
          if(inputedUsername.value === "") return;
          currentUserId = element.id;
          emits("current-user-data",currentUserId,element.highScore);
          userExist = true;
        }
      });
  
      if(!userExist)
      {
        if(inputedUsername.value === "") return;
        databaseHelper.post(inputedUsername.value,0, (newUserId,newScore) => {
          currentUserId = newUserId;
          emits("current-user-data",currentUserId, newScore);
        });
      }
    });
    
    questionsApiUrl = `https://opentdb.com/api.php?amount=${chosenNumberOfQuestions.value}&category=${categoriesKeyValuePair[chosenCategory]}&difficulty=${chosenDifficulty}`;
    emits('questions-api-url', questionsApiUrl);
    emits("is-start-screen");
  }
  else
  {
    setTimeout(() => {
      if(element === "start") return;
      alert("Please fill in all choices!");
    }, 200);
  }
};

const startElement = "start";
let elementClicked;
const onElementClicked = () =>
{
  elementClicked = true;
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
      @click="onElementClicked"
    >
    <h3>Select Category</h3>
    <select
      name="select-category"
      @change="onCategoryChanged"
      @click="onElementClicked"
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
      @click="onElementClicked"
    >

    <h3>Select Difficulty</h3>
    <select
      name="select-difficulty"
      @change="onDifficultyChanged"
      @click="onElementClicked"
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
    <button @click="onScreenClicked(startElement)">
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