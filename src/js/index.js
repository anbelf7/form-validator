import '../sass/main.scss';
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const label = document.querySelectorAll('.form-control label');
const inputArr = [username, email, password, password2];
const valid = document.querySelector('.valid');

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

// Nome campo input
const getFieldName = input => {
  // prendere solo la prima lettera dell'input e renderla maiuscola + il resto dell'input senza la prima lettera
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
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
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
      checkEmail(email);
      checkLength(inputArr, 6, 15);
      checkPasswordMatch(password, password2);
    }
  });
};

// Controllo lunghezza
const checkLength = (inputArr, min, max) => {
  // Array senza email
  const inputArrNoEmail = inputArr.filter(item => {
    return item.id !== 'email';
  });
  inputArrNoEmail.forEach(input => {
    if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
      );
    }
    if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
      );
    }
  });
};

// Controllo password
const checkPasswordMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Password not match');
  }
};

// Seleziono input al click
document.addEventListener('click', element => {
  // Reset classi label
  label.forEach(e => {
    // e.className = '';
    e.classList.remove('active');
  });

  if (element.target.localName === 'input') {
    element.target.labels[0].classList.add('active');
  }
});

// Controllo finale
const checkFinal = () => {
  let i = 0;
  label.forEach(item => {
    if (item.parentElement.className === 'form-control success') {
      i = i + 1;
      if (i === 4) {
        valid.classList.add('show');
      }
    }
  });
};

// Reset form
valid.addEventListener('click', () => {
  location.reload();
});

// Invio form
form.addEventListener('submit', e => {
  e.preventDefault();

  checkRequired(inputArr);
  checkFinal();
});
