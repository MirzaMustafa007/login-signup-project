document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Simulated user data (replace with actual backend authentication)
    const validUsers = [
        { username: 'user1', password: 'pass1' },
        { username: 'user2', password: 'pass2' }
    ];

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Validation
        if (!username || !password) {
            showError('Please enter both username and password');
            return;
        }

        // Check credentials
        const user = validUsers.find(
            u => u.username === username && u.password === password
        );

        if (user) {
            // Successful login
            errorMessage.textContent = '';
            alert('Login Successful!');
            // Redirect to dashboard or home page
            // window.location.href = 'dashboard.html';
        } else {
            showError('Invalid username or password');
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    // Optional: Clear error message when typing
    usernameInput.addEventListener('input', clearError);
    passwordInput.addEventListener('input', clearError);

    function clearError() {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }
});