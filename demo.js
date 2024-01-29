const tiles = Array.prototype.slice.call(document.querySelectorAll(".tile"));
const textOutput = document.getElementById("placeholdertext");
const player1scoreOutput =  document.getElementById("player1score");
const player2scoreOutput =  document.getElementById("player2score");
const drawOutput =  document.getElementById("draws");


const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
] 

let player1score = 0;
let player2score = 0;
let draws = 0;
let turn = 0;
let turnCount = 0;
let player1list = [];
let player2list = [];
let playing = true;

getCookie();
updateScores();
startGame();

function startGame() {
    turn = 0;
    turnCount = 0;
    playing = true;
    while (player1list.length > 0) player1list.pop();
    while (player2list.length > 0) player2list.pop();
    textOutput.innerHTML = "player 1 turn";
    textOutput.style = "background-color:green";
	tiles.forEach(tile => {
		tile.removeEventListener('click', sendInputTile)
		tile.addEventListener('click', sendInputTile, { once: true })
        tile.style = "background-color:gray";
	})
}

function sendInputTile(e) {
    if (playing){
        const tile = e.target;
        let position = tiles.indexOf(tile);
        if (turn == 0){
            tile.style = "background-color:green";
            turn = 1;
            player1list.push(position);
            if (checkWin(player1list)){
                ++player1score;
                updateScores();
                textOutput.innerHTML = "player 1 wins";
                playing = false;
            }
            else {
                textOutput.innerHTML = "player 2 turn";
                textOutput.style = "background-color:red";
            }
        }
        else {
            tile.style = "background-color:red";
            turn = 0;
            player2list.push(position);
            if (checkWin(player2list)){
                ++player2score;
                updateScores();
                textOutput.innerHTML = "player 2 wins";
                playing = false;
            }
            else {
                textOutput.innerHTML = "player 1 turn";
                textOutput.style = "background-color:green";
            }
        }
        ++turnCount;
        if ((turnCount == 9) & playing){
            ++draws;
            updateScores();
            textOutput.innerHTML = "draw";
            textOutput.style = "background-color:white";
        }
    }
}

function checkWin(playerlist){
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++){
        let combination = WINNING_COMBINATIONS[i];
        let playerwins = true;
        for (let j = 0; j < combination.length; j++){
            let element = combination[j];
            if (!playerlist.includes(element)){
                playerwins = false;
            }
        }
        if (playerwins) return true;
    }
    return false;
}

function updateScores(){
    saveCookie();
    player1scoreOutput.innerHTML = "Player 1 score: " + player1score.toString();
    player2scoreOutput.innerHTML = "Player 2 score: " + player2score.toString();
    drawOutput.innerHTML = "Draws: " + draws.toString();
}

function saveCookie(){
    document.cookie = player1score + ";" + player2score + ";" + draws;
    console.log(document.cookie.toString());
}

function getCookie(){
    console.log(document.cookie);
    let saveData = document.cookie.split(";");
    if (saveData.length==3){
        player1score = parseInt(saveData[0]);
        player2score = parseInt(saveData[1]);
        draws = parseInt(saveData[2]);
    }
}