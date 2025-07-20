const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function handleCellClick(index) {
  if (!gameActive || boardState[index] !== '') return;

  const cell = document.getElementById(`cell-${index}`);
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWinner()) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!boardState.includes('')) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      document.getElementById(`cell-${a}`).classList.add('winning-cell');
      document.getElementById(`cell-${b}`).classList.add('winning-cell');
      document.getElementById(`cell-${c}`).classList.add('winning-cell');
      return true;
    }
  }
  return false;
}

function restartGame() {
  board.innerHTML = '';
  boardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.id = `cell-${i}`;
    cell.className = 'cell';
    cell.addEventListener('click', () => handleCellClick(i));
    board.appendChild(cell);
  }
}

createBoard();
