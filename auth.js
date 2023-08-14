function validateAuth(auth) {
  if (!auth) {
    window.location.replace("login.html");
  } else {
    document.querySelector("body").style.display = "block";
    let loginPage = document.getElementById("login-page");
    let signupPage = document.getElementById("signup-page");
    loginPage.style.display = "none";
    signupPage.style.display = "none";
  }
}

function logOut() {
  let loginPage = document.getElementById("login-page");
  let signupPage = document.getElementById("signup-page");
  loginPage.style.display = "block";
  signupPage.style.display = "block";
  document.querySelector("body").style.display = "none";
  localStorage.removeItem("userIsLoggedIn");
  window.location.replace("/");
}

document.querySelector("body").style.display = "none";
const auth = localStorage.getItem("userIsLoggedIn");
validateAuth(auth);

const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", (e) => {
  logOut();
});

const todoForm = document.getElementById("todo-form");
const todo = document.getElementById("todo");
const currentUser = localStorage.getItem("userIsLoggedIn");
const currentUsername = JSON.parse(currentUser).username;
const loggedInTag = document.getElementById("Person");
loggedInTag.innerHTML = `<h3> Welcome ${currentUsername}</h3>`;
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const todoValue = todo.value;
  if (todoValue.trim() === "") {
    alert("Invalid, a todo cannot be empty.");
    return;
  }
  let todoVal = JSON.parse(localStorage.getItem("todoVal")) || [];

  todoVal.push({
    post: todoValue,
    username: currentUsername,
    completed: false,
  });
  localStorage.setItem("todoVal", JSON.stringify(todoVal));
  todoForm.submit();
});

const todoList = document.getElementById("todo-list");
const otherList = document.getElementById("other-list");

const allTodo = JSON.parse(localStorage.getItem("todoVal"));
let allUserPost = allTodo;

if (allTodo) {

  const currentUsername = JSON.parse(
    localStorage.getItem("userIsLoggedIn")
  ).username;

  // currentUserPost = allTodo.filter((post) => post.username === currentUsername);
  const postHTML = allUserPost
    .map((post, index) => {
      if (post.username === currentUsername) {
        return `
            <div class="post">
              <button class="tick-button" data-index="${index}">✓</button>
              <span class="post-text ${post.completed ? "completed" : ""}">${
          post.post
        }</span>
              <button class="delete-button" data-index="${index}">Delete</button>
            </div>
          `;
      } else {
        return "";
      }
    })
    .join("");

  const postOtherHTML = allUserPost
    .filter((post) => post.username != currentUsername)
    .map(
      (post) => `
      <div class="post">
        <li class="post-text ${post.completed ? "completed" : ""}">${
        post.post
      }</li>
      </div>
      `
    )
    .join("");

  todoList.innerHTML = postHTML;
  otherList.innerHTML = postOtherHTML;
} else {
  console.error("user not logged in");
}

todoList.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("delete-button")) {
    const postIndex = target.getAttribute("data-index");
    allUserPost.splice(postIndex, 1);
    localStorage.setItem("todoVal", JSON.stringify(allUserPost));
    location.reload();
  } else if (target.classList.contains("tick-button")) {
    const postIndex = target.getAttribute("data-index");
    allUserPost[postIndex].completed = !allUserPost[postIndex].completed;
    localStorage.setItem("todoVal", JSON.stringify(allUserPost));
    location.reload();
  }
});
