document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage= document.getElementById('error-message');

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        const email = emailInput.value;
        const password = passwordInput.value;

        let userData = JSON.parse(localStorage.getItem('userData')) || [];

        // Find matching entry
        const matchingEntry = userData.find(entry => entry.email === email && entry.password === password);
        if (matchingEntry) {
            console.log('Login successful:', matchingEntry);
            errorMessage.innerText='Login Successful';
            localStorage.setItem("auth", 1);
            window.location.href = '/pages/index.html';
 
        } else {
            console.log('Email or password is incorrect');
            errorMessage.innerText='Login failed: Email or password is incorrect';
        }
    });
});
