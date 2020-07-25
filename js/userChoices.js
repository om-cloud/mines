'use strict'

/////  Give Hint of Cell Neighbours  /////

function giveHint(elButton) {
    gIsHint = true;
    elButton.classList.add('animated-bulb');
}

/////  Managing Exposing And Hiding Neighbours For 1 second  //////

function exposeneighbours(elCell, cellI, cellJ) {
    if (!gGame.isOn) return
    if (!gHintsCounter > 0 || !gIsHint) return
    var reveal = true;
    setTimeout(() => {
        reveal = false;
        toggleNegsContent(elCell, cellI, cellJ, reveal);
        document.querySelector(`.hint${gHintsCounter}`).classList.add('hidden');
        gHintsCounter--;
        gIsHint = false;
    }, 1000)
    toggleNegsContent(elCell, cellI, cellJ, reveal);
}

/////  Rendering Hinted Cell Neighbours  /////

function toggleNegsContent(elCell, cellI, cellJ, reveal) {
    var SIZE = gLevel.SIZE;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= SIZE) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= SIZE) continue
            var cell = gBoard[i][j]
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            toggleCellContent(cell, elCell, reveal);
        }
    }

}

/////  Expose Cell Content  /////

function toggleCellContent(cell, elCell, reveal) {
    if (reveal) {
        elCell.style.backgroundColor = 'rgb(101, 137, 172)'
        if (cell.isMine && !cell.isShown) {
            renderCell(elCell, MINE)
        } else if (!cell.isMine && cell.minesAroundCount > 0 && !cell.isShown) {
            renderCell(elCell, cell.minesAroundCount)
        }
    } else {
        if (!cell.isShown) {
            renderCell(elCell, EMPTY);
            elCell.style.backgroundColor = '#fd8910'
        }
    }
}

/////  Safe click  The user has 3 Safe-Clicks  /////
/////  Clicking the Safe-Click button will mark a random covered cell  /////
/////  (for a few seconds) that is safe to click (does not contain a MINE).  /////
/////  Present the remaining Safe-Clicks count  /////

function checkSafeClick() {
    if (!gGame.isOn) return
    if (!gSafeClicksCounter > 0) return
    var SIZE = gBoard.length
    var unShownPositions = [];
    for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
            if (!gBoard[i][j].isShown && !gBoard[i][j].isMine) {
                unShownPositions.push({
                    i: i,
                    j: j
                })
            }
        }
    }
    var randomNum = getRandomInteger(0, unShownPositions.length);
    var i = unShownPositions[randomNum].i;
    var j = unShownPositions[randomNum].j;
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    var cell = gBoard[i][j];
    var reveal = true;
    setTimeout(() => {
        gSafeClicksCounter--;
        reveal = false;
        toggleCellContent(cell, elCell, reveal);
        document.querySelector('.myButton3').innerText = `${gSafeClicksCounter} Safe Clicks`
    }, 2000)
    toggleCellContent(cell, elCell, reveal);
}

/////  Undo Button  /////
/////  Each click on that button takes the game back by one step.  /////

function undo() {
    if (!gGame.isOn) return

}

/////  Manually positioned mines  /////
/////  Create a “manually create” mode in which user first positions the mines  /////
///// (by clicking cells) and then plays.  /////

function manuallyPositionMines() {

}