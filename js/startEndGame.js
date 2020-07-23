'use strict'

///////////////////////////  Global Variables  ///////////////////////

/////  Game Icons  /////

const MINE = '💣';
const FLAG = '🚩';
const EMPTY = ' ';

var gBoard;
var gCounter = 1;
var gGridLength = 4;
var gPreviousPushedButton = null;
var gTime = 0;
var gFlagCounter=0;
var gCounterXXXX=0;
var gExtraNoNegPos=[];


/////  This is an object by which the board size is set /////

var gLevel = 
{ 
    SIZE: 4, 
    MINES: 2 
};


/////  This is an object in which you can keep and update the current game  /////
/////  state: isOn: Boolean, when true we let the user play shownCount:  /////
/////  How many cells are shown markedCount: How many cells are marked (with a flag)  /////
/////  secsPassed: How many seconds passed  /////

var gGame = 
{ 
    isOn: false, 
    shownCount: 0, 
    markedCount: 0, 
    secsPassed: 0 
};


//////////////////////////////  Main Functions  ////////////////////////////////

/////  This is called when page loads  /////

function initGame() {
gBoard=buildBoard();
spreadMines();
iterateBoardToCountNegMines();
renderBoard(gBoard);
createRandomMinesIndexesArrray()
}


/////  Start New Game  /////

function startNewGame() {
    stoptimer();
    reAssignGlobalVariables();
    document.querySelector(".messageToUser").innerText = 'Find The Mines 😃'
    operateTimer();
    initGame();
}

/////  reAssign Global Variables  /////

function reAssignGlobalVariables() {

    gTime = 0;
    gCounter = 1;
    gGame.isOn = true;
    gGame.shownCount = 0;
    gGame.markedCount = 0;

    
}

/////  Game ends when all mines are marked, and all the other cells are shown   /////

function checkGameWon() {

    if(gGame.shownCount + gGame.markedCount === gLevel.SIZE*gLevel.SIZE)
    {
   document.querySelector(".messageToUser").innerText = 'You Won 😁'
   gGame.isOn = false;
   stoptimer();
   return true
   }
}

/////  End Game  /////

function endGame(){
    gGame.isOn = false;
    stoptimer();
}


/////   Expose All Mines  /////

function exposeMines() {
    var SIZE = gLevel.SIZE;
    for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
            if (gBoard[i][j].isMine) {
                gBoard[i][j].isShown = true;
                var elcell = document.querySelector(`.cell-${i}-${j}`);
                renderCell(elcell, MINE)
            }
        }
    }

}


