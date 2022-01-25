// Fetches data from given api-url and invokes a callback with that data as a parameter.
export function fetchDataFromApi(apiUrl, callBack)
{
  fetch(apiUrl).then((response) => {
    return response.json();
  }).then((jsonData) => {
    callBack(jsonData);
  });
}

//post a user to the user-database and invokes a callback with some userdata.
export function post(username,score,idCallback)
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
      idCallback(newUser.id,newUser.highScore);
    })
    .catch(error => {
      console.error(error);
    });
}

// Updates the database with a users new score.
export function updateUserScore(id,newScore)
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
      highScore: newScore  
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
      console.error(error);
    });

}