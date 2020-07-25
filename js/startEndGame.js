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
var gExtraNoNegPos = [];
var gFirstI;
var gFirstJ;
var gElCell;
var gIsHint = false;
var gHintsCounter = 3;
var gLivesNumber = 3;
var gSafeClicksCounter = 3;
var gBoardsArray=[];
//var gIsManualPositionedMines = false;


/////  This is an object by which the board size is set /////

var gLevel = {
    SIZE: 4,
    MINES: 2
};


/////  This is an object in which you can keep and update the current game  /////
/////  state: isOn: Boolean, when true we let the user play shownCount:  /////
/////  How many cells are shown markedCount: How many cells are marked (with a flag)  /////
/////  secsPassed: How many seconds passed  /////

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};


//////////////////////////////  Main Functions  ////////////////////////////////

/////  This is called when page loads  /////

function initGame() {
    gBoard = buildBoard();
    spreadMines();
    iterateBoardToCountNegMines();
    renderBoard(gBoard);
    gBoardsArray.push(copyArrayToDifferentAddress());
    document.querySelector('.myButton3').innerText = 'Put Mines'
}


/////  Start New Game  /////

function startNewGame() {
    stoptimer();
    reAssignGlobalVariables();
    document.querySelector(".messageToUser").innerText = 'Find The Mines '
    document.querySelector(".smiley").innerText = '😃'
    document.querySelector('.life').innerText='Lives : 3'
    for(var i=0;i<3;i++){
        document.querySelector(`.hint${i+1}`).classList.remove('hidden');
        document.querySelector(`.hint${i+1}`).classList.remove('animated-bulb');
    }
    operateTimer();
    initGame();
    document.querySelector('.myButton3').innerText = '3 Safe Clicks'
}

/////  reAssign Global Variables  /////

function reAssignGlobalVariables() {
    gTime = 0;
    gCounter = 1;
    gGame.secsPassed=0;
    gGame.isOn = true;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gIsHint = false;
    gHintsCounter = 3;
    gLivesNumber = 3;
    gSafeClicksCounter = 3;
    gBoardsArray=[];
    //gIsManualPositionedMines = false;
}

/////  Game ends when all mines are marked, and all the other cells are shown   /////

function checkGameWon() {
    var cellsNum = gLevel.SIZE * gLevel.SIZE;
    if (((gGame.shownCount + gGame.markedCount  === cellsNum)) &&
        (gGame.markedCount === gLevel.MINES - (3 - gLivesNumber))) {
        document.querySelector(".messageToUser").innerText = 'You Won '
        document.querySelector(".smiley").innerText = '😁'
        playWinningAudio();
        showBestScores();
        endGame();
        return true
    }
}


/////  End Game  /////

function endGame() {
    gGame.isOn = false;
    stoptimer();
    document.querySelector('.myButton3').innerText = 'Put Mines'
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