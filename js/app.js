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
 * Create a list that holds all of the cards based on
 * HTML
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
 * Initialize Game
 * shuffle the list of cards using the
 * provided "shuffle" method below when page is
 * refreshed
 */
let start = document.getElementById("start");
start.addEventListener("click", event => {
  initGame();
});

/**
 * Execute JavaScript immediately after a page has
 * been loaded
 */
document.body.onload = initGame();

/**
 * Initialize Game
 */
function initGame() {
  openCards = [];
  //matchCard = 0;
  const deck = document.getElementById("deck");

  // Shuffling the cards using the shuffle method
  cards = shuffle(cards);
  // Looping to remove all existing classes off each cards
  for (card of cards) {
    deck.innerHTML = "";
    cards.forEach.call(cards, function(card) {
    deck.appendChild(card);
   });
    card.classList.remove("show", "open", "match", "disabled");
  }

/**
 * Reset moves
 */
setTimeout(function() {
    moves = 0;
    const counterDisplay = document.querySelector(".moves");
    counterDisplay.innerHTML = moves;

/**
 * Reset rating
 */
const stars = document.querySelectorAll(".star");
    stars[1].style.color = "#34fc00";
    stars[2].style.color = "#34fc00";

/**
 * Reset timer
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
 * Listen for clicks on closed cards and respond
 * with function. set up the event listener for a
 * card. If a card is clicked: looping over
 * NodeList of the cards to add event listeners to
 * each card for users clicks
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
 * Open to display card's icons
 * on the deck: display the card's symbol
 */
function cardsOpen(eventTarget) {
  eventTarget.classList.toggle("open");
  eventTarget.classList.toggle("show");
  eventTarget.classList.toggle("disabled");
  openCards.push(eventTarget);
  console.dir(eventTarget);
}

/**
 * Compares two open cards to find a match,
 * or no match
 * then increment the move counter and display it
 * on the page
 */
function openCardsCompare(eventTarget) {
  const numOpenCards = 2;
  if (openCards.length === numOpenCards) {
      movesCounter();
      if (openCards[0].firstElementChild
.className === openCards[1].firstElementChild
.className) {
       match();
      } else {
       noMatch();
   }
 }
}

/**
 * If the cards do match, lock the cards in the
 * open position
 */
function match() {
  openCards[0].classList.add("match", "disabled");
  openCards[1].classList.add("match", "disabled");
  openCards[0].classList.remove("show", "open");
  openCards[1].classList.remove("show", "open");
  openCards = [];
}

/**
 * If the cards do not match, remove the cards
 * from the list and hide the card's symbol.
 * start a timeout, and then flips
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
 * Temporarily disable cards
 */
function disable() {
   Array.prototype.filter.call(cards, function(card) {
     card.classList.add('disabled');
 });
}

/**
 * Enable cards and disable matched cards
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
 * Update moves
 */
function movesCounter() {
  const counterDisplay = document.querySelector(".moves");
  moves++;
  counterDisplay.innerHTML = moves;

/**
 * Start timer on firstClick = first move
 */
if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }

/**
 * Setting stars rating based on num of moves
 */
  const stars = document.querySelectorAll(".star");
  starHTML = "";
  if (moves <= 13){
    starHTML = "<i class='star fa fa-star'></i><i class='star fa fa-star'></i><i class='star fa fa-star'></i>";

    } else if (moves <= 16) {
    stars[2].style.color = "#ff2600";
    starHTML = "<i class='star fa fa-star'></i><i class='star fa fa-star'></i>";

    } else {
    stars[1].style.color = "#0433ff";
    starHTML = "<i class='star fa fa-star'></i>";
  }
}

/**
 * Timer
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
 * Checks to see if game over
 */
function gameOver() {
  const totalCards = 16;
  if(matchCard.length == totalCards) {
    clearInterval(interval);
    gameOverMessage();
    confettiAnimation();
 }
}

/**
 * Congratulates users when all cards match, show
 * modal, moves, time and rating
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
 * Timer stops
 */
function stopTimer() {
  clearInterval(interval);
}

/**
 * Close icon on modal
 */
function closeModal() {
  const closeIcon = document.querySelector(".exit");
  closeIcon.addEventListener("click", function(){
  const popUp = document.getElementById("modal");
  popUp.classList.remove("show");
  document.querySelector("#canvas").style.visibility="hidden";
  //initGame();
})
}

/**
 * Close Button
 */
 function closeButton() {
   const popUp = document.getElementById("modal");
   popUp.classList.remove("show");
   document.querySelector("#canvas").style.visibility="hidden";
   initGame();
 }

/**
 * Play Again
 */
function playAgain() {
  const popUp = document.getElementById("modal");
    popUp.classList.remove("show");
    document.querySelector("#canvas").style.visibility="hidden";
    initGame();
}

/**
 * When the user clicks anywhere outside of the
 * modal, close it.
 */
window.onclick = function(event) {
  const popUp = document.getElementById("modal");
  if (event.target == popUp) {
      popUp.classList.remove("show");
      document.querySelector("#canvas").style.visibility="hidden";
      initGame();
    }
}

function confettiAnimation() {
    document.querySelector("#canvas").style.visibility="visible";

   //canvas init
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const maxConfettis = 150;
    const particles = [];

   //canvas dimensions
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
 	  canvas.height = H;

    const colorUsed = [
      "DodgerBlue",
      "OliveDrab",
      "Gold",
      "Pink",
      "SlateBlue",
      "LightBlue",
      "Gold",
      "Violet",
      "PaleGreen",
      "SteelBlue",
      "SandyBrown",
      "Chocolate",
      "Crimson"
 ];

    function randomFromTo(from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function initConfettiParticle() {

      this.x = Math.random() * W; // x
      this.y = Math.random() * H - H; // y
      this.r = randomFromTo(11, 33); // radius
      this.d = Math.random() * maxConfettis + 11; //density
      this.color =
      colorUsed[Math.floor(Math.random() * colorUsed.length)];
      this.tilt = Math.floor(Math.random() * 33) - 11;
      this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
      this.tiltAngle = 0;

      this.draw = function() {
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
       return context.stroke();
     };
   }
   // Draws the flakes
   function Draw() {
     const results = [];

    //Set recursive frame
     requestAnimationFrame(Draw);

     context.clearRect(0, 0, W, window.innerHeight);

     for (var i = 0; i < maxConfettis; i++) {
       results.push(particles[i].draw());
     }

     let particle = {};
     let remainingFlakes = 0;
     for (var i = 0; i < maxConfettis; i++) {
       particle = particles[i];
       particle.tiltAngle += particle.tiltAngleIncremental;
       particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
       particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

     if (particle.y <= H)
       remainingFlakes++;

     /**
      * If a confetti has fluttered out of view,
      * bring it back to above the viewport and let it
      * re-fall.
      */
       if (particle.x > W + 30 || particle.x < -30 ||
       particle.y > H) {
       particle.x = Math.random() * W;
       particle.y = -30;
       particle.tilt = Math.floor(Math.random() * 10) - 20;
     }
   }
   return results;
 }

   window.addEventListener (
     "resize",
     function() {
       W = window.innerWidth;
       H = window.innerHeight;
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
     },
     false
   );
   // Push new confetti objects to `particles[]`
     for (var i = 0; i < maxConfettis; i++) {
       particles.push(new initConfettiParticle());
     }
   // Initialize canvas
     canvas.width = W;
     canvas.height = H;
     Draw();
}
