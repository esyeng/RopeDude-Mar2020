// What is ASCIIART? Check the README.md or Workshop to see why ASCIIART is defined in your file.
const ASCIIART = [
  `
  +---+
  |   |
  O   |
 /|\\\  |
 / \\\  |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\\  |
 /    |
      |
      
=========`,
  `
  +---+
  |   |
  O   |
 /|\\\  |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
  `
  +---+
  |   |
      |
      |
      |
      |
=========`,
];




class RopeDude {
  constructor(string) {
    this.secretWord = string.split('');
    this.remainingGuesses = 6;
    this.lettersGuessed = [];
    this.gameState = 'playing';
   
  }

  submitGuess(char) {
    let charL = char.toLowerCase();
    if (this.gameState === 'playing') {
      if (!this.lettersGuessed.includes(charL) && !this.secretWord.includes(charL)) {
        this.remainingGuesses--;
        this.lettersGuessed.push(charL);
      } else if (!this.lettersGuessed.includes(charL) && this.secretWord.includes(charL)) {
        this.lettersGuessed.push(charL);
        return true;
      } 
      if (this.secretWord.includes(charL)) {
        return true;
      }
    }
  }

  computeGameState() {
    if (this.remainingGuesses === 0) {
      this.gameState = 'lost';
    } else if (this.remainingGuesses > 0 && (this.getSecretWordPuzzle() === this.secretWord.join(''))) {
      this.gameState = 'won';
    }
  }

  getSecretWordPuzzle() {
   let words = [];
   let word = '';
   let secret = '';
   let bank = this.lettersGuessed;

    for (let i = 0; i < this.secretWord.length; i++) {
      let char = this.secretWord[i];
      if (char !== ' ') {
        word += char;
      } else {
        word += ' ';
      }

    }
    words.push(word);

    for (let j = 0; j < words.length; j++) {
      let wrd = words[j];
      for (let k = 0; k < wrd.length; k++) {
        let hash = '#';
        if (bank.includes(wrd[k])) {
        secret += wrd[k];
        } else if (wrd[k] !== ' ') {
        secret += hash;
        } else {
        secret += ' ';
        }
      }
    }
    return secret;
  }

  getGameStateMessage() {
    if (this.gameState === 'playing') {
      return `There is a total of ${this.remainingGuesses} guesses remaining:
${ASCIIART[this.remainingGuesses]}`;
    } else if (this.gameState === 'lost') {
      return `Game Over, the word was "${this.secretWord.join('')}":
${ASCIIART[0]}`;
    } else {
      return `Winner Winner Chicken Dinner, you won!`;
    }
  }
}


function getRandomString(length) {
  let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
   for ( var i = 0; i < length; i++ ) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

function simulateRopeDude(word) {
  let game = new RopeDude(word) 

  for(let i = 0; i < game.remainingGuesses; i++) {
    game.submitGuess(getRandomString(1));
    game.computeGameState();
  }

  return game.gameState
}

function generateGame(word) {
  let game = new RopeDude(word);
  return game;
}