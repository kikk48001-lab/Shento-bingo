// 🎯 Mark cell when clicked
document.querySelectorAll("td").forEach(cell => {
    cell.addEventListener("click", function () {
        this.classList.toggle("marked");
        checkWin();
    });
});

// 📡 AUTO FETCH from server (Telegram numbers)
setInterval(async () => {
    try {
        let res = await fetch("/number");
        let data = await res.json();

        if (data.number) {
            document.getElementById("calledNumber").innerText =
                "Called: " + data.number;
        }
    } catch (e) {
        console.log("Fetch error");
    }
}, 3000);

// 🏆 WIN SYSTEM
function checkWin() {
    const cells = document.querySelectorAll("td");

    let grid = [];
    let k = 0;

    for (let i = 0; i < 5; i++) {
        grid[i] = [];
        for (let j = 0; j < 5; j++) {
            grid[i][j] = cells[k].classList.contains("marked");
            k++;
        }
    }

    let winTypes = [];

    // Rows
    for (let i = 0; i < 5; i++) {
        if (grid[i].every(v => v)) winTypes.push("Row");
    }

    // Columns
    for (let j = 0; j < 5; j++) {
        let col = true;
        for (let i = 0; i < 5; i++) {
            if (!grid[i][j]) col = false;
        }
        if (col) winTypes.push("Column");
    }

    // Diagonal 1
    if ([0,1,2,3,4].every(i => grid[i][i])) {
        winTypes.push("Diagonal");
    }

    // Diagonal 2
    if ([0,1,2,3,4].every(i => grid[i][4 - i])) {
        winTypes.push("Diagonal");
    }

    // 4 Corners
    if (grid[0][0] && grid[0][4] && grid[4][0] && grid[4][4]) {
        winTypes.push("4 Corners");
    }

    if (winTypes.length > 0) {
        document.getElementById("result").innerText =
            "BINGO 🎉 → " + winTypes.join(", ");
    } else {
        document.getElementById("result").innerText = "Keep Playing...";
    }
}
