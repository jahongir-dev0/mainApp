
let  selectElement;
function submitForm() {
    selectElement = document.getElementById("borrow");
    var selectedOption = selectElement.options[selectElement.selectedIndex].text;
    console.log(selectElement);
    getBook();

}
let displaylist=[];
if (localStorage.s != null) {
    displaylist = JSON.parse(localStorage.s);
}


let dataselect = [];
// Retrieving objects from localStorage
if (localStorage.select != null) {
    dataselect = JSON.parse(localStorage.select);
}
let card1=[
    {    
    title: "Tenth of December",
    imageUrl: "imgs/81-y8fgFTTL._AC_UF1000,1000_QL80_.jpg",
    },
];
let card2=[
    {    
    title: "The Remains of the Day",
    imageUrl: "imgs/71FYHIsnVIL._AC_UF1000,1000_QL80_.jpg",
    },
];
let card3=[
    {    
    title: "Things Fall Apart",
    imageUrl: "imgs/91NtvTU0xEL._AC_UF1000,1000_QL80_.jpg",
    },
];
let card4=[
    {    
    title: "Dear Life",
    imageUrl: "imgs/images.jpg",
    },
];
let card5=[
    {    
    title: "A Tale for the Time Being",
    imageUrl: "imgs/15811545.jpg",
    },
];
let card6=[
    {    
    title: "Echoes of Eternity",
    imageUrl: "imgs/image.png",
    },
];
if (localStorage.getItem('select') === null) {
    // Populate dataselect array
    dataselect = [];
    dataselect.push(card1);
    dataselect.push(card2);
    dataselect.push(card3);
    dataselect.push(card4);
    dataselect.push(card5);
    dataselect.push(card6);
    // Store dataselect in localStorage
    localStorage.setItem('select', JSON.stringify(dataselect));
}

function getBook() {
    var selectedOption = selectElement.options[selectElement.selectedIndex].text;

    for (let i = 0; i < displaylist.length; i++) {
        for (let j = 0; j < displaylist[i].length; j++) {
            if (displaylist[i][j].title === selectedOption) {
                alert("you selected this book before");
                return;
            }
        }
    }
    console.log("Selected option:", selectedOption);
    
    for (let i = 0; i < dataselect.length; i++) {
        for (let j = 0; j < dataselect[i].length; j++) {
            if (dataselect[i][j].title === selectedOption) {
                displaylist.push(dataselect[i]);
                localStorage.setItem('s', JSON.stringify(displaylist)); // Use displaylist here
                alert("You selected: " + selectedOption);

                break;

            }
        }
    }
}


function displayBorrowedBooks() {
    console.log("Displaying borrowed books...");
    var container = document.querySelector('.holder');
    console.log("Container:", container);
    container.innerHTML = '';
    
    for (let i = 0; i < displaylist.length; i++) {
        for (let j = 0; j < displaylist[i].length; j++) {
            var li = document.createElement('li');
            var img = document.createElement('img');
            
            li.textContent = displaylist[i][j].title; // Accessing title of the book
            img.setAttribute('src', displaylist[i][j].imageUrl);
            img.setAttribute('height', '100');
            
            var div = document.createElement('div');
            div.className = 'imgs'; // Adding the imgs class here
            div.appendChild(li);
            div.appendChild(img);
            container.appendChild(div);
        }
    }
}

// Call the function to retrieve the selected books from localStorage
if (localStorage.s != null) {
    displaylist = JSON.parse(localStorage.s);
}

console.log("Displaylist:", displaylist);
displayBorrowedBooks();
