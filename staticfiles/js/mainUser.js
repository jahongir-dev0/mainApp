// Get references to the input fields and the error message element
let userName = document.getElementById('Username');
let password = document.getElementById('password');
let cpassword = document.getElementById('confirm_password');
let email = document.getElementById('email');
let type = document.getElementById('type');
let error = document.getElementById('error');
let submit = document.getElementById('submit');

let navigate;
// Function to determine the type of user
function chosing() {
    if (type.value == 1) {
        navigate = 'user';
    } else {
        navigate = 'admin';
    }
}
function emailExists(email) {
    if(userObjects==[] || adminObjects==[])return false;
    for(let i=0;i<userObjects.length;i++){
        if(email.value==userObjects[i].email){
            return true;
        }
    }
    for(let i=0;i<adminObjects.length;i++){
        if(email.value==adminObjects[i].email){
            return true;
        }
    } 
    return false;
}

// Function to check if username already exists
function usernameExists(userName) {
    if(userObjects==[] || adminObjects==[])return false;
    for(let i=0;i<userObjects.length;i++){
        if(userName.value==userObjects[i].userName){
            return true;
        }
    }
    for(let i=0;i<adminObjects.length;i++){
        if(userName.value==adminObjects[i].userName){
            return true;
        }
    } 
    return false;
}

// Function to check if passwords match
function check() {
    let passwordValue = password.value;
    let confirmPasswordValue = cpassword.value;

    // Check if passwords don't match
    if (passwordValue !== confirmPasswordValue) {
        error.textContent = 'Passwords do not match!';
        error.style.visibility = 'visible';
        return false; // Return false if passwords don't match
    } else {
        error.style.visibility = 'hidden'; // Hide error message if passwords match

        // Check if password meets length requirements
        if (passwordValue.length < 10 || passwordValue.length > 20) {
            error.textContent = 'Password must be between 10 and 20 characters long';
            error.style.visibility = 'visible';
            return false; // Return false if password length is not within the specified range
        }

        // Check if password contains at least two numbers
        if (!/\d.*\d/.test(passwordValue)) {
            error.textContent = 'Password must contain at least two numbers';
            error.style.visibility = 'visible';
            return false; // Return false if password doesn't contain at least two numbers
        }

        return true; // Return true if passwords match and password meets requirements
    }
}


// Creating objects for users and admins
 let userObjects = [];

let adminObjects = [];

// Retrieving objects from localStorage
if (localStorage.user != null) {
    userObjects = JSON.parse(localStorage.user);
}

if (localStorage.admin != null) {
    adminObjects = JSON.parse(localStorage.admin);
}

// Event handler for submit button
submit.onclick = function(event) {
    event.preventDefault();
    chosing(); // Determine the type of user
    let samePassword=check(); // Check if passwords match
    while(!samePassword)
    {
        check();
        event.preventDefault();
        return;
    }
        error.style.visibility = 'hidden';
    

    // Create a new object
    let newObj = {
        userName: userName.value,
        password: password.value,
        email: email.value,
        type: navigate
    };
    let foundMail=emailExists(email);
    let foundUser=usernameExists(userName);
    if(foundMail)
    {
        foundMail=emailExists(email);
        alert('Email already exists. Please choose a different username.');
        userName.value = '';
        password.value = '';
        cpassword=cpassword.value = '';
        email.value = '';
        event.preventDefault();
        return;
    }
    if(foundUser)
    {
        foundUser=emailExists(userName);
        alert('Username already exists. Please choose a different username.');
        userName.value = '';
        password.value = '';
        cpassword=cpassword.value = '';
        email.value = '';
        event.preventDefault();
        return;
    }



    // Add the object to the appropriate array and update localStorage
    foundUser=emailExists(userName);
    foundMail=emailExists(email);
    if (navigate == 'admin'  && foundUser == false && foundMail == false) {
        adminObjects.push(newObj);
        localStorage.setItem('admin', JSON.stringify(adminObjects));
        window.location.href = 'adminAddBooks.html';
    } else if(navigate == 'user' && foundUser==false && foundMail==false) {
        userObjects.push(newObj);
        localStorage.setItem('user', JSON.stringify(userObjects));
        window.location.href = 'User_Home.html';
    }
};
console.log(userObjects);
console.log(adminObjects);