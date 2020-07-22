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
    document.querySelector(".messageToUser").innerText = 'Find The Mines !'
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


/////  End Game  /////

function endGame(){
    gGame.isOn = false;
    stoptimer();
}