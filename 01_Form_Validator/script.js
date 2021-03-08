const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(element, message) {
  /* there are lots of container in the html file which are named '.form-control' and we are using the following ".parentElement" method because of we want to choose right ".form-control" container */

  const formControl = element.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerHTML = message;
}

function showSuccess(element) {
  const formControl = element.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid with javascript regex
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords are not matching');
  } else {
    showSuccess(input2);
  }
}

function getFieldName(element) {
  return element.id.charAt(0).toUpperCase() + element.id.slice(1);
}

function checkRequired(arr) {
  arr.forEach((item) => {
    if (item.value.trim() === '') {
      showError(item, `${getFieldName(item)} is required`);
    } else {
      showSuccess(item);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} character long`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} character long`
    );
  } else {
    showSuccess(input);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
