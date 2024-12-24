document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const errorMessage = document.getElementById('errorMessage');
    const passwordStrength = document.getElementById('passwordStrength');

    // Users storage (would typically be backend)
    const users = [];

    // Form Submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form values
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validation
        if (!validateForm(fullName, email, username, password, confirmPassword)) {
            return;
        }

        // Create user object
        const newUser = {
            fullName,
            email,
            username,
            password
        };

        // Add user (would typically send to backend)
        users.push(newUser);

        // Success message
        alert('Account created successfully!');
        
        // Reset form
        signupForm.reset();
        errorMessage.textContent = '';
        passwordStrength.textContent = '';

        // Optional: Redirect to login page
        window.location.href = 'index.html';
    });

    // Validation Function
    function validateForm(fullName, email, username, password, confirmPassword) {
        // Clear previous errors
        errorMessage.textContent = '';

        // Full Name Validation
        if (fullName.length < 2) {
            showError('Please enter a valid full name');
            return false;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address');
            return false;
        }

        // Username Validation
        if (username.length < 3) {
            showError('Username must be at least 3 characters long');
            return false;
        }

        // Password Validation
        if (password.length < 8) {
            showError('Password must be at least 8 characters long');
            return false;
        }

        // Confirm Password
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return false;
        }

        return true;
    }

    // Password Strength Checker
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const strength = checkPasswordStrength(password);
        
        passwordStrength.textContent = strength.message;
        passwordStrength.className = `password-strength ${strength.class}`;
    });

    function checkPasswordStrength(password) {
        // Password strength criteria
        const strongRegex = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        );
        const mediumRegex = new RegExp(
            "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
        );

        if (strongRegex.test(password)) {
            return {
                message: 'Strong Password',
                class: 'password-strength-strong'
            };
        } else if (mediumRegex.test(password)) {
            return {
                message: 'Medium Strength',
                class: 'password-strength-medium'
            };
        } else {
            return {
                message: 'Weak Password',
                class: 'password-strength-weak'
            };
        }
    }

    // Error Display Function
    function showError(message) {
        errorMessage.textContent = message;
    }

    // Input Validation Listeners
    [fullNameInput, emailInput, usernameInput, passwordInput, confirmPasswordInput]
    .forEach(input => {
        input.addEventListener('input', function() {
            errorMessage.textContent = '';
        });
    });
});