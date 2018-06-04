/*
 * Define Variables
 */
 let moves = 0;
 let counter = document.querySelector(".moves");
 let matchedCard = document.getElementsByClassName("match");
 let listOfStars = document.querySelectorAll(".stars li");
 let openedCards = [];
 let hour, second, minutes;

 const deck = document.getElementById("deck");
 const stars = document.querySelectorAll(".fa-star");
 const closeIcon = document.querySelector(".close");
 const modal = document.getElementById("pop-up");




/*
 * Create a list that holds all of your cards
 */
const cards = document.getElementsByClassName("card");
console.log(...cards);



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
// While there remain elements to shuffle...
    while (currentIndex !== 0) {
// Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
// And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
     - when page is refreshed
*/
function startGame() {

cards = shuffle(cards);
/* remove all exisiting classes from each card*/
for (let i = 0; i < cards.length; i++){
deck.innerHTML = "";
[].forEach.call(cards, function(item) {
deck.appendChild(item);
});
cards[i].classList.remove("show", "open", "match", "disabled");
}
/* reset moves*/
moves = 0;
counter.innerHTML = moves;
/* reset rating*/
for (let i = 0; i < stars.length; i++){
stars[i].style.color = "#34FC00";
stars[i].style.visibility = "visible";
}
/*reset timer*/
second = 0;
minute = 0;
hour = 0;
let timer = document.querySelector(".timer");
timer.innerHTML = "0 mins 0 secs";
clearInterval(interval);
}

/*   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is *clicked:
 */
 /*for (let i = 0; i < cards.length; i++) {
   cards[i].addEventListener("click", displayCards);

   }
/*  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
