const sub = document.getElementById('sub');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cpass = document.getElementById('confirmPassword');

const registrationForm = document.getElementById('registrationForm');

sub.addEventListener('click', (event) => {
    event.preventDefault();

    let errorMessage = '';

    if (username.value === '') {
        errorMessage += 'Username field is required.\n';
    } else if (/\d/.test(username.value)) {
        errorMessage += 'Username should not include digits.\n';
    }
    if (username.value.length < 3) {
        errorMessage += 'Username must be at least 3 characters.\n';
    }
    if (email.value === '') {
        errorMessage += 'Email field is required.\n';
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.match(emailRegex)) {
            errorMessage += 'Invalid email format.\n';
        }
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.value.match(passwordRegex)) {
        errorMessage += 'Password must be at least 8 characters \n at least one lowercase letter,\n one uppercase letter,\n one number,\n and one special character.\n';
    }
    if (password.value !== cpass.value) {
        errorMessage += 'Passwords do not match.\n';
    }

    if (errorMessage !== '') {
        alert(errorMessage);
        return false;
    } else {
        registrationForm.submit();
    }
});
