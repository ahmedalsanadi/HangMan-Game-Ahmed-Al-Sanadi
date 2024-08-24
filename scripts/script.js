let randomWord = "";
const wordArr = [];

const answerField = document.querySelector(".answer-field "); // where blanks and  correct letters are place
const letters = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];

document.addEventListener("DOMContentLoaded", () => {
	ControlleringWholeApp();
});

/* --- this Function will controll the whole app (Father for all functions) -----*/
async function ControlleringWholeApp() {
	createAlphabetKeys(letters); // print letters buttons
	randomWord = await fetchRandomWord(); //get the random word via API
	createBlanks(randomWord); //creating blanks according to the lemgth of the random word.
}

async function fetchRandomWord() {
	const response = await fetch(
		"https://random-word-api.herokuapp.com/word?number=1"
	);
	const data = await response.json();
    console.log(data[0]);
    
	return data[0]; // this returns the random word as a string
}
function createBlanks(word) {
    // recieve random word and print blanks according to its length
    const randomWordLength = word.length;
    wordArr.length = 0; // clear the wordArr
    for (let i = 0; i < randomWordLength; i++) {
      wordArr.push("_");
    }
    answerField.innerHTML = wordArr.join(" "); // to add Empty blanks
  }

function createAlphabetKeys(lettersArray) {
	const alphabetButtonConatainer = document.querySelector(
		".alphabet-buttons-container"
	); // contains buttons of letters
	lettersArray.forEach((letter) => {
		const letterBtn = document.createElement("button");
		letterBtn.classList.add("letter-btn"); //for styling
		letterBtn.id = letter;
		letterBtn.innerHTML = letter;
		alphabetButtonConatainer.appendChild(letterBtn);
		letterBtn.addEventListener("click", () => {
			onLetterClick(letterBtn, letter);
		});
	});
}

function onLetterClick(letterBtn, letter) {
	letterBtn.classList.add("disabled-button"); // to disable the clicked btn from working again
	const currentValueOfAnswer = answerField.textContent; // get the current value of answer
	const currentLetterAnswerArray = currentValueOfAnswer.split(" "); // create an array with letters of current answer
	const randomWordArray = randomWord.split("");

	if (randomWord.includes(letter)) 
    {
		console.log("true");
        updateLetters(randomWordArray, letter);
	} 
    else {
		console.log("false");
	}
	//  console.log("iam current answer array "+currentLetterAnswerArray);
	//  console.log("iam randomWordArray "+randomWordArray);
}

function updateLetters(randomWordArr, letter) {
    const indices = []; // this will save the indexs where the correct letter is found in the randword word
  
    // Find all the indices where the letter appears in the randomWordArr
    randomWordArr.forEach((char, index) => {
      if (char === letter) {
        indices.push(index);
      }
    });
  
    // Update the wordArr based on the found indices
    indices.forEach((index) => {
      if (wordArr[index] === "_") {
        wordArr[index] = letter;
      }
    });
  
    // Update the answerField with the updated wordArr
    answerField.innerHTML = wordArr.map((char) => char).join(" ");
  }