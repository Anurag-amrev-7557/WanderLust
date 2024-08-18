(() => {
  'use strict';

  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    }, false);
  });
})();

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
const invalid = document.querySelector(".invalid-feedback");
const signbtn = document.querySelector(".submitsignup");

let revealPassword = false;

togglePassword.addEventListener('click', () => {
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);

  if (revealPassword) {
    togglePassword.classList.remove("bi-eye");
    togglePassword.classList.add("bi-eye-slash");
    revealPassword = false;
  } else {
    togglePassword.classList.remove("bi-eye-slash");
    togglePassword.classList.add("bi-eye");
    revealPassword = true;
  }
});