'use strict';

// navbar toggle in mobile
const $navbar =document.querySelector("[data-navbar]");
const $navToggler =document.querySelector("[data-nav-toggler]");
$navToggler.addEventListener("click",()=> $navbar.classList.toggle("active"));


// header scroll state
const $header =document.querySelector("[data-header]");
window.addEventListener("scroll", e=>{
    $header.classList[window.scrollY>50?"add":"remove"]("active");
})


document.getElementById('addBookForm').addEventListener('submit', function(event) {
    const imageUrl = document.getElementById('bcvr').value;
    const title = document.getElementById('bname').value;
    const isbn = document.getElementById('isbn').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('dscrb').value;

    const newCard = {
        imageUrl: imageUrl,
        title: title,
        isbn: isbn,
        author: author,
        category: category,
        description: description
    };

var data = JSON.parse(localStorage.getItem("book")) || [];
data.push([newCard]);
localStorage.setItem("book", JSON.stringify(data));
    
    console.log(newCard);
});



function showcover() {
    const fileInput = document.getElementById('bcvr');
    const previewImage = document.getElementById('getImage');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            previewImage.src = e.target.result;
        }

        reader.readAsDataURL(fileInput.files[0]);
    }
}

document.getElementById('bcvr').addEventListener('change', showcover);