// Get form elements
const signupForm = document.getElementById("signup-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");
const errorMessage = document.getElementById("error-message");

// Add event listener for form submission
signupForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent actual form submission
  // Get email and password values
  const email = emailInput.value;
  const password = passwordInput.value;
  const username = usernameInput.value;

  let userData = JSON.parse(localStorage.getItem("userData")) || [];

  const isDuplicate = userData.some((entry) => entry.email === email);
  if (isDuplicate) {
    console.log("Duplicate email found. Entry not added.");
    errorMessage.innerText = "Duplicate email found. Please use another email.";
    return;
  }
  userData.push({ email: email, password: password, username: username });
  localStorage.setItem("userData", JSON.stringify(userData));

  signupForm.submit();

  signupForm.reset();
});
