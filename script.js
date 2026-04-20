function checkWin() {
    let cells = document.querySelectorAll("td");

    // convert to 2D array
    let grid = [];
    let index = 0;

    for (let i = 0; i < 5; i++) {
        grid[i] = [];
        for (let j = 0; j < 5; j++) {
            grid[i][j] = cells[index].classList.contains("marked");
            index++;
        }
    }

    // ✅ Row check
    for (let i = 0; i < 5; i++) {
        if (grid[i].every(v => v)) {
            return win("Row Bingo 🎉");
        }
    }

    // ✅ Column check
    for (let j = 0; j < 5; j++) {
        let colWin = true;
        for (let i = 0; i < 5; i++) {
            if (!grid[i][j]) colWin = false;
        }
        if (colWin) {
            return win("Column Bingo 🎉");
        }
    }

    // ✅ Diagonal (top-left → bottom-right)
    let diag1 = true;
    for (let i = 0; i < 5; i++) {
        if (!grid[i][i]) diag1 = false;
    }
    if (diag1) {
        return win("Diagonal Bingo 🎉");
    }

    // ✅ Diagonal (top-right → bottom-left)
    let diag2 = true;
    for (let i = 0; i < 5; i++) {
        if (!grid[i][4 - i]) diag2 = false;
    }
    if (diag2) {
        return win("Diagonal Bingo 🎉");
    }

    // ✅ 4 Corners
    if (
        grid[0][0] &&
        grid[0][4] &&
        grid[4][0] &&
        grid[4][4]
    ) {
        return win("4 Corners Bingo 🎉");
    }

    document.getElementById("result").innerText = "Keep Playing...";
}

function win(message) {
    document.getElementById("result").innerText = message;
}
