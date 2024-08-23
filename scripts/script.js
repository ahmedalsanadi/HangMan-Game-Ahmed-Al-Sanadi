
    const answerField = document.querySelector(".answer-field "); // where blanks and  correct letters are place
    const alphabetButtonConatainer = document.querySelector(".alphabet-buttons-container");// contains buttons of letters
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
   
    document.addEventListener("DOMContentLoaded" , () => {
        ControlleringWholeApp();
    });

 /* --- this Function will controll the whole app (Father for all functions) -----*/   
    async function ControlleringWholeApp()
    {
        createAlphabetKeys(letters);                  // print letters buttons
        const randomWord = await fetchRandomWord();  //get the random word via API
        createBlanks(randomWord);                   //creating blanks according to the lemgth of the random word.
        

    }

async function fetchRandomWord() {

    const response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
    const data = await response.json();
    const randomWord = data[0];
    return randomWord;
}



 function createBlanks(word) // recieve random word and print blanks according to its length
 {
    const randomWordLength= word.length;
    let blanks =[];
    for(let i = 0; i<= randomWordLength; i++)
    {
        blanks.push('_');
    }
    console.log(blanks.join(" ")); // join array elements in one string
    answerField.innerHTML = blanks.join(" "); // to add Empty blanks 
 }



function createAlphabetKeys(lettersArray)
{
    lettersArray.forEach(letter => {
       const letterBtn = document.createElement('button');
       letterBtn.classList.add('letter-btn');
       letterBtn.id = letter;
       letterBtn.innerHTML =letter;
       alphabetButtonConatainer.appendChild(letterBtn); 
    });

}
