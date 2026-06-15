const boardElement = document.getElementById("board");

let board = ["","","","","","","","",""];

let player = "X";
let computer = "O";
let current = "X";

let gameActive = false;

let scores = {
 x: 0,
 o: 0,
 tie: 0
};

// START GAME
function choose(choice){

 player = choice;
 computer = choice === "X" ? "O" : "X";

 current = "X";
 gameActive = true;

 document.getElementById("startScreen").style.display = "none";
 document.querySelector(".game").style.display = "block";

 drawBoard();

 if(player === "O"){
  setTimeout(computerMove, 800);
 }
}

// DRAW BOARD
function drawBoard(){

 boardElement.innerHTML = "";

 board.forEach((cell, index)=>{

  let div = document.createElement("div");
  div.classList.add("cell");

  if(cell === "X") div.classList.add("xmark");
  if(cell === "O") div.classList.add("omark");

  div.textContent = cell;
  div.onclick = ()=> move(index);

  boardElement.appendChild(div);
 });

 updateScore();
}

// PLAYER MOVE
function move(index){

 if(!gameActive) return;
 if(board[index] !== "") return;

 board[index] = player;

 drawBoard();

 if(checkWin()) return;

 current = computer;

 // ⏱️ FIX: slower AI response (this is what you wanted)
 setTimeout(computerMove, 800);
}

// COMPUTER MOVE
function computerMove(){

 if(!gameActive) return;

 let empty = board
 .map((v,i)=> v==="" ? i : null)
 .filter(v => v !== null);

 if(empty.length === 0) return;

 let move = empty[Math.floor(Math.random() * empty.length)];

 board[move] = computer;

 drawBoard();

 if(checkWin()) return;

 current = player;
}

// CHECK WIN
function checkWin(){

 let wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
 ];

 for(let combo of wins){
  let [a,b,c] = combo;

  if(board[a] && board[a] === board[b] && board[a] === board[c]){

   gameActive = false;

   if(board[a] === "X") scores.x++;
   else scores.o++;

   alert(board[a] + " wins!");

   setTimeout(reset, 400);
   return true;
  }
 }

 if(!board.includes("")){
  gameActive = false;
  scores.tie++;

  alert("Tie!");

  setTimeout(reset, 400);
  return true;
 }

 return false;
}

// RESET
function reset(){

 board = ["","","","","","","","",""];
 current = "X";
 gameActive = true;

 drawBoard();
}

// SCORE UPDATE
function updateScore(){
 document.getElementById("xScore").textContent = scores.x;
 document.getElementById("oScore").textContent = scores.o;
 document.getElementById("tieScore").textContent = scores.tie;
}

// RESTART BUTTON
document.getElementById("restart").onclick = reset;