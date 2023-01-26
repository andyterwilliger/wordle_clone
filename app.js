//variables
const letters = document.querySelectorAll(".letter");
const answer_length = 5;
const ROUNDS = 6;
const loadingDiv = document.querySelector(".loading-header");
console.log(letters);

async function init() {
  let currentGuess = "";
  let currentRow = 0;
  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const resObj = await res.json();
  //destructuring = const { word } = await res.json()
  const word = resObj.word.toUpperCase();
  const wordParts = word.split("");
  const map = makeMap(wordParts);
  let done = false;
  console.log(map);
  console.log(wordParts);
  console.log(word);

  function addLetter(letter) {
    //setting answer length instead of 5 here to be clear in code
    if (currentGuess.length < answer_length) {
      //add letter to the end
      currentGuess += letter;
    } else {
      //replaces the last letter
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    letters[answer_length * currentRow + currentGuess.length - 1].innerText =
      letter;
  }

  async function commit() {
    if (currentGuess.length != answer_length) {
      //do nothing
      return;
    } 
      
    //TODOneed to validate word
    //TODO marking 'correct' 'wrong' 'close'
    const guessParts = currentGuess.split("");

    for (let i = 0; i < answer_length; i++) {
      //mark as correct
      if (guessParts[i] === wordParts[i]) {
        //it's right
        letters[currentRow * answer_length + i].classList.add("correct");
        map[guessParts[i]]--;
      }
    }

    for (let i = 0; i < answer_length; i++) {
      if (guessParts[i] === wordParts[i]) {
        //already done, do nothing
      } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
        letters[currentRow * answer_length + i].classList.add("close");
        map[guessParts[i]]--;
      } else {
        letters[currentRow * answer_length + i].classList.add("incorrect");
      }
    }

    currentRow++;
    currentGuess = "";

    //lose
    if (currentGuess === word) {
      // YOU WIN
      done = true;
      alert("YOU WIN");
      
    } else if (currentRow === ROUNDS) {
    
      alert(`You lose! The word was ${word}`);
      done = true;
    }
    currentGuess=''
  }

function backspace() {
  currentGuess = currentGuess.substring(0, currentGuess.length - 1);
  letters[answer_length * currentRow + currentGuess.length].innerText = "";
}

function setLoading(isLoading) {
  console.log(isLoading);
  loadingDiv.classList.toggle("show", !isLoading);
}

document.addEventListener("keydown", function handleKeyPress(e) {
  if (done) {
    return;
  }

  const action = e.key;
  console.log(action);

  if (action === "Enter") {
    commit();
  } else if (action === "Backspace") {
    backspace();
  } else if (isLetter(action)) {
    addLetter(action.toUpperCase());
  } else {
    alert("Not a valid letter!");
  }
});

// API CALL TO GET WORD OF THE DAY

let getWord = async function () {
  //define the URL we send a get request to "get" data from
  URL = "https://words.dev-apis.com/word-of-the-day";
  //declare variable, store our fetch function in it
  const promise = await fetch(URL);
  console.log(promise);
  const processedResponse = await promise.json();
  let wordOfTheDay = processedResponse.word;
  console.log(wordOfTheDay);
};

//POST method to see if word is valid

//handle a keystroke
/*
let keyStroke = function(){
    addEventListener('keydown', (e) =>{
        console.log(e)
        let x = e.keyCode;
        console.log(x)
        if (x >= 48 && x <= 57) {
            alert('Not a valid letter!')
        } else if (x >= 65 && x <= 90) {
            console.log('letter UC')
            //document.getElementById('letter-1').textContent = e.key;
        } else if (x >= 97 && x <= 122) {
            document.getElementById('letter-1').textContent = e.key;
        }
    })
}
*/

//checking if key is letter

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

//makes an object of the letters of the array

function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    if (obj[letter]) {
      //returns true
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }
  return obj;
}
}
init();
