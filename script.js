let board = [];
let called = [];

function login() {
    let name = document.getElementById("name").value;
    document.getElementById("welcome").innerText = "Welcome " + name;

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("game").style.display = "block";

    generateBoard();
}

function generateBoard() {
    let table = document.getElementById("board");
    table.innerHTML = "";

    let numbers = [];

    while (numbers.length < 25) {
        let n = Math.floor(Math.random() * 75) + 1;
        if (!numbers.includes(n)) numbers.push(n);
    }

    for (let i = 0; i < 5; i++) {
        let row = "<tr>";
        for (let j = 0; j < 5; j++) {
            let num = numbers[i * 5 + j];
            row += `<td onclick="mark(this, ${num})">${num}</td>`;
        }
        row += "</tr>";
        table.innerHTML += row;
    }
}

function drawNumber() {
    let n;
    do {
        n = Math.floor(Math.random() * 75) + 1;
    } while (called.includes(n));

    called.push(n);
    document.getElementById("number").innerText = "Number: " + n;
}

function mark(cell, num) {
    if (called.includes(num)) {
        cell.classList.toggle("marked");
    }
}

function checkWin() {
    let cells = document.querySelectorAll("td");

    let count = 0;
    cells.forEach(c => {
        if (c.classList.contains("marked")) count++;
    });

    if (count >= 5) {
        document.getElementById("result").innerText = "🎉 BINGO!";
    } else {
        document.getElementById("result").innerText = "Keep Playing...";
    }
}
