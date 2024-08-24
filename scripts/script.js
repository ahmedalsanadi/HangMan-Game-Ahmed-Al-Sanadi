let randomWord = "";
let currentHint = "";
const wordArr = [];
let lifeOnDanger = 0;
let lifeCounter = 10;
const wrongLetters = [];
const answerField = document.querySelector(".answer-field");
const HangmanImg = document.querySelector(".hangman-img");
const remainingLifesSpan = document.querySelector(".life-count");
const hintElement = document.querySelector(".hint-p");
const hintButton = document.querySelector(".hint-btn");

const winModal = document.getElementById("winModal");
const loseModal = document.getElementById("loseModal");
const closeButtons = document.querySelectorAll(".close-btn");
const modalButtons = document.querySelectorAll(".modal-btn");

document.querySelector(".play-again-btn").addEventListener("click", () => {
	resetGame();
});

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
	hintButton.addEventListener("click", displayHint);
});

/* --- this Function will control the whole app (Father for all functions) -----*/
async function ControlleringWholeApp() {
	createAlphabetKeys(letters); // print letters buttons
	const wordData = await fetchRandomWord(); // get the random word and hint via JSON
	randomWord = wordData.word.toUpperCase();
	currentHint = wordData.hint;
	createBlanks(randomWord); // creating blanks according to the length of the random word.
	hintElement.textContent = ""; // Clear any previous hint
}

async function fetchRandomWord() {
	try {
		const response = await fetch("./scripts/db.json");
		const data = await response.json();
		//getw random word from JSON -----------------------------------------
		const randomWordObj =
			data.words[Math.floor(Math.random() * data.words.length)];
		const randomWord = randomWordObj.word.toUpperCase(); // check if word is in uppercase
		const hint = randomWordObj.hint;

		console.log("Random Word is: " + randomWord);
		return { word: randomWord, hint: hint }; // Return both word and hint
	} catch (error) {
		console.error("Error fetching the JSON file:", error);
		return { word: "ERROR", hint: "No hint available." };
	}
}

function createBlanks(word) {
	// Receive random word and print blanks according to its length
	const randomWordLength = word.length;
	wordArr.length = 0; // clear the wordArr
	for (let i = 0; i < randomWordLength; i++) {
		wordArr.push("_");
	}
	answerField.innerHTML = wordArr.join(" "); // to add Empty blanks
}

function createAlphabetKeys(lettersArray) {
	const alphabetButtonContainer = document.querySelector(
		".alphabet-buttons-container"
	);

	// Clear the existing buttons before creating new ones
	alphabetButtonContainer.innerHTML = "";

	lettersArray.forEach((letter) => {
		const letterBtn = document.createElement("button");
		letterBtn.classList.add("letter-btn"); // for styling
		letterBtn.id = letter;
		letterBtn.innerHTML = letter;
		alphabetButtonContainer.appendChild(letterBtn);
		letterBtn.addEventListener("click", () => {
			onLetterClick(letterBtn, letter.toUpperCase()); // Convert to uppercase to match the word
		});
	});
}

function onLetterClick(letterBtn, letter) {
	letterBtn.classList.add("disabled-button");
	const currentValueOfAnswer = answerField.textContent;
	const currentLetterAnswerArray = currentValueOfAnswer.split(" ");
	const randomWordArray = randomWord.split("");

	if (randomWord.includes(letter)) {
		updateLetters(randomWordArray, letter);
	} else {
		lifeOnDanger++;
		let imgSrc = `./images/step${lifeOnDanger}.png`;
		HangmanImg.src = imgSrc;

		lifeCounter--;
		remainingLifesSpan.innerHTML = lifeCounter;

		if (lifeCounter === 0) {
			showLoseModal();
		}
	}
}

function updateLetters(randomWordArr, letter) {
	const indices = [];

	randomWordArr.forEach((char, index) => {
		if (char === letter) {
			indices.push(index);
		}
	});

	indices.forEach((index) => {
		if (wordArr[index] === "_") {
			wordArr[index] = letter;
		}
	});

	answerField.innerHTML = wordArr.map((char) => char).join(" ");

	if (!wordArr.includes("_")) {
		showWinModal();
	}
}

function displayHint() {
	if (currentHint) {
		hintElement.textContent = `Hint: ${currentHint}`;
	} else {
		hintElement.textContent = "No hint available.";
	}
}

function resetGame() {
	lifeCounter = 10;
	lifeOnDanger = 0;
	wrongLetters.length = 0;
	remainingLifesSpan.innerHTML = lifeCounter;
	HangmanImg.src = "./images/step0.png";
	hintElement.textContent = ""; // Clear the hint
	const buttons = document.querySelectorAll(".letter-btn");
	buttons.forEach((btn) => {
		btn.classList.remove("disabled-button");
	});

	ControlleringWholeApp();
}

// Modals code starts here ----------------------------------------------------------------------//

function showWinModal() {
	winModal.style.display = "flex";
}

function showLoseModal() {
	loseModal.style.display = "flex";
}

closeButtons.forEach((btn) => {
	btn.addEventListener("click", closeModal);
});

modalButtons.forEach((btn) => {
	btn.addEventListener("click", closeModal);
});

function closeModal() {
	winModal.style.display = "none";
	loseModal.style.display = "none";
	resetGame();
}
