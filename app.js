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

