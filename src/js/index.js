import '../sass/main.scss';
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const label = document.querySelectorAll('.form-control label');

// Mostra successo
const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

// Mostra errore
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

// Controllo inserimento
const checkRequired = inputArr => {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, 'Messaggio errore');
    } else {
      showSuccess(input);
    }
  });
};

// Seleziono input al click
document.addEventListener('click', element => {
  // Reset classi label
  label.forEach(e => {
    // e.className = '';
    e.classList.remove('active');
    console.log(e);
  });

  if (element.target.localName === 'input') {
    element.target.labels[0].classList.add('active');
  }
});

// Invio form
form.addEventListener('submit', e => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
});
