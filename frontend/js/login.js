document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:6969/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include'
  })
  .then(response => response.json())
  .then(data => {
    console.log('Login successful! Token:', data.token);
     window.location.href = 'dashboard.html';
  })
  .catch(error => {
    alert(error.message);
    console.error('Error logging in:', error);
  });
});
