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
let dataBook = [];
// Retrieving objects from localStorage
if (localStorage.Book != null) {
    dataBook = JSON.parse(localStorage.Book);
}

let card1=[
    {
        title: "Dear Life",
        author: "Rachel Clarke",
        imageUrl: "imgs/images.jpg",
        description: `"Dear Life" offers a poignant exploration of human experience through a collection of short stories, delving into themes of love, loss, and resilience, all while reflecting on the complexities of existence and the passage of time. Alice Munro's masterful storytelling invites readers into the intimate lives of her characters, weaving together narratives that resonate with profound emotional depth and universal truths.`,
        // Add more properties as needed
    },
    // Add more card objects as needed
];

let card2=[
    {
        title: "The Remains Of The Day",
        author: "Kazuo Ishiguro",
        imageUrl: "imgs/71FYHIsnVIL._AC_UF1000,1000_QL80_.jpg",
        description: `"The Remains of the Day" follows the journey of Stevens, an English butler, as he reflects on his life while on a road trip. Through his reminiscences, the novel explores themes of duty, regret, and the decline of the British aristocracy.`,
        // Add more properties as needed
    },
    // Add more card objects as needed
];
let card3=[
    {
        title: "Tenth Of December",
        author: "George Saunders",
        imageUrl: "imgs/81-y8fgFTTL._AC_UF1000,1000_QL80_.jpg",
        description: `"Tenth of December" is a collection of short stories by George Saunders, exploring themes of humanity, morality, and the struggles of ordinary people in extraordinary circumstances, all with Saunders' signature blend of wit and compassion. Each story offers a poignant and often surreal glimpse into the human condition, prompting reflection on empathy, connection, and the complexities of modern life.`,
        // Add more properties as needed
    },
    // Add more card objects as needed
];
let card4=[
    {
        title: "Things Fall Apart",
        author: "Chinua Achebe",
        imageUrl: "imgs/91NtvTU0xEL._AC_UF1000,1000_QL80_.jpg",
        description: `"Things Fall Apart" is Chinua Achebe's seminal novel portraying the collision of African traditions and colonialism through the story of Okonkwo, a proud Igbo warrior whose life unravels amidst the forces of change, revealing the tragic consequences of cultural clash and personal hubris. Set in pre-colonial Nigeria, it explores themes of identity, power, and the fragility of human institutions, offering a poignant critique of colonialism and its impact on indigenous societies.`,
        // Add more properties as needed
    },
    // Add more card objects as needed
];
let card5=[
    {
        title: "It",
        author: "Stephen King",
        imageUrl: "imgs/18342.png",
        description: `"It" by Stephen King is a chilling tale of a group of friends in Derry, Maine, confronting an ancient evil that takes the form of a malevolent clown, Pennywise, resurfacing every 27 years to terrorize the town. Through a mix of horror, nostalgia, and camaraderie, the novel delves into the characters' shared childhood traumas and their ultimate battle to overcome fear and destroy the monstrous entity.`,
        // Add more properties as needed
    },
    // Add more card objects as needed
];
let card6=[
    {
        title: "A Tale For The Time Being",
        author: "Ruth Ozeki",
        imageUrl: "imgs/15811545.jpg",
        description: `A Tale for the Time Being" by Ruth Ozeki intertwines the stories of a Japanese girl's diary, washed ashore in Canada, and the woman who finds it, exploring themes of time, memory, and the interconnectedness of lives across vast distances. Through the parallel narratives, the novel delves into questions of identity, belonging, and the search for meaning in the face of loss and uncertainty.`,
        // Add more properties as needed
    },
    // Add more card objects as needed
];
let card7=[
    {
        title: "Yellow Face",
        author: "David Henry Hwang",
        imageUrl: "imgs/Z.png",
        description: `"Yellow Face" by David Henry Hwang is a satirical play that blurs the lines between fact and fiction as it explores issues of race, identity, and cultural authenticity through the lens of a playwright's personal and professional journey. With humor and sharp insight, the play challenges stereotypes and prejudices while shedding light on the complexities of racial politics in contemporary America.`,
        // Add more properties as needed
    },
    // Add more card objects as needed
];
let c=0;
let card8=[
    {
        title: "cut",
        author: "Patricia mcCormick",
        imageUrl: "imgs/662597.png",
        description: `"Cut" by Patricia McCormick is a novel-in-verse depicting the struggles of a teenage girl named Callie who self-harms as she navigates the challenges of mental illness and treatment in a residential treatment facility. Through raw and lyrical language, the book explores themes of identity, trauma, and the journey towards self-discovery and healing.`,
        // Add more properties as needed
    },
    // Add more card objects as needed
];

if (localStorage.getItem('Book') === null) {
    // Populate dataBook array
    let dataBook = [];
    dataBook.push(card1);
    dataBook.push(card2);
    dataBook.push(card3);
    dataBook.push(card4);
    dataBook.push(card5);
    dataBook.push(card6);
    dataBook.push(card7);
    dataBook.push(card8);
    // Store dataBook in localStorage
    localStorage.setItem('Book', JSON.stringify(dataBook));
}








function showData() {
    let cardContainer = document.getElementById('card-container');

    dataBook.forEach(cards => {
        cards.forEach(card => {
            let cardElement = document.createElement('div');
            cardElement.classList.add('card');

            if (card.title && card.author && card.description && card.imageUrl) {
                let cardHTML = `
                    <div class="card-banner">
                        <figure class="img-holder" style="--width:250; --height:300;">
                            <img src="${card.imageUrl}" width="250" height="300" alt="${card.title}" class="img-cover">
                        </figure>
                        <button class="icon-btn fav-btn" aria-label="add to favorite">
                            <span class="material-symbols-rounded" aria-hidden="true">favorite</span>
                        </button>
                    </div>
                    <div class="card-content">
                        <span class="author">${card.author}</span>
                        <h3 class="title-small card-title">
                        <a href="#" class="title-small card-title" onclick="handleClick('${card.title}')">${card.title}</a>
                        </h3>
                        <address class="body-medium card-text">${card.description}</address>
                    </div>
                `;

                cardElement.innerHTML = cardHTML;
                cardContainer.appendChild(cardElement);
            } else {
                console.error("Card data is incomplete or missing properties:", card);
            }
        });
    });
}
showData();
function searchDate() {
    let searchTerm = document.getElementById('searchInput').value.toLowerCase();
    let cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Clear previous cards

    dataBook.forEach(cards => {
        for (let i = 0; i < cards.length; i++) {
            let card = cards[i];
            // Convert card title to lowercase for case-insensitive comparison
            let title = card.title.toLowerCase();

            // Check if card title contains the search term
            if (title.includes(searchTerm)) {
                let cardElement = createCardElement(card);
                cardContainer.appendChild(cardElement);
                // Exit the loop if a matching card is found
                break;
            }
        }
    });

    if (cardContainer.innerHTML === '') {
        // Display a message if no matching cards are found
        cardContainer.innerHTML = '<p>No matching cards found.</p>';
    }
}


function createCardElement(card) {
    let cardElement = document.createElement('div');
    cardElement.classList.add('card');

    let cardHTML = `
        <div class="card-banner">
            <figure class="img-holder" style="--width:250; --height:300;">
                <img src="${card.imageUrl}" width="250" height="300" alt="${card.title}" class="img-cover">
            </figure>
            <button class="icon-btn fav-btn" aria-label="add to favorite">
                <span class="material-symbols-rounded" aria-hidden="true">favorite</span>
            </button>
        </div>
        <div class="card-content">
            <span class="author">${card.author}</span>
            <h3 class="title-small card-title">
            <a href="#" class="title-small card-title" onclick="handleClick('${card.title}')">${card.title}</a>
            </h3>
            <address class="body-medium card-text">${card.description}</address>
        </div>
    `;

    cardElement.innerHTML = cardHTML;
    return cardElement;
}


function handleClick(title) {
    let cardData;
    // Find the book details from dataBook
    for (let i = 0; i < dataBook.length; i++) {
        for (let j = 0; j < dataBook[i].length; j++) {
            if (title == dataBook[i][j].title) {
                cardData = dataBook[i][j];
                break;
            }
        }
    }

    // Store card data in session storage
    sessionStorage.setItem('selectedCard', JSON.stringify(cardData));

    // Navigate to template page
    window.location.href = 'template.html';
}

// In the template.html page
// document.addEventListener("DOMContentLoaded", function() {
//     // Retrieve card data from session storage
//     let cardData = JSON.parse(sessionStorage.getItem('selectedCard'));

//     // Populate HTML elements with card details
//     document.getElementById('title').textContent = cardData.title;
//     document.getElementById('author').textContent = cardData.author;
//     document.getElementById('imgsrc').src = cardData.imageUrl;
//     document.getElementById('details').textContent = cardData.description;
// });









