const userData = JSON.parse(localStorage.getItem('user'));
// Now you can use userData in this file
const adminData = JSON.parse(localStorage.getItem('admin'));
let password2=document.getElementById("password2");
let email2=document.getElementById("email2");
let submit2=document.getElementById("submit2");
function verify(email, password) {
    for (let i = 0; i < userData.length; i++) {
        if (email === userData[i].email) {
            if (password === userData[i].password) {
                return 1; // User
            }
        }
    }
    for (let i = 0; i < adminData.length; i++) {
        if (email === adminData[i].email) {
            if (password === adminData[i].password) {
                return 2; // Admin
            }
        }
    }
    return 0; // Incorrect credentials
}

submit2.onclick = function(event) {
    event.preventDefault();
    let access = verify(email2.value, password2.value);
    if (access === 1) {
        let url = 'User_Home.html'; // Set the URL for user
        redirect(url);
    } else if (access === 2) {
        let url = 'adminAddBooks.html'; // Set the URL for admin
        redirect(url);
    } else {
        alert('Incorrect Password, try again');
        email2.value = '';
        password2.value = '';
        event.preventDefault(); // Prevent form submission
    }
}

function redirect(url) {
    window.location.href = url;
}
console.log(userData);
console.log(adminData);
