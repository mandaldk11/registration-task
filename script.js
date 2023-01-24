 //sets error inside tag of id---

function setError(id, error) {
  element = document.getElementById(id);
  element.getElementsByClassName("formError")[0].innerHTML = error;
}
// function to clear all errors--
function clearErrors() {
  errors = document.getElementsByClassName('formError');
  for (let items of errors) {
    items.innerHTML = "";
  }
}
// onsubmit validateForm() function will run ---
function validateForm() {
  clearErrors();

  // get Refrence of all input fields --
  var name = document.forms["myForm"]["fname"].value;
  var email = document.forms["myForm"]["femail"].value;
  var mobile = document.forms["myForm"]["fmobile"].value;
  var password = document.forms["myForm"]["fpassword"].value;
  var cpassword = document.forms["myForm"]["cpassword"].value;
  var nameError = emailError = mobileError = passError = cpassError = true
  
  // set validation for name input field ---
  if (name.length < 1) {
    setError("name", "*name can not blank !");
  } else {
    nameError = false;
  }
  // set validation for email input field ---
  if (email.length == 0) {
    setError("email", "*email can not be blank !");
  } else {
    emailError = false;
  }

  // set validation for mobile--

  if (mobile == "") {
    setError("mobile", "* mobile number can not blank !");
  } else if (mobile.length != 10) {
    setError("mobile", "please enter valid mob. number !");
  } else {
    mobileError = false;
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

  // set validation for confirm-password--
  if (cpassword.length == "") {
    setError("cpassword", "*confirm-password can not be blank !");

  } else if (cpassword !== password) {
    setError("cpassword", "*confirm password is incorrect !");
  }
  else {
    cpassError = false;
  }
  if ((nameError || emailError || mobileError || passError || cpassError) == true) {
    return false;
  }

  // data set to cookies --
  document.cookie = `userEmail=${email}`
  document.cookie = `userPass=${password}`
  document.cookie = `userName=${name}`
  document.cookie = `userMobileNo=${mobile}`
  setTimeout(() => {
    window.location.href = 'login.html'
  }, 0);


}


















