const password = document.querySelector('#password');
const passwordLabel = document.querySelector('label[for="password"]');
const confirmPassword = document.querySelector('#confirm-password');
const confirmPasswordLabel = document.querySelector('label[for="confirm-password"]');
const username = document.querySelector('#username');
const usernameLabel = document.querySelector('label[for="username"]');

const textFields = document.querySelectorAll('#password, #confirm-password, #username');

const signupButton = document.querySelector('button[type="submit"]');

const usernameRegex = /^[a-zA-Z]+[a-zA-Z0-9-_]*$/;

const isValid = function (input, regex) {
    return regex.test(input);
};

let isUnchanged = true;

//**************** PASSWORD Change to ERROR ****************
password.addEventListener('change', () => {
    if (password.value.length < 6 && password.value.length !== 0) {
        password.classList.add('error');
        passwordLabel.classList.add('error-label');
        passwordLabel.textContent = 'Password too short (minimum 6 characters)';
    }
});

//**************** PASSWORD Change to normal ****************
password.addEventListener('input', () => {
    if (!(password.value.length < 6 && password.value.length !== 0)) {
        password.classList.remove('error');
        passwordLabel.classList.remove('error-label');
        passwordLabel.textContent = 'Create your password';
    }
});

//**************** CONFIRM PASSWORD toggle ****************
function activateToggleConfirmPassword() {
    toggleConfirmPassword();
    confirmPassword.addEventListener('input', () => {
        toggleConfirmPassword();
    });
    password.addEventListener('input', () => {
        toggleConfirmPassword();
    });
}
function toggleConfirmPassword() {
    if (confirmPassword.value !== password.value) {
        confirmPassword.classList.add('error');
        confirmPasswordLabel.classList.add('error-label');
        confirmPasswordLabel.textContent = 'The passwords do not match';
    } else {
        confirmPassword.classList.remove('error');
        confirmPasswordLabel.classList.remove('error-label');
        confirmPasswordLabel.textContent = 'Confirm your password';
    }
}
confirmPassword.addEventListener('change', () => {
    if (isUnchanged) {
        isUnchanged = false;
        activateToggleConfirmPassword();
    }
});

//**************** USERNAME Change to ERROR ****************
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

//**************** USERNAME Change to normal ****************
username.addEventListener('input', () => {
    if (!(username.value.length < 4 && username.value.length !== 0
        || !(isValid(username.value, usernameRegex)) && username.value.length !== 0)) {
        username.classList.remove('error');
        usernameLabel.textContent = 'Profile name';
        usernameLabel.classList.remove('error-label');
    }
});

//**************** SIGN UP BUTTON TOGGLING *****************
function checkForm() {
    function checkNoErrors(obj) {
        if (obj.classList.contains('error')) {
            return false
        } return true
    }
    function checkNotEmpty(obj) {
        if (obj.value.length === 0) {
            return false
        } return true
    }
    if (checkNotEmpty(password)
        && checkNotEmpty(confirmPassword)
        && checkNotEmpty(username)
        && !(password.value.length < 6)
        && confirmPassword.value === password.value
        && !(username.value.length < 4)
        && isValid(username.value, usernameRegex)) {
        enableSignupButton();
    } else {
        disableSignupButton();
    }
}

function disableSignupButton() {
    signupButton.classList.add('disabled')
    signupButton.disabled = true;
}

function enableSignupButton() {
    signupButton.classList.remove('disabled')
    signupButton.disabled = false;
}

checkForm();
textFields.forEach(field => {
    field.addEventListener('input', () => {
        checkForm();
    });
});