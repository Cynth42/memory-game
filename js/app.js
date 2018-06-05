/*
 * Define Variables
 */
 let moves = 0;
 let matchedCard = document.getElementsByClassName("match");
 let listOfStars = document.querySelectorAll(".stars li");
 let openCards = [];
 let hour, second, minutes;

 const deck = document.getElementById("deck");
 const stars = document.querySelectorAll(".fa-star");
 const counterDisplay = document.querySelector(".moves");
 const closeIcon = document.querySelector(".close");
 const popUp = document.getElementById("modal");

/*
 * Create a list that holds all of the cards based on HTML
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
 *   - shuffle the list of cards using the provided "shuffle" method below when page is refreshed
*/
let start = document.getElementById("start");
start.addEventListener(click; function() {
startGame();
});

function startGame() {
cards = shuffle(cards);
for (let i = 0; i < cards.length){
  deck.innerHTML = "";
  [].forEach.call(cards, function(item) {
  deck.appendChild(item);
});
cards[i].classList.remove("show", "open", "match", "disabled");
}
/* reset moves*/
moves = 0;
counterDisplay.innerHTML = moves;
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

/* Use toggle open and show to Display the cards on the page*/
let displayCard = function (){
this.classList.toggle("open");
this.classList.toggle("show");
this.classList.toggle("disabled");
};


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
 /*  - add the card to a *list* of "open" cards and check if cards are match or not (put this functionality in another function that you call from this one)*/

function openCard() {
openCards.push(this);
//let length = openCards.length;
if(openCards.length === 2){
  moveCounter();
if(openCards[0].type === openCards[1].type){
  match();
} else {
  notMatch();
}
}
};

/*if the cards do match, lock the cards in the open position */
\
function match() {
   openCards[0].classList.add("match", "disabled");
   openCards[1].classList.add("match", "disabled");
   openCards[0].classList.remove("show", "open");
   openCards[1].classList.remove("show", "open");
   openCards = [];
}

/*if the cards do not match, remove the cards from the list and hide the card's symbol*/
function noMatch(){
openCards[0].classList.add("notMatch");
openCards[1].classList.add("notMatch");
disable();
setTimeout(function(){
openCards[0].classList.remove("show", "open", "notMatch");
openCards[1].classList.remove("show", "open", "notMatch");
enable();
openCards = [];
},1100);
}
/*temporarily disable cards */
function disable(){
[].prototype.filter.call(cards, function(card){
card.classList.add('disabled');
});
}
/*enable cards and disable matched cards*/
function enable(){
[].prototype.filter.call(cards, function(card){
card.classList.remove('disabled');
for(let i = 0; i < matchCard.length; i++){
matchCard[i].classList.add("disabled");
}
});
}

function moveCounter(){
moves++;
counterDisplay.innerHTML = moves;
/* start timer on first click*/
if (moves == 1){
second = 0;
minute = 0;
hour = 0;
startTimer();
}

/* setting stars rating based on num of moves*/
/*if (moves > 8 && moves < 12){
for( i = 0; i < 3; i++){
if(i > 1){
stars[i].style.visibility = "hidden";
}
}
}
else if (moves > 13){
for( i = 0; i < 3; i++){
if(i > 0){
stars[i].style.visibility = "hidden";
}
}
}
}*/

/*timer*/
let second = 0, minute = 0; hour = 0;
let timer = document.querySelector(".timer");
let interval;
function startTimer(){
interval = setInterval(function(){
timer.innerHTML = minute+"mins "+second+"secs";
second++;
if (second == 60){
minute++;
second=0;
}
if (minute == 60){
hour++;
minute = 0;
}
},1000);
}
// congratulations when all cards match, show modal and moves, time and rating
/*function congratulations(){
if (matchedCard.length == 16){
clearInterval(interval);
finalTime = timer.innerHTML;
// show congratulations modal
modal.classList.add("show");
// declare star rating variable
let starRating = document.querySelector(".stars").innerHTML;
//showing move, rating, time on modal
document.getElementById("finalMove").innerHTML = moves;
document.getElementById("starRating").innerHTML = starRating;
document.getElementById("totalTime").innerHTML = finalTime;
//closeicon on modal
closeModal();
};
}
//close icon on modal
function closeModal(){
closeicon.addEventListener("click", function(e){
modal.classList.remove("show");
startGame();
});
}
// for user to play Again
function playAgain(){
modal.classList.remove("show");
startGame();
}
// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
card = cards[i];
card.addEventListener("click", displayCard);
card.addEventListener("click", cardOpen);
card.addEventListener("click",congratulations);
};*/



/*  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
