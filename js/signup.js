var signUpInputName = document.querySelector("#signUpInputName");
var signUpInputEmail = document.querySelector("#signUpInputEmail");
var signUpInputPassword = document.querySelector("#signUpInputPassword");
var signUpBTN = document.querySelector("#signUpBTN");
var emailRepeatedWarning = document.querySelector("#emailRepeatedWarning");

var usersList;
var localStorageName = "users";

(function () {
    if (localStorage.getItem(localStorageName) == null) {
        usersList = [];
        console.log("No users found");
    } else {
        usersList = JSON.parse(localStorage.getItem(localStorageName));
        console.log("Users loaded");
    }
})();

signUpBTN.addEventListener("click", function () {
    if (!isEmailRepeated() && validation()) {
        var user = {
            name: signUpInputName.value,
            email: signUpInputEmail.value,
            password: signUpInputPassword.value
        };
        
        usersList.push(user);
        console.log(usersList);
        setLocalStorage(usersList);

        clearForm("signUp");
        emailRepeatedWarning.innerHTML = "Success";
        emailRepeatedWarning.classList.replace("d-none", "d-block");
        emailRepeatedWarning.classList.replace("text-danger", "text-success");

        window.location.href = "index.html";
    }
});

function isEmailRepeated() {
    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].email.toLowerCase() === signUpInputEmail.value.toLowerCase()) { // Use exact comparison
            console.log("Repeated");
            emailRepeatedWarning.innerHTML = "Email already exists";
            emailRepeatedWarning.classList.replace("d-none", "d-block");
            emailRepeatedWarning.classList.replace("text-success", "text-danger");
            return true;
        }
    }
    emailRepeatedWarning.classList.replace("d-block", "d-none");
    return false; // Return false if email is not repeated
}

function setLocalStorage(list) {
    localStorage.setItem(localStorageName, JSON.stringify(list));
}

function clearForm(flag) {
    if (flag === "signUp") {
        signUpInputName.value = "";
        signUpInputEmail.value = "";
        signUpInputPassword.value = "";
    } else {
        logInInputEmail.value = "";
        logInInputPassword.value = "";
    }
}

function validation() {
    if (signUpInputName.value === "" || signUpInputEmail.value === "" || signUpInputPassword.value === "") {
        emailRepeatedWarning.innerHTML = "All inputs are required";
        emailRepeatedWarning.classList.replace("d-none", "d-block");
        emailRepeatedWarning.classList.replace("text-success", "text-danger");
        return false;
    }

    return (validateInputName()) && (validateSignUpInputEmail()) && (validateSignUpInputPassword());
}

function validateInputName() {
    var regex = /^[A-Z][a-z]{3,15}$/;
    if (regex.test(signUpInputName.value)) {
        console.log("Valid name");
        return true;
    } else {
        emailRepeatedWarning.innerHTML = "Name must start with a capital letter";
        emailRepeatedWarning.classList.replace("d-none", "d-block");
        emailRepeatedWarning.classList.replace("text-success", "text-danger");
        return false;
    }
}

function validateSignUpInputEmail() {
    var regex = /^\w{4,}[@](yahoo|gmail|hotmail)\.com$/;
    if (regex.test(signUpInputEmail.value)) {
        console.log("Valid email");
        return true;
    } else {
        emailRepeatedWarning.innerHTML = "Email must be a valid Yahoo, Gmail, or Hotmail address";
        emailRepeatedWarning.classList.replace("d-none", "d-block");
        emailRepeatedWarning.classList.replace("text-success", "text-danger");
        return false;
    }
}

function validateSignUpInputPassword() {
    var regex = /^.{8,}$/;
    if (regex.test(signUpInputPassword.value)) {
        console.log("Valid password");
        return true;
    } else {
        emailRepeatedWarning.innerHTML = "Password must contain at least 8 characters with special characters and numbers";
        emailRepeatedWarning.classList.replace("d-none", "d-block");
        emailRepeatedWarning.classList.replace("text-success", "text-danger");
        return false;
    }
}
