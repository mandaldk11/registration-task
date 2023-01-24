//sets error inside tag of id--
function setError(id, error) { 
  element = document.getElementById(id);
  element.getElementsByClassName("formError")[0].innerHTML = error;
}

function clearErrors() {
  errors = document.getElementsByClassName('formError');
  for (let items of errors) {
    items.innerHTML = "";
  }
}

function saveLoginData() {
  clearErrors();
  // get refrence of email and password input fields --
  var email = document.forms["myForm"]["femail"].value;
  var password = document.forms["myForm"]["fpassword"].value;
  var emailError = passError = true


  // set validation for email input field ---
  if (email.length == 0) {
    setError("email", "*email can not be blank !");

  } else {
    emailError = false;
  }

  // set validation for password--

  var password_str = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/ //7 to 15 characters which contain at least one numeric digit and a special character

  if (password.length == "") {
    setError("password", "*password can not blank!");

  } else if (password_str.test(password) === false) {
    setError("password", "a numeric digit,a special character,length b/w(7-15)!");

  } else {
    passError = false;
  }

  if ((emailError || passError) == true) {
    return false;
  }


  //get values of cookies --

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  let user_email = getCookie('userEmail');
  let user_pass = getCookie('userPass');

  // check for match values---

  if (user_email == email && user_pass == password) {
    alert('log in successfully...!');
    setTimeout(() => {
      window.location.href = 'todos.html'
    }, 0);
  } else {
    alert('login failed...!');
    setTimeout(() => {
      window.location.href = 'login.html'
    }, 0);
  }
}


















