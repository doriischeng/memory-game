const gameContainer =
  document.getElementById("game");

//We have an array of colors which we shuffle below
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "yellow",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(
      Math.random() * counter
    );

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

//now we have the array of colors shuffled - not in order we defined

// this function loops over the array of colors
// it creates a new div and (total 10) gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute (assign a class) for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener(
      "click",
      handleCardClick // whenever clicked on each div (card), then this function
    );

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

//has to be outside of the function, otherwise will loop and forever in false//
//then will never get to second click
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let cardFlipped = 0;
let currentScore = 0;

let startButton = document.querySelector(
  "#start-button"
);
startButton.addEventListener("click", startGame);

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  // console.dir(event.target);

  //if lockboard is true, then lock the board, rest of code won't get executed
  if (lockBoard) return;
  //if clicked card = firstCard, then won't run rest of code
  //to avoid double clicking to match
  if (event.target.classList.contains("flipped"))
    return;

  //change background color when card is clicked
  const backgroundColor = event.target.className;
  event.target.style.backgroundColor =
    backgroundColor;

  event.target.classList.add("flipped");

  //whenever card clicked, add one score - send to a function to update current score on html
  setScore(currentScore + 1);

  //identify the first and second card clicked so can do matching logic
  if (!hasFlippedCard) {
    //this is first card clicked
    //if hasFlippedCard is false, meaning this is first time flipping,
    //then you set status to yes, has flipped, so to true
    hasFlippedCard = true;
    firstCard = event.target;
  } else {
    //if hasFlippedCard is true, meaning this is not first time flipping,
    //meaning it is the second attempt, then you set back to false,
    //so that next round would loop this again, 1st attempt false, 2nd true
    hasFlippedCard = false;
    secondCard = event.target;

    //do cards match?
    if (
      firstCard.classList[0] ===
      secondCard.classList[0]
    ) {
      cardFlipped += 2;
      firstCard.removeEventListener(
        "click",
        handleCardClick
      );
      secondCard.removeEventListener(
        "click",
        handleCardClick
      );
    } else {
      //if not match, then lock the board, can't click anything
      //until the cards have been flipped back, can unlock to click again
      lockBoard = true;
      //need to call a function here, so that code can be run
      setTimeout(function () {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        //now cards are flipped back, can allow user to click again
        lockBoard = false;
      }, 1000);
    }
  }

  if (cardFlipped === COLORS.length) {
    endGame();
  }
}

//DO NOT UNDERSTAND - ASK MENTOR

function startGame() {
  setScore(0);
  start.classList.add("playing");
  // let indices = [];
  // for (let i = 1; i <= COLORS.length / 2; i++) {
  //   indices.push(i.toString());
  // }
  // let pairs = shuffle(indices.concat(indices));

  // for (let i = 0; i < COLORS.length; i++) {
  //   let path = "gifs/" + pairs[i] + ".gif";
  //   cards[i].children[1].children[0].src = path;
  // }
}

//set the score - time of flipping
//call a function when adding score, so current score + 1 = new score
function setScore(newScore) {
  currentScore = newScore; //newScore is like a placeholder, changing
  document.querySelector(
    "#current-score"
  ).innerText = `Current Score: ${currentScore}`; //modify the current score display on html
}

function endGame() {
  let end = document.querySelector("#end");
  let message = end.children[1];
  message.innerText = `Your score: ${currentScore}`;
  end.classList.add("game-over");
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */

//tracking
//flippedCards will be used to keep track of the number of flips.
//Only two cards can be flipped at a time.

//totalFlips will keep track of the total number of moves
//alert gameover when done

//Current card clicked
//to flip a card, you loop through all the div cards
//and on each of them, add event listener click, then a function flip card
//declare function:
//1. identify the target element being clicked
//2. access its properties by using classList?
//3. use toogle("flip" - meaning if the class is there, remove, if not, add)

//store cards
//need to know if this is the first or second card he clicks
//so we can perform the matching logic

//matching logic:
//now that we can identify our card - see the value
//if card 1 class attribute(class) === class 2 class attribute
//then 1. remove event listener to prevent being clicked again
//if not match, 1. flip card back to original state - remove the flip class
//2. add a second delay using setTimeout

//lockboard - prevent clicking after two cards - max
//if not a match, need to lock and wait until other cards finish flipping
//return to function if locakboard is true so rest won't get executed
//only unlock it when cards have been flipped

//card double click - prevent clicking same card to get result
//need to reset board
