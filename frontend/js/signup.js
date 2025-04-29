document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const { username, password, email } = e.target;

  fetch('http://localhost:6969/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      email: email.value,
      id: Date.now(),
      role: "user"
    }),
    credentials: 'include'
  })
  .then(response => response.json())
  .then(data => {
    alert(`User "${username.value}" created successfully.`);
    window.location.href = 'login.html';
  })
  .catch(error => {
    console.error('Error signing up user:', error);
  });
});
