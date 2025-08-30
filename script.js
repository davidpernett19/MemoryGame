const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard, secondCard;

// --- Voltear carta ---
function flipCard() {
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// --- Verificar coincidencia ---
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

// --- Deshabilitar si son iguales ---
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

// --- Voltear de nuevo si no coinciden ---
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

// --- Reset de variables ---
function resetBoard() {
  [hasFlippedCard, firstCard, secondCard] = [false, null, null];
}

// --- Barajar cartas ---
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12); // porque son 12 cartas
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
