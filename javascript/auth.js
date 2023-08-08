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
    localStorage.removeItem("userIsLoggedIn")
    window.location.replace("/");
  }
}
const auth = new Auth();

document.querySelector(".logout").addEventListener("click", (e) => {
  auth.logOut();
});
