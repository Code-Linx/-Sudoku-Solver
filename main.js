const sudokuBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const sudokuBoardElement = document.getElementById("sudokuBoard");

function solveSudoku() {
  if (solve()) {
    displaySudoku();
  } else {
    alert("No solution exists for this Sudoku.");
  }
}

function solve() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (sudokuBoard[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValidMove(row, col, num)) {
            sudokuBoard[row][col] = num;

            if (solve()) {
              return true;
            }

            sudokuBoard[row][col] = 0;
          }
        }

        return false;
      }
    }
  }

  return true;
}

function isValidMove(row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (sudokuBoard[row][i] === num || sudokuBoard[i][col] === num) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (sudokuBoard[i][j] === num) {
        return false;
      }
    }
  }

  return true;
}

function displaySudoku() {
  sudokuBoardElement.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 9; j++) {
      const cell = document.createElement("td");
      cell.textContent = sudokuBoard[i][j];
      row.appendChild(cell);
    }

    sudokuBoardElement.appendChild(row);
  }
}
