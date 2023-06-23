const GameBoard = () => {
  let board = new Array(9).fill(null);

  const render = () => {
    emptyBoard();
    let container = document.getElementById("gameContainer");
    board.forEach((element) => {
      let div = document.createElement("div");
      div.setAttribute("class", "card");
      div.innerHTML = element;
      container.appendChild(div);
    });
  };

  function emptyBoard(){
    board = [];
    board = new Array(9).fill(null);
    let container = document.getElementById("gameContainer");
    container.innerHTML = "";
  };

  function showboard() {
    console.log("board is ", board);
  }

  return {
    render,
    board,
    showboard,
  };
};



const Player = (name, mark) => {
  let status = false;
  function annouceWinner() {
    return `The Winner Is ${mark}`;
  }

  function setWinner() {
    status = true;
    alert(annouceWinner());
  }

  function winnerState(){
    if(status){
      return true;
    }
    return false;
  }

  return { name, mark, status, annouceWinner, setWinner, winnerState };
};




const Game = () => {
  let win = false;
  let gameboard;
  let board;
  
  let players = [Player("one", "x"), Player("two", "o")];

  let winingAxes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 5, 7],
  ];

  function BoardInput(){
    let boards = document.querySelectorAll(".card");
    boards.forEach((item, index) => {
      item.addEventListener("click", () => PlayerInput(item, index));
    });
  };

  function initGame(){
    win = false;
    gameboard = null;
    board = null;
  }

  const startGame = () =>{
    initGame();
    gameboard = GameBoard();
    gameboard.render();
    board = gameboard.board;
    BoardInput();
  }

  

  function boardUpdate(box,index){
    if(board[index] === null){
      box.innerHTML = players[0].mark;
      board[index] = players[0].mark;
      return true;
    }
    return false
  }

  function PlayerInput(box, index) {
    if(!win){
      if(boardUpdate(box,index)){
        checkWinner();
        swapPlayer();

      }
    }
    
  }

  function swapPlayer() {
    let temp = players[0];
    players[0] = players[1];
    players[1] = temp;
  }

  function checkWinner() { 
    if(!areAllNull(board)){
      winingAxes.forEach((array) => {
        if (array.every((item) => board[item] === players[0].mark)) {
          players[0].setWinner();
          win = true;
          
        }
      });
    }
    else{
      alert("Its a Tie");
    }
    
  }

  function areAllNull(board){
    return board.every(function(element){
      return element != null;
    })
  }

  return{
    startGame
    }

};


function gameStart(){
  let game = Game();
  game.startGame();
}


let restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click",gameStart);
gameStart();