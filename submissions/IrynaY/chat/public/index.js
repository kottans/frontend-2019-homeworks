document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginInput = document.getElementById('login');

  loginForm.addEventListener('submit', onFormSubmit);
  loginInput.addEventListener('change', () => {
    document.getElementById('img').value = '';
  });

  function onFormSubmit(){
    event.preventDefault();
    localStorage.setItem('CURRENT_USER', JSON.stringify({
      'login': `${document.getElementById('login').value}`, 
      'img': `${document.getElementById('img').value}`
    }));
    window.location.replace('/chat');
  }
});
