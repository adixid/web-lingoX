let myWord;
let myAttempts;
let counter;
let gameOver;

const myIds = [["js-11", "js-12", "js-13", "js-14"],
              ["js-21", "js-22", "js-23", "js-24"],
              ["js-31", "js-32", "js-33", "js-34"],
              ["js-41", "js-42", "js-43", "js-44"],
              ["js-51", "js-52", "js-53", "js-54"]];
const revealIds = ["js-61", "js-62", "js-63", "js-64"];

const borderMarkerColour = "white";
const correctPosition = 'green';
const wrongPosition = 'orange';

function newGame() {
  
  myWord = [];
  myAttempts = 0;
  counter = 0;
  gameOver = false;
  findWord();
  
  
  // hide these in new round
  document.getElementById("game-result").style.visibility = 'hidden';
  document.getElementById("newgame").style.visibility = 'hidden';

  // play area boxes need to be reset as well
  for (let j=0; j<5; j++) {
    for (let i=0; i<4; i++) {
      document.getElementById(myIds[j][i]).style.backgroundColor = '#0D0D33';
      document.getElementById(myIds[j][i]).style.borderColor = "gray";
      document.getElementById(myIds[j][i]).innerHTML = "";
    }
  }
  showFirstLetter();
}

function findWord() { // computer finds his secret word
  const countWords = words.length;
  let randomNumber = Math.floor(Math.random() * countWords);
  computerWord = words[randomNumber].toUpperCase();
  //console.log(computerWord);
}

function showFirstLetter() {
  document.getElementById(myIds[myAttempts][0]).innerHTML = computerWord[0];
  document.getElementById(myIds[myAttempts][0]).style.color = "darkgray";
  document.getElementById(myIds[myAttempts][0]).style.backgroundColor = correctPosition;
  document.getElementById(myIds[myAttempts][0]).style.borderColor = borderMarkerColour;
}


function confirm(value) {

  if (value === 'play-again') {
    newGame();
  }


  if (counter === 4) {
    if (value === 'ENTER') {
      roundEvaluate();  
    }
  }

  if (value === "DEL") { // correct already entered letters

    if (counter > 0) {
      myWord.pop();
      counter -= 1;
      console.log(myWord);

      if (myWord[counter] === computerWord[counter]) {
        if (counter < 4) {
          document.getElementById(myIds[myAttempts][counter+1]).style.borderColor = "gray";
        }
        document.getElementById(myIds[myAttempts][counter]).innerHTML = computerWord[counter];
        document.getElementById(myIds[myAttempts][counter]).style.color = "darkgray";
        document.getElementById(myIds[myAttempts][counter]).style.borderColor = borderMarkerColour;
        
      } 
      else {
        document.getElementById(myIds[myAttempts][counter]).textContent = "";
        if (counter < 3) {
          document.getElementById(myIds[myAttempts][counter+1]).style.borderColor = "gray";
        }
        document.getElementById(myIds[myAttempts][counter]).style.borderColor = borderMarkerColour;
       
        
      }
    }
  }
  
}

function enterLetter(value) {

  if (gameOver === false) {
    console.log(counter);
    if (counter < 4) {
    document.getElementById(myIds[myAttempts][counter]).innerHTML = value;  // add letter
    document.getElementById(myIds[myAttempts][counter]).style.color = "white"; // change font colour
    document.getElementById(myIds[myAttempts][counter]).style.borderColor = "gray"; // border colour back to gray
  }
  
  if (counter < 3) {
      document.getElementById(myIds[myAttempts][counter+1]).style.borderColor = borderMarkerColour; // move border marker to the next letter
  }

  if (counter === 3) {
    document.getElementById('enter').style.backgroundColor = "rgba(7, 7, 116, 1)";
    document.getElementById('enter').style.color = "white";
  }

  if (counter < 4) {
    myWord.push(value);  // add letter to myword  
  }
  
  if (counter === 4) {
    return;
  } else {
    counter += 1;
    }
  }

  
}

function roundEvaluate() {

  // first check if we won the game
  if (myWord.join("") === computerWord) { 
      for (let i=0; i<4; i++) {
        document.getElementById(myIds[myAttempts][i]).style.backgroundColor = correctPosition;
      }
      resultInfo();
    }
  
  // correct position
  if (gameOver === false) {
    for (let i = 0; i < 4; i++) {
      if (myWord[i] === computerWord[i]) {  // mark correct letter in correct positition
        document.getElementById(myIds[myAttempts][i]).style.backgroundColor = correctPosition;

        if (myAttempts < 4) {
          document.getElementById(myIds[myAttempts+1][i]).style.backgroundColor = correctPosition;
          document.getElementById(myIds[myAttempts+1][i]).innerHTML = computerWord[i];
          document.getElementById(myIds[myAttempts+1][i]).style.color = "darkgray";
        }
      }
    }

    //wrong position
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (myWord[i] === computerWord[j]) {
          if (i != j) {
            document.getElementById(myIds[myAttempts][i]).style.backgroundColor = wrongPosition;
          } 
        }
      }
    }
  }
  

  // reveal correct word
  if (myAttempts === 4) { 
    resultInfo();
  }
  
  // reset counters for next attempt
  myWord = [];
  myAttempts += 1;
  counter = 0;
  if ((myAttempts < 4) && (gameOver === false)) {
    document.getElementById(myIds[myAttempts][counter]).style.borderColor = borderMarkerColour; // mark next round border for first letter
  }
  
  resetEnter();
}


function resultInfo() {
  document.getElementById("newgame").style.visibility = 'visible';
  document.getElementById("game-result").style.visibility = 'visible';

  if (myWord.join("") === computerWord) { 
    document.getElementById("game-result").style.backgroundColor = 'green';
    document.getElementById("game-result").style.color = 'white';
    document.getElementById('game-result').innerHTML = 'Well played, you have found the correct word !';
  } else {
      document.getElementById("game-result").style.backgroundColor = 'red';
      document.getElementById("game-result").style.color = 'white';
      document.getElementById('game-result').innerHTML = `You lose. My word was ${computerWord}.`;
  }

  gameOver = true;
  resetEnter();
}

function resetEnter() {
  document.getElementById('enter').style.backgroundColor = "rgb(2, 2, 59)";
  document.getElementById('enter').style.color = "rgb(169, 170, 170)";
}

newGame();
