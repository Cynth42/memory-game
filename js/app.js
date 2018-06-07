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
 * Define Variables
 */
 let moves = 0;
 let matchCard = document.getElementsByClassName("match");
 let listOfStars = document.querySelectorAll(".stars li");
 let openCards = [];
 let hour, second, minutes;

 const deck = document.getElementById("deck");
 const stars = document.querySelectorAll(".fa-star");
 const counterDisplay = document.querySelector(".moves");
 const closeIcon = document.querySelector(".close");
 const popUp = document.getElementById("modal");


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
const starsRating = document.querySelector(".stars");
let star1 = document.getElementById("starOne");
let star2 = document.getElementById("starTwo");
let star3 = document.getElementById("startThree");

if (moves < 12){
	starsRating.innerHTML = star1 + star2 + star3;
} else if (moves < 16) {
    starsRating.innerHTML = star1 + star2;
} else {
    starsRating.innerHTML = star1;
  }
}

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

/*
 * Create a list that holds all of the cards based on HTML
 */
const cards = document.getElementsByClassName("card");
console.log(...cards);

/* Use toggle open and show to Display the cards on the page*/
let displayCard = function (){
this.classList.toggle("open");
this.classList.toggle("show");
this.classList.toggle("disabled");
};

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

 /*  - add the card to a *list* of "open" cards and check if cards are match or not (put this functionality in another function that you call from this one)*/
function openCardsCompare() {
openCards.push(this);
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
function match() {
	openCards[0].classList.add("match", "disabled");
    openCards[1].classList.add("match", "disabled");
    openCards[0].classList.remove("show", "open");
    openCards[1].classList.remove("show", "open");
    openCards = [];
}

/*If the cards do not match, remove the cards from the list and hide the card's symbol*/
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
/*temporarily disable cards*/
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

/* congratulations when all cards match, show modal and moves, time and rating*/
function gameOverMessage() {
if (matchCard.length == 16) {
	clearInterval(interval);
	finalTime = timer.innerHTML;
/*show congratulations on modal*/
  	popUp.classList.add("show");
/*show star rating in modal*/
  	starsRating = document.querySelector(".stars").innerHTML;
/*showing move, rating, time on modal*/
 	document.getElementById("finalMove").innerHTML = moves;
 	document.getElementById("starRating").innerHTML = starRating;
 	document.getElementById("totalTime").innerHTML = finalTime;
/*call closeicon on modal*/
 	closeModal();
};
}
/*close icon on modal*/
function closeModal(){
	closeIcon.addEventListener("click", function(e){
	popUp.classList.remove("show");
	startGame();
});
}
/*play Again*/
function playAgain(){
	popUp.classList.remove("show");
	startGame();
}
// loop to add event listeners to each card
for (let i = 0; i < cards.length; i++) {
	card = cards[i];
	card.addEventListener("click", displayCard);
	card.addEventListener("click", openCard);
	card.addEventListener("click",congratulations);
};
