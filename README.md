# Hangman Game

Hangman is a classic word guessing game where the player tries to guess a hidden word by suggesting letters. If a suggested letter is in the word, it is revealed; if not, a part of the hangman diagram is drawn. The player continues to suggest letters until they either guess the word correctly or run out of attempts, resulting in a game over.

## Live Demo

You can play the Hangman game live by visiting the [demo page](https://ahmedalsanadi.github.io/HangMan-Game-Ahmed-Al-Sanadi/).

## Features

- **Word Selection**: The game randomly selects a word from a predefined list of words.
- **Letter Guessing**: The player can guess letters by clicking on the on-screen keyboard.
- **Lives Tracking**: The player has a limited number of incorrect guesses (lives) before the game ends.
- **Hints**: The player can request a hint to assist in guessing the word.
- **Play Again**: The player can reset the game and play again.
- **Responsive Design**: The game is optimized for both desktop and mobile devices.

## Usage

To run the Hangman game locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/ahmedalsanadi/hangman-game.git
   ```
2. Navigate to the project directory:
   ```
   cd hangman-game
   ```
3. Open the `index.html` file in your web browser.

Alternatively, you can visit the [live demo](https://example.com/hangman-game) to play the game directly.

## Development

The Hangman game is built using HTML, CSS, and JavaScript. The following is a breakdown of the key components:

1. **HTML Structure**: The game's structure is defined in the `index.html` file, including the layout of the game board, keyboard, and modal elements.
2. **CSS Styling**: The `style.css` file contains the styling rules for the game's visual elements, ensuring a consistent and responsive design.
3. **JavaScript Logic**: The `script.js` file houses the game's logic, including the word selection, letter guessing, lives tracking, and game state management.

## Contributions

If you would like to contribute to the Hangman game, feel free to submit a pull request. We welcome any improvements, bug fixes, or new features that can enhance the overall user experience.

## License

This project is licensed under the [MIT License](LICENSE).