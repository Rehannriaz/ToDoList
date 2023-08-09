class Auth {
  constructor() {
    document.querySelector("body").style.display = "none";
    const auth = localStorage.getItem("auth");
    this.validateAuth(auth);
  }

  validateAuth(auth) {
    if (auth != 1) {
      window.location.replace("/pages/login.html");
    } else {
      document.querySelector("body").style.display = "block";
      let loginPage = document.getElementById("login-page");
      let signupPage = document.getElementById("signup-page");
      loginPage.style.display = "none";
      signupPage.style.display = "none";
    }
  }

  logOut() {
    let loginPage = document.getElementById("login-page");
    let signupPage = document.getElementById("signup-page");
    loginPage.style.display = "block";
    signupPage.style.display = "block";
    localStorage.removeItem("auth");
    // localStorage.removeItem("todoVal");
    localStorage.removeItem("userIsLoggedIn");
    window.location.replace("/");
  }
}
const auth = new Auth();

document.querySelector(".logout").addEventListener("click", (e) => {
  auth.logOut();
});

const todoForm = document.getElementById("todo-form");
const todo = document.getElementById("todo");

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const todoValue = todo.value;

  let todoVal = JSON.parse(localStorage.getItem("todoVal")) || [];
  const currentUser = localStorage.getItem("userIsLoggedIn");
  const currentUsername = JSON.parse(currentUser).username;
  console.log("Current user = " + currentUsername);

  todoVal.push({ post: todoValue, username: currentUsername });
  localStorage.setItem("todoVal", JSON.stringify(todoVal));
  todoForm.submit();
});

const todoList = document.getElementById("todo-list");
const allTodo = JSON.parse(localStorage.getItem("todoVal"));
let currentUserPost = [];

if (allTodo) {
  const currentUsername = JSON.parse(
    localStorage.getItem("userIsLoggedIn")
  ).username;

  currentUserPost = allTodo.filter((post) => post.username === currentUsername);
  const postHTML = currentUserPost
    .map((post) => `<li>${post.post}</li>`)
    .join("");
  todoList.innerHTML = postHTML;
} else {
  console.error("user not logged in");
}
