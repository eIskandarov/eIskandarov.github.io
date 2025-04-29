class Game {
  selectors = {
    totalScore: '.score',
    currentScore: '.current-score',
    scoreId: 'score--',
    currentScoreId: 'current--',
    player: '.player',
    dice: '.dice',
    diceImage: '[data-img]',
    newGameButton: '.btn--new',
    rollDiceButton: '.btn--roll',
    holdButton: '.btn--hold',
    overlayWinner: '.overlay-winner',
    overlayNewGame: '.overlay-winner__new-game',
    overlayMessage: '.overlay-winner__message',
  };

  stateClasses = {
    playerActive: 'player--active',
    visuallyHidden: 'visually-hidden',
  };

  players = {
    currentPlayer: 0,
    0: {
      class: '.player--0',
      totalScore: 0,
      currentScore: 0,
    },

    1: {
      class: '.player--1',
      totalScore: 0,
      currentScore: 0,
    },
  };

  dice = {
    diceMin: 1,
    diceMax: 6,
    currentDiceIndex: 0,
    loseDiceIndex: 0,
    winnerScore: 100,
  };

  updatePlayerUI(playerIndex) {
    this.playerSection = document.querySelector(
      this.players[playerIndex].class
    );

    this.playerTotalScore = this.playerSection.querySelector(
      this.selectors.totalScore
    );
    this.playerCurrentScore = this.playerSection.querySelector(
      this.selectors.currentScore
    );

    this.playerTotalScore.textContent = this.players[playerIndex].totalScore;
    this.playerCurrentScore.textContent =
      this.players[playerIndex].currentScore;
  }

  toggleDiceImage(index, flag) {
    this.diceImages[index].classList.toggle(
      this.stateClasses.visuallyHidden,
      !flag
    );
  }

  toggleWinnerOverlay(flag = false) {
    this.overlayMessage.textContent = `Player ${this.players.currentPlayer + 1} won with the score: ${this.players[this.players.currentPlayer].totalScore}`;
    this.overlayWinner.classList.toggle(
      this.stateClasses.visuallyHidden,
      !flag
    );
    this.overlayNewGame.focus();
  }

  toggleActivePlayerSection(playerIndex, flag) {
    document
      .querySelector(this.players[playerIndex].class)
      .classList.toggle(this.stateClasses.playerActive, flag);
  }

  changeActivePlayer(switchToPlayerIndex) {
    this.toggleActivePlayerSection(this.players.currentPlayer, false);
    this.players.currentPlayer = switchToPlayerIndex;
    this.toggleActivePlayerSection(switchToPlayerIndex, true);
    this.rollDiceButton.focus();
  }

  getNextPlayerIndex() {
    let playerIndex = this.players.currentPlayer;
    if (--playerIndex < 0) {
      playerIndex = 1;
    }
    return playerIndex;
  }

  increasePlayerCurrentScore(increment) {
    const playerIndex = this.players.currentPlayer;
    this.players[playerIndex].currentScore += increment;
  }

  transferCurrentScoreToTotal() {
    const playerIndex = this.players.currentPlayer;
    this.players[playerIndex].totalScore +=
      this.players[playerIndex].currentScore;
  }

  clearPlayerCurrentScore() {
    const playerIndex = this.players.currentPlayer;
    this.players[playerIndex].currentScore = 0;
  }

  resetPlayerScores(playerIndex) {
    this.players[playerIndex].totalScore = 0;
    this.players[playerIndex].currentScore = 0;
  }

  isCurrentPlayerWinner() {
    const playerIndex = this.players.currentPlayer;
    return this.players[playerIndex].totalScore >= this.dice.winnerScore;
  }

  updateUI() {
    this.updatePlayerUI(0);
    this.updatePlayerUI(1);
    this.updateDiceImage();
  }

  resetGame = () => {
    this.toggleWinnerOverlay(false);
    this.changeActivePlayer(0);
    this.resetPlayerScores(0);
    this.resetPlayerScores(1);
    this.dice.currentDiceIndex = 0;
    this.updateUI();
  };

  rollDiceIndex() {
    return Math.trunc(Math.random() * this.dice.diceMax);
  }

  updateDiceImage() {
    this.diceImages.forEach((_, index) => {
      if (index === this.dice.currentDiceIndex) {
        this.toggleDiceImage(index, true);
      } else {
        this.toggleDiceImage(index, false);
      }
    });
  }

  onRollDiceClick = () => {
    this.dice.currentDiceIndex = this.rollDiceIndex();
    this.updateDiceImage();

    if (this.dice.currentDiceIndex === this.dice.loseDiceIndex) {
      this.clearPlayerCurrentScore();
      this.changeActivePlayer(this.getNextPlayerIndex());
    } else {
      this.increasePlayerCurrentScore(this.dice.currentDiceIndex + 1);
    }

    this.updateUI();
  };

  onHoldButtonClick = () => {
    this.transferCurrentScoreToTotal();

    if (this.isCurrentPlayerWinner()) {
      this.toggleWinnerOverlay(true);
    } else {
      this.clearPlayerCurrentScore();
      this.changeActivePlayer(this.getNextPlayerIndex());
    }

    this.updateUI();
  };

  bindEvents() {
    this.newGameButton.addEventListener('click', this.resetGame);
    this.overlayNewGame.addEventListener('click', this.resetGame);
    this.rollDiceButton.addEventListener('click', this.onRollDiceClick);
    this.holdButton.addEventListener('click', this.onHoldButtonClick);
  }

  constructor() {
    this.playerSectionOne = document.querySelector(
      this.selectors.playerSectionOne
    );

    this.playerSectionTwo = document.querySelector(
      this.selectors.playerSectionTwo
    );

    this.diceImages = document.querySelectorAll(this.selectors.diceImage);
    this.newGameButton = document.querySelector(this.selectors.newGameButton);
    this.rollDiceButton = document.querySelector(this.selectors.rollDiceButton);
    this.holdButton = document.querySelector(this.selectors.holdButton);
    this.overlayWinner = document.querySelector(this.selectors.overlayWinner);
    this.overlayMessage = document.querySelector(this.selectors.overlayMessage);
    this.overlayNewGame = document.querySelector(this.selectors.overlayNewGame);

    this.resetGame();
    this.bindEvents();
  }
}

new Game();
