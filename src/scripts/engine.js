// src/scripts/engine.js

const emojis = [
  "🐱",
  "🐱",
  "🦝",
  "🦝",
  "🦊",
  "🦊",
  "🐶",
  "🐶",
  "🐵",
  "🐵",
  "🦁",
  "🦁",
  "🐯",
  "🐯",
  "🐮",
  "🐮",
];

let openCards = [];

function initGame() {
  const shuffled = [...emojis].sort(() => Math.random() - 0.5);
  const gameBoard = document.querySelector(".game");

  shuffled.forEach((emoji) => {
    const card = createCard(emoji);
    gameBoard.appendChild(card);
  });
}

function createCard(emoji) {
  const card = document.createElement("div");
  card.className = "item";
  card.innerHTML = emoji;
  card.onclick = handleCardClick;
  return card;
}

function handleCardClick() {
  if (openCards.length >= 2 || this.classList.contains("boxOpen")) return;

  this.classList.add("boxOpen");
  openCards.push(this);

  if (openCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const [first, second] = openCards;

  if (first.innerHTML === second.innerHTML) {
    first.classList.add("boxMatch");
    second.classList.add("boxMatch");
  } else {
    first.classList.remove("boxOpen");
    second.classList.remove("boxOpen");
  }

  openCards = [];

  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    showModal();
  }
}

function showModal() {
  document.getElementById("winModal").classList.add("active");
}

function closeModal() {
  document.getElementById("winModal").classList.remove("active");
  window.location.reload();
}

document.addEventListener("DOMContentLoaded", initGame);
