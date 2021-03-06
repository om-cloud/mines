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
var gBoardsArray = [];
var gShownCountsArray = [];
var gMarkedCountArray = [];
var gLivesArray = [];
var gSafeClicksArray = [];
var gHintsCounterArray = [];
var gIsManualPositionedMines = false;
var isManualGame = false;
var gManualGameMinesNumber = 0;
var gElButton =null;



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
    updateGlobalArraysForUndoing()
    document.querySelector('.myButton3').innerText = 'Hide Mines'
   
}

/////  Start New Game  /////

function startNewGame() {
    startCommonFunctionsGame();
    if (!gIsManualPositionedMines) {
        initGame();
        document.querySelector('.myButton3').innerText = '3 Safe Clicks';
        gIsManualPositionedMines = false;
        isManualGame = false;
    } else {
        startNewManualGame();
    }
}

/////  Start Common functions for Manual and random Game  /////

function startCommonFunctionsGame() {
    stoptimer();
    reAssignGlobalVariables();
    document.querySelector(".messageToUser").innerText = 'Find The Mines '
    document.querySelector(".smiley").innerText = '😃'
    document.querySelector('.life').innerText = 'Lives : 3'
    document.querySelector('.undo').innerText = 'Undo';
    for (var i = 0; i < 3; i++) {
        document.querySelector(`.hint${i+1}`).classList.remove('hidden');
        document.querySelector(`.hint${i+1}`).classList.remove('animated-bulb');
    }
    operateTimer();
}

/////  Start New Manual Game  /////

function startNewManualGame() {
    iterateBoardToCountNegMines();
    gBoardsArray.push(copyArrayToDifferentAddress());
    updateGlobalArraysForUndoing()
    document.querySelector('.myButton3').innerText = '3 Safe Clicks';
    document.querySelector('.myButton3').classList.remove('pushedButton');
    gIsManualPositionedMines = false;
    isManualGame = true;
    var SIZE = gBoard.length;
    for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
            var elCell = document.querySelector(`.cell-${i}-${j}`);
            renderCell(elCell, EMPTY)
        }
    }
}

/////  reAssign Global Variables  /////

function reAssignGlobalVariables() {
    gTime = 0;
    gCounter = 1;
    gGame.secsPassed = 0;
    gGame.isOn = true;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gIsHint = false;
    gHintsCounter = 3;
    gLivesNumber = 3;
    gSafeClicksCounter = 3;
    gBoardsArray = [];
    gShownCountsArray = [];
    gMarkedCountArray = [];
    gLivesArray = [];
    gSafeClicksArray = [];
    gElButton =null;
}

/////  Game ends when all mines are marked, and all the other cells are shown   /////

function checkGameWon() {
    var minesNumber = isManualGame ? gManualGameMinesNumber : gLevel.MINES;
    var cellsNum = gLevel.SIZE * gLevel.SIZE;
    if (((gGame.shownCount + gGame.markedCount === cellsNum)) &&
        (gGame.markedCount === minesNumber - (3 - gLivesNumber))) {
        document.querySelector(".messageToUser").innerText = 'You Won !'
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
    document.querySelector('.myButton3').innerText = 'Hide Mines'
    document.querySelector('.undo').innerText = 'SignUp';
    gManualGameMinesNumber = 0;
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