// DOM Elements
const cells = document.querySelectorAll('.box');
const restartBtn = document.querySelector('.restart');
const statusText = document.querySelector('.status');

// Game State
let gameIsLive = true;
let currentPlayer = 'X';
let boardArray = ['', '', '', '', '', '', '', '', ''];

// Winning Combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6] // Diagonal
];

// Handle Cell Click
function handleCellClick(event) {
    const index = event.target.dataset.index; // Corrected: Get index from data-index attribute

    if (boardArray[index] !== '' || !gameIsLive) return;

    boardArray[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkWinner();
}

// Check Winner
function checkWinner() {
    let roundWon = false;

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;

        if (boardArray[a] && boardArray[a] === boardArray[b] && boardArray[a] === boardArray[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} has won!`;
        gameIsLive = false;
        return;
    }

    if (!boardArray.includes('')) {
        statusText.textContent = "It's a draw!";
        gameIsLive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer} is next`;
}

// Restart Game
function handleRestartGame() {
    boardArray = ['', '', '', '', '', '', '', '', '']; // Reset game board array
    gameIsLive = true;
    currentPlayer = 'X';
    statusText.textContent = `${currentPlayer} is next`;
    
    // Clear UI
    cells.forEach(cell => cell.textContent = '');
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', handleRestartGame);
