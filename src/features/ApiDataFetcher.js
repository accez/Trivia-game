export function fetchDataFromApi(apiUrl, callBack)
{
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      callBack(jsonData);
    });
}

export function postUser(username,score,callbackId)
{
  const apiURL = 'https://trivia-game-users.herokuapp.com';
  const apiKey = 'SimonLove';

  fetch(`${apiURL}/trivia`, {
    method: 'POST',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      username: username, 
      highScore: score 
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not create new user');
      }
      return response.json();
    })
    .then(newUser => {
      console.log(newUser.id);
      callbackId(newUser.id);
    })
    .catch(error => {
    });
}

export function updateUserScore(id,newHighScore)
{
  const apiURL = 'https://trivia-game-users.herokuapp.com';
  const apiKey = 'SimonLove';
  const userId = id; // Update user with id 1
  
  fetch(`${apiURL}/trivia/${userId}`, {
    method: 'PATCH', // NB: Set method to PATCH
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // Provide new highScore to add to user with id 1
      highScore: newHighScore  
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not update high score');
      }
      return response.json();
    })
    .then(updatedUser => {
      // updatedUser is the user with the Patched data
    })
    .catch(error => {
    });
}