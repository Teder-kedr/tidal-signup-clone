const password = document.querySelector('#password');
const passwordLabel = document.querySelector('label[for="password"]');
const confirmPassword = document.querySelector('#confirm-password');
const confirmPasswordLabel = document.querySelector('label[for="confirm-password"]');
const username = document.querySelector('#username');
const usernameLabel = document.querySelector('label[for="username"]');

const usernameRegex = /^[a-zA-Z]+[a-zA-Z0-9-_]*$/;

const isValid = function (input, regex) {
    return regex.test(input);
};

//Change to ERROR
username.addEventListener('change', () => {
    if (username.value.length < 4 && username.value.length !== 0
        || !(isValid(username.value, usernameRegex)) && username.value.length !== 0) {
        username.classList.add('error');
        usernameLabel.classList.add('error-label');
        if (username.value.length < 4 && username.value.length !== 0) {
            usernameLabel.textContent = 'Name too short (minimum 4 characters)';
        } else {
            usernameLabel.textContent = 'Invalid name';
        }
    }
});

//Change to NORMAL
username.addEventListener('input', () => {
    if (!(username.value.length < 4 && username.value.length !== 0
        || !(isValid(username.value, usernameRegex)) && username.value.length !== 0)) {
        username.classList.remove('error');
        usernameLabel.textContent = 'Profile name';
        usernameLabel.classList.remove('error-label');
    }
});

