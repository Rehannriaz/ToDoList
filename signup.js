const signupForm = document.getElementById("signup-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");
const errorMessage = document.getElementById("error-message");

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = hashFunc(passwordInput.value);
  const username = usernameInput.value;

  let userData = JSON.parse(localStorage.getItem("userData")) || [];

  const isDuplicateUsername = userData.find(
    (entry) => entry.username === username
  );
  if (isDuplicateUsername) {
    errorMessage.innerText =
      "Username Already in use. Please use another username.";
    return;
  }
  const isDuplicateEmail = userData.find((entry) => entry.email === email);
  if (isDuplicateEmail) {
    errorMessage.innerText = "Email Already in use. Please use another email.";
    return;
  }
  userData.push({ email: email, password: password, username: username });
  localStorage.setItem("userData", JSON.stringify(userData));

  signupForm.submit();
});
