const boardElement=document.getElementById("board");

const turnText=document.getElementById("turn");

let board=[
"","","",
"","","",
"","",""
];


let current="X";


let scores={
x:14,
o:11,
tie:32
};



function drawBoard(){

boardElement.innerHTML="";

board.forEach((cell,index)=>{

let div=document.createElement("div");

div.classList.add("cell");


if(cell==="X")
div.classList.add("xmark");


if(cell==="O")
div.classList.add("omark");


div.textContent=cell;


div.onclick=()=>move(index);


boardElement.appendChild(div);


});


turnText.textContent=current+" TURN";

save();

}



function move(index){

if(board[index]!="") return;


board[index]=current;


if(checkWinner()) return;


current=current==="X"?"O":"X";


if(current==="O"){

setTimeout(computerMove,500);

}


drawBoard();

}




function computerMove(){

let best=minimax(board,"O").index;


board[best]="O";


if(checkWinner()) return;


current="X";


drawBoard();

}




function checkWinner(){

let wins=[

[0,1,2],
[3,4,5],
[6,7,8],

[0,3,6],
[1,4,7],
[2,5,8],

[0,4,8],
[2,4,6]

];


for(let combo of wins){

let [a,b,c]=combo;


if(board[a] &&
board[a]===board[b] &&
board[a]===board[c]){


if(board[a]=="X")
scores.x++;

else
scores.o++;


updateScore();


alert(board[a]+" wins");


reset();


return true;

}


}


if(!board.includes("")){

scores.tie++;

updateScore();

alert("Tie");

reset();

return true;

}


return false;

}



function minimax(newBoard,player){


let empty=newBoard
.map((v,i)=>v==""?i:null)
.filter(v=>v!==null);



if(winner(newBoard,"O"))
return {score:10};


if(winner(newBoard,"X"))
return {score:-10};


if(empty.length===0)
return {score:0};



let moves=[];


for(let i of empty){

let move={};

move.index=i;

newBoard[i]=player;


let result=minimax(
newBoard,
player==="O"?"X":"O"
);


move.score=result.score;


newBoard[i]="";


moves.push(move);

}



let best;


if(player==="O"){

let max=-999;

moves.forEach(m=>{

if(m.score>max){

max=m.score;
best=m;

}

});

}

else{

let min=999;


moves.forEach(m=>{

if(m.score<min){

min=m.score;
best=m;

}

});


}


return best;

}




function winner(b,p){

return (

(b[0]==p&&b[1]==p&&b[2]==p)||

(b[3]==p&&b[4]==p&&b[5]==p)||

(b[6]==p&&b[7]==p&&b[8]==p)||

(b[0]==p&&b[3]==p&&b[6]==p)||

(b[1]==p&&b[4]==p&&b[7]==p)||

(b[2]==p&&b[5]==p&&b[8]==p)||

(b[0]==p&&b[4]==p&&b[8]==p)||

(b[2]==p&&b[4]==p&&b[6]==p)

);

}




function reset(){

board=[
"","","",
"","","",
"","",""
];

current="X";

drawBoard();

}




function updateScore(){

xScore.textContent=scores.x;
oScore.textContent=scores.o;
tieScore.textContent=scores.tie;

}




function save(){

localStorage.setItem(
"game",
JSON.stringify(board)
);

}



document.getElementById("restart")
.onclick=reset;



let saved=localStorage.getItem("game");


if(saved)
board=JSON.parse(saved);


drawBoard();

updateScore();