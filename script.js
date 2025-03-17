
const boxes = document.querySelectorAll('.box');
const status = document.querySelector('.status');
const restartButton = document.querySelector('.restart');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);

const checkWinner = () => {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return gameBoard[a];
    }
  }
  return gameBoard.includes(null) ? null : 'Draw';
};

const handleClick = (e) => {
  const index = e.target.dataset.index;
  if (!gameBoard[index]) {
    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('taken');
    const winner = checkWinner();
    if (winner) {
      status.textContent = winner === 'Draw' ? "It's a draw!" : `${winner} wins!`;
      boxes.forEach(box => box.classList.add('taken'));
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'}'s turn`;
    }
  }
};

const restartGame = () => {
  gameBoard.fill(null);
  currentPlayer = 'X';
  status.textContent = "Player 1's turn";
  boxes.forEach(box => {
    box.textContent = '';
    box.classList.remove('taken');
  });
};

boxes.forEach(box => box.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
