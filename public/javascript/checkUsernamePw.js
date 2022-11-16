window.addEventListener('load', function () {

  // Check username doesn't already exist in the database.

  const username = document.querySelector("#txtUsername");
  const usernameAlert = document.querySelector("#usernameAlert");

  username.addEventListener("change", fetchUsernames);

  async function fetchUsernames() {
    const response = await fetch("./services/users/usernames");
    const users = await response.json();

    checkUsername(users);
  }

  async function checkUsername(users) {
    // check whether the returned array includes the typed username and add warning if it does

    usernameAlert.innerText = "";
    usernameAlert.style.color = "darkred";

    const usernameTaken = users.includes(username.value);

    if (usernameTaken) {
      usernameAlert.innerText = "Sorry, that username is taken. Please try another.";
      // alert ("Sorry, that username is taken. Please try another.");
    }
  }


  // Check whether password and confirm password fields match and display a warning if they don't

  const password = document.querySelector("#txtPassword");
  const confirmPassword = document.querySelector("#txtConfirmPassword");
  const passwordAlert = document.querySelector("#passwordAlert");

  password.addEventListener("change", checkPasswordsMatch);
  confirmPassword.addEventListener("change", checkPasswordsMatch);

  function checkPasswordsMatch() {

    // If password not entered
    if (password.value == '') {
      passwordAlert.innerText = ("");
    }
    // If confirm password not entered
    else if (confirmPassword.value == '') {
      passwordAlert.innerText = ("");
    }
    // If Not same return False.    
    else if (password.value != confirmPassword.value) {
      passwordAlert.innerText = ("Password did not match. Please try again...");
      return false;
    }
    // If same return True.
    else {
      passwordAlert.innerText = ("Password Match!");
      return true;
    }
  }

  // Only submit form to create account if passwords match

  document.querySelector("#submit").addEventListener("click", function (event) {

    let submitForm = checkPasswordsMatch();
    console.log("submitForm:", submitForm);
    console.log("checkPasswordsMatch:", checkPasswordsMatch());

    if (!submitForm) {
      alert("Please make sure your passwords match");
      event.preventDefault()
    } else {

    }
  });

});