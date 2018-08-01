/**
 * Declare Variables
 */
 let openCards = [];
 let starHTML = "";
 let moves = 0;
 let interval;
 let matchCard = document.getElementsByClassName("match");
 let totalmoves = document.getElementById("finalMove");
 let totalTime = document.getElementById("finalTime");

/**
 * Create a list that holds all of the cards based on HTML
 */
 let card = document.getElementsByClassName("card");
//spreading out the array of cards to form a list
 let cards = [...card];
 console.log(cards);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
   let currentIndex = array.length;
// While there remain elements to shuffle...
    while (currentIndex !== 0) {
// Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
// And swap it with the current element.
        let temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

/**
 * shuffle the list of cards using the provided "shuffle" method below when page is refreshed
 */
let start = document.getElementById("start");
start.addEventListener("click", event => {
  initGame();
});

/**
 * execute a JavaScript immediately after a page has been loaded from StackOverFlow
 */
document.body.onload = initGame();

/**
 * Initialize Game
 */
function initGame() {
  openCards = [];
  const deck = document.getElementById("deck");
  cards = shuffle(cards);
  for (card of cards) { 
    deck.innerHTML = "";
    cards.forEach.call(cards, function(card) {
      deck.appendChild(card);
   });
      card.classList.remove("show", "open", "match", "disabled");
  }

 setTimeout(function() {

/**
 * reset moves
 */
     moves = 0;
     const counterDisplay = document.querySelector(".moves");
     counterDisplay.innerHTML = moves;

/**
 * reset rating
 */ 
     const stars = document.querySelectorAll(".star");
     stars[1].style.color = "#34fc00";
     stars[2].style.color = "#34fc00";

/**
 * reset timer
 */
     second = 0;
     minute = 0;
     hour = 0;
     const timer = document.querySelector(".timer");
     clearInterval(interval);
     timer.innerHTML = "0 mins 0 secs";
   },500)
}

/**
 * If a closed card is clicked, respond with function.
 * looping over NodeList of the cards to add event listeners to each card for users clicks
 */
for (card of cards) {
  card.addEventListener("click", event => { 
   eventTarget = event.target;
    if (eventTarget.className == 'card') {
      cardsOpen(eventTarget);
      openCardsCompare(eventTarget);
      gameOver();
    }
  });
}

/** 
 * open to display card's icons
 * on the deck: display the card's symbol
 */
function cardsOpen(eventTarget) {
  eventTarget.classList.toggle("open");
  eventTarget.classList.toggle("show");
  eventTarget.classList.toggle("disabled");
  openCards.push(eventTarget);
 
}

/** 
 * compares two open cards to find a match, or no match
 * then increment the move counter and display it on the page
 */
function openCardsCompare(eventTarget) { 
  const numOpenCards = 2; 
  if (openCards.length === numOpenCards) {
    movesCounter(); 
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {  
     match();
    } else {
    noMatch();
  } 
 }
}

/**
 *if the cards do match, lock the cards in the open position
 */
function match() {
  openCards[0].classList.add("match", "disabled");
  openCards[1].classList.add("match", "disabled");
  openCards[0].classList.remove("show", "open");
  openCards[1].classList.remove("show", "open");
  openCards = [];
}

/**
 * if the cards do not match, remove the cards from the list and *hide the card's symbol. start a timeout, and then flips
 * the cards back and clears the openCards array.
 */
function noMatch() {
  openCards[0].classList.add("noMatch");
  openCards[1].classList.add("noMatch");
  disable();
  setTimeout(function() {
  openCards[0].classList.remove("show", "open", "noMatch");
  openCards[1].classList.remove("show", "open", "noMatch");
  enable();
  openCards = [];
 },1000);
}

/**
 * created a disable and enable functions to avoid clicking on the same card twice.  Idea came from study jam on slack                
 */
function disable() {
   Array.prototype.filter.call(cards, function(card) {
     card.classList.add('disabled');
 });
}

/**
 * enable cards and disable matched cards
 */
function enable() {
   Array.prototype.filter.call(cards, function(card) {
     card.classList.remove('disabled');    
     for(let i = 0; i < matchCard.length; i++) {
       matchCard[i].classList.add("disabled");
  }
 });
}

/** 
 * update moves
 */
function movesCounter() {
  const counterDisplay = document.querySelector(".moves");
  moves++;
  counterDisplay.innerHTML = moves;

/**
 * start timer on first moveclick
 */
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }

/**
 * setting stars rating based on num of moves
 */
  const stars = document.querySelectorAll(".star");
  starHTML = "";
  if (moves <= 13){  
    starHTML = "<i class='star fa fa-star'></i><i class='star fa fa-star'></i><i class='star fa fa-star'></i>";
     } else if (moves <= 16) {
     stars[2].style.color = "#011969";
     starHTML = "<i class='star fa fa-star'></i><i class='star fa fa-star'></i>";
     } else {
     stars[1].style.color = "#011969";
     starHTML = "<i class='star fa fa-star'></i>";
  }
}

/**
 *timer 
 */
function startTimer() {
  const timer = document.querySelector(".timer");
  second = 0;
  minute = 0;
  hour = 0;
  interval = setInterval(function() {
  timer.innerHTML = minute+"mins "+second+"secs";
  second++;
  if (second == 60) {
    minute++;
    second = 0;
 }
  if (minute == 60) {
    hour++;
    minute = 0;
 }
 },1000);
}

/**
 * checks to see if game over
 */
function gameOver() {
  const totalCards = 16; 
  if(matchCard.length == totalCards) {
    clearInterval(interval);
    gameOverMessage();
 }
}

/**
 * congratulates users when all cards match, show modal, moves, time and rating
 */
function gameOverMessage() {
  const timer = document.querySelector(".timer");
  totalTime = timer.innerHTML;
  const popUp = document.getElementById("modal");
  popUp.classList.add("show");
  const rating = document.getElementById("rating");
  rating.innerHTML = starHTML;
  const stars = document.querySelectorAll(".star");
  document.getElementById("finalTime").innerHTML = totalTime;
  document.getElementById("totalMove").innerHTML = moves;
  stopTimer();
  closeModal();
}

/**
 * timer stops
 */
function stopTimer() {
  clearInterval(interval);
}

/**
 * close icon on modal
 */
function closeModal() {
  const closeIcon = document.querySelector(".close");
  closeIcon.addEventListener("click", function(event){
  const popUp = document.getElementById("modal");
  popUp.classList.remove("show");
  initGame();
 })
}

/**
 * play Again
 */
function playAgain() {
  const popUp = document.getElementById("modal");
  popUp.classList.remove("show");
  initGame();
}

/**
 * When the user clicks anywhere outside of the modal, close it
 */
window.onclick = function(event) {
  const popUp = document.getElementById("modal");
    if (event.target == popUp) {
        popUp.style.display = "none";
        initGame;
    }
 }
