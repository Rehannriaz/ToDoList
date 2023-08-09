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

  todoVal.push({
    post: todoValue,
    username: currentUsername,
    completed: false,
  });
  localStorage.setItem("todoVal", JSON.stringify(todoVal));
  todoForm.submit();
});

const todoList = document.getElementById("todo-list");
const allTodo = JSON.parse(localStorage.getItem("todoVal"));
let allUserPost = [];

if (allTodo) {
  allUserPost = allTodo.slice();

  const currentUsername = JSON.parse(
    localStorage.getItem("userIsLoggedIn")
  ).username;

  currentUserPost = allTodo.filter((post) => post.username === currentUsername);

  const postHTML = currentUserPost
    .map(
      (post, index) => `
    <div class="post">
      <span class="post-text ${post.completed ? "completed" : ""}">${
        post.post
      }</span>
      <button class="delete-button" data-index="${index}">Delete</button>
      <button class="tick-button" data-index="${index}">✓</button>
    </div>
    `
    )
    .join("");

  todoList.innerHTML = postHTML;
} else {
  console.error("user not logged in");
}

todoList.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("delete-button")) {
    const index = target.getAttribute("data-index");
    currentUserPost.splice(index, 1);
    localStorage.setItem("todoVal", JSON.stringify(currentUserPost));
    updateTodoList();
  } else if (target.classList.contains("tick-button")) {
    const index = target.getAttribute("data-index");
    console.log("index " + index + " pressed");
    currentUserPost[index].completed = !currentUserPost[index].completed;
    console.log(currentUserPost[index].completed);
    localStorage.setItem("todoVal", JSON.stringify(currentUserPost));
    location.reload(); // reload page
  }
});

function updateTodoList() {
  const postHTML = currentUserPost
    .map(
      (post, index) => `
      <div class="post">
      <span class="post-text ${post.completed ? "completed" : ""}">${
        post.post
      }</span>
      <button class="delete-button" data-index="${index}">Delete</button>
      <button class="tick-button" data-index=${index}">✓</button>
      </div>
      `
    )
    .join("");

  todoList.innerHTML = postHTML;
}
