//variables
const letters = document.querySelectorAll('.letter');
const answer_length = 5;
console.log(letters)

async function init(){
    let currentGuess = "";

    function addLetter(letter){
        //setting answer length instead of 5 here to be clear in code
        if(currentGuess.length < answer_length){
            currentGuess+=letter;
        } else{
            currentGuess = currentGuess.substring(0, currentGuess.length-1) + letter;
        }

        letters[currentGuess.length - 1].innerText = letter;
    }

    document.addEventListener('keydown', function handleKeyPress(e){
        const action = e.key;
        console.log(action)

        if(action === 'Enter'){
            commit();
        } else if(action === 'Backspace'){
            backspace();
        }
         else if(isLetter(action)){
            addLetter(action.toUpperCase())
         } else{
            alert('Not a valid letter!')
         }
    })
}



// API CALL TO GET WORD OF THE DAY

let getWord = async function (){
    //define the URL we send a get request to "get" data from
    URL = "https://words.dev-apis.com/word-of-the-day";
    //declare variable, store our fetch function in it
    const promise = await fetch(URL);
    console.log(promise);
    const processedResponse = await(promise.json());
    let wordOfTheDay = processedResponse.word;
    console.log(wordOfTheDay)

}

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

function isLetter(letter){
    return /^[a-zA-Z]$/.test(letter);
}

init()
