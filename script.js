const cardsArray = ['🐱', '🐶', '🐰', '🦊', '🐸', '🐵', '🐮', '🐼'];
let cards = [...cardsArray, ...cardsArray]; // 8 pairs
cards = shuffle(cards);

const board = document.getElementById("gameBoard");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

document.getElementById('restart-btn').addEventListener('click', () => {
  // Game reset karne ka function call karo
  startGame(); // <-- Apne game init function ka naam yahan lagayein
});


function createCard(value) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = value;
  card.innerText = '';
  card.addEventListener("click", handleCardClick);
  return card;
}

function startGame() {
  board.innerHTML = '';
  cards.forEach(value => {
    board.appendChild(createCard(value));
  });
}

function handleCardClick() {
  if (lockBoard || this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  this.innerText = this.dataset.value;

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;
    moves++;
    document.getElementById("moves").innerText = `Moves: ${moves}`;

    if (firstCard.dataset.value === secondCard.dataset.value) {
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      resetTurn();
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.innerText = '';
        secondCard.innerText = '';
        resetTurn();
      }, 1000);
    }
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

startGame();
