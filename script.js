const cardsArray = ['🍎','🍌','🍓','🍇','🍒','🍋','🍑','🥝'];
let gameGrid = [...cardsArray, ...cardsArray];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restart');

// Shuffle function
function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
}

// Create cards
function createBoard() {
    shuffle(gameGrid);
    gameBoard.innerHTML = '';

    gameGrid.forEach(fruit => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.fruit = fruit;
        card.setAttribute('data-fruit', fruit);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip card
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Check if cards match
function checkForMatch() {
    let isMatch = firstCard.dataset.fruit === secondCard.dataset.fruit;

    isMatch ? disableCards() : unflipCards();
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Unflip cards if not matched
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Reset board state
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Restart game
restartBtn.addEventListener('click', createBoard);

// Initialize
createBoard();
