export function fetchDataFromApi(apiUrl, callBack)
{
  fetch(apiUrl).then((response) => {
    return response.json();
  }).then((jsonData) => {
    callBack(jsonData);
  });
}

export function post(username,score)
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
      // newUser is the new user with an id
      console.log(newUser);
    })
    .catch(error => {
    });
}