import '../sass/main.scss';
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const label = document.querySelectorAll('.form-control label');
const inputArr = [username, email, password, password2];

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

// Controllo email
const checkEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
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

// Controllo lunghezza
// const checkLength = (inputArr, min, max) => {
//   inputArr.forEach((input, i) => {
//     if (input.value < min) {
//       small[i].innerText = `${input.id} è minore di ${min}`;
//     }
//     if (input.value > max) {
//       small[i].innerText = `${input.id} è maggiore di ${max}`;
//       console.log('maggiore');
//     }
//   });
//   // console.log(username.value);
//   // console.log(password.value);
// };

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

  checkRequired(inputArr);
  checkEmail(email);
});
