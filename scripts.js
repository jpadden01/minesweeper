const BOARD_WIDTH = 16;
const BOARD_HEIGHT = 16;
const NUMBER_OF_MINES = 40;

const board = makeBoard();

function makeBoard() {
    const board = [];

    for (let i = 0; i < BOARD_HEIGHT; i++) {
        const row = [];
        row.length = BOARD_WIDTH;
        row.fill(0);
        board.push(row);
    }

    for (let i = 0; i < NUMBER_OF_MINES; i++) {
        let x = Math.floor(Math.random() * BOARD_WIDTH);
        let y = Math.floor(Math.random() * BOARD_HEIGHT);
        while (board[y][x] === -1) {
            x = Math.floor(Math.random() * BOARD_WIDTH);
            y = Math.floor(Math.random() * BOARD_HEIGHT);
        }
        board[y][x] = -1;
    }

    for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
            if (board[y][x] === -1) continue;
            if (board[y][x - 1] === -1) board[y][x] += 1;
            if (board[y][x + 1] === -1) board[y][x] += 1;
            if (y > 0) {
                if (board[y - 1][x - 1] === -1) board[y][x] += 1;
                if (board[y - 1][x] === -1) board[y][x] += 1;
                if (board[y - 1][x + 1] === -1) board[y][x] += 1;
            }
            if (y < BOARD_HEIGHT - 1) {
                if (board[y + 1][x - 1] === -1) board[y][x] += 1;
                if (board[y + 1][x] === -1) board[y][x] += 1;
                if (board[y + 1][x + 1] === -1) board[y][x] += 1;
            }
        }
    }

    return board;
}

function drawBoard() {
    const boardElement = document.querySelector(".board");
    for (const row of board) {
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");
        for (const tile of row) {
            const tileElement = document.createElement("button");
            tileElement.classList.add("tile")
            if (tile === -1) {
                tileElement.classList.add("mine");
            } else {
                tileElement.classList.add(`${tile}`);
            }
            rowElement.appendChild(tileElement);
        }
        boardElement.appendChild(rowElement);
    }
}

drawBoard();