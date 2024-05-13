const loginFormHandler = async (event) => {
  event.preventDefault();
  
  const input = document.querySelector('#input').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  
  if (input && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ input, password }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

  
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
  