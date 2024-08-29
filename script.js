// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('reset');
    const overlay = document.getElementById('overlay');
    const overlayMessage = document.getElementById('overlay-message');
    const newGameBtn = document.getElementById('new-game');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(event) {
        const index = event.target.dataset.index;
        if (board[index] !== '' || !gameActive) return;

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWin()) {
            overlayMessage.textContent = `Player ${currentPlayer} wins!`;
            overlay.style.display = 'flex';
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            overlayMessage.textContent = 'It\'s a draw!';
            overlay.style.display = 'flex';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWin() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
        overlay.style.display = 'none';
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetBtn.addEventListener('click', resetGame);
    newGameBtn.addEventListener('click', resetGame);
});

