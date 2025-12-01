// Selecting all cards
const cardsContainer = document.querySelector(".cards");
const restartBtn = document.getElementById("restartBtn");

let cards; 
let cardOne = null;
let cardTwo = null;
let disableDeck = false;
let matched = 0;

// Shuffle and prepare cards
function shuffleCards() {

    cardsContainer.innerHTML = ""; // Clear previous cards
    matched = 0;
    cardOne = cardTwo = null;
    disableDeck = false;

    let cardNumbers = [1,2,3,4,5,6,7,8];
    let gameCards = [...cardNumbers, ...cardNumbers];  // Duplicate

    // Shuffle array
    gameCards.sort(() => Math.random() - 0.5);

    // Create 16 cards dynamically
    gameCards.forEach(num => {
        const card = document.createElement("li");
        card.classList.add("card");

        card.innerHTML = `
            <div class="view front-view">
                <img src="images/que_icon.png">
            </div>
            <div class="view back-view">
                <img src="images/img-${num}.png">
            </div>
        `;

        cardsContainer.appendChild(card);
    });

    // Re-select cards after creation
    cards = document.querySelectorAll(".card");
    cards.forEach(card => card.addEventListener("click", flipCard));
}

// Flip card
function flipCard(e) {
    let clickedCard = e.currentTarget;

    if (clickedCard === cardOne || disableDeck) return;

    clickedCard.classList.add("flip");

    if (!cardOne) {
        cardOne = clickedCard;
        return;
    }

    cardTwo = clickedCard;
    disableDeck = true;

    checkMatch();
}

// Check matching
function checkMatch() {
    let img1 = cardOne.querySelector(".back-view img").src;
    let img2 = cardTwo.querySelector(".back-view img").src;

    if (img1 === img2) {
        matched++;

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);

        cardOne = cardTwo = null;
        disableDeck = false;

        if (matched === 8) {
            setTimeout(shuffleCards, 1000);
        }
    } 
    else {
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 300);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");

            cardOne = cardTwo = null;
            disableDeck = false;
        }, 1000);
    }
}

// Restart button
restartBtn.addEventListener("click", shuffleCards);

// Start game
shuffleCards();
