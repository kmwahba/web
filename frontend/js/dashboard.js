document.getElementById('addGameForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const { name, price, description, imgLink } = e.target;

  fetch('http://localhost:6969/game', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: Date.now(),
      name: name.value,
      price: price.value,
      description: description.value,
      category: "general"
    }),
    credentials: 'include'
  })
  .then(response => response.json())
  .then(data => {
    alert(`Game "${name.value}" added successfully.`);
  })
  .catch(error => {
    console.error('Error adding game:', error);
  });
});

document.getElementById('viewAllGamesBtn').addEventListener('click', function() {
  fetch('http://localhost:6969/games', {
    credentials: 'include'
  })
    .then(response => response.json())
    .then(games => {
      const gamesList = document.getElementById('gamesList');
      gamesList.innerHTML = '';
      games.forEach(game => {
        const listItem = document.createElement('li');
        listItem.textContent = `${game.name} - $${game.price}`;
        gamesList.appendChild(listItem);
      });
    });
});

document.getElementById('viewAccountBtn').addEventListener('click', function() {
  const userId = 1;
  fetch(`http://localhost:6969/users/${userId}`, {
    credentials: 'include'
  })
    .then(response => response.json())
    .then(user => {
      const accountDetails = document.getElementById('accountDetails');
      accountDetails.innerHTML = `
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Role:</strong> ${user.role}</p>
      `;
    });
});

document.getElementById('deleteGameForm').addEventListener('click', function() {
  const gamename = document.getElementById('gamename');
  fetch(`http://localhost:6969/game/${gamename.value}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete game');
    }
    return response.json();
  })
  .then(result => {
    console.log('Game deleted:', result);
    const accountDetails = document.getElementById('accountDetails');
    accountDetails.innerHTML = `<p>Game deleted successfully!</p>`;
  })
  .catch(error => {
    console.error('Error deleting game:', error);
  });
});

document.getElementById('deleteAccountBtn').addEventListener('click', function(e) {
  e.preventDefault();
  const userId =1;

  fetch(`http://localhost:6969/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return response.json();
  })
  .then(result => {
    console.log('User deleted:', result);
    alert('User deleted successfully! Redirecting to signup page...');
    window.location.href = '/signup.html'; // 👈 Redirect here too
  })
  .catch(error => {
    console.error('Error deleting user:', error);
  });
});

