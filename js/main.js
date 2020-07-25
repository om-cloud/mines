'use strict'

/////  Builds the board Set mines at random locations Call setMinesNegsCount()  /////
/////  Return the created board /////

function buildBoard() {
    var CELL = {
        minesAroundCount: 0,
        isShown: true,
        isMine: false,
        isMarked: false
    }
    var SIZE = gLevel.SIZE;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            var CELL = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = CELL;
        }
    }
    return board;
}

/////    Spread Random Mines  //////////

function spreadMines() {
    // if(gIsManualPositionedMines) {
    //     return
    // }
    var randomIndexesArray = createRandomMinesIndexesArrray();
    var SIZE = gLevel.SIZE;
    var counter = 0;
    for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
            if (randomIndexesArray.length !== 0 && counter === randomIndexesArray[0]) {
                gBoard[i][j].isMine = true;
                randomIndexesArray.splice(0, 1);
            }
            counter++
        }
    }
}

///// Iterate Board To Update Negs-Mines /////

function iterateBoardToCountNegMines() {
    var SIZE = gLevel.SIZE;
    for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
            gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j);
        }
    }
}

/////  Count mines around each cell and set the cell's minesAroundCount.   /////

function setMinesNegsCount(board, cellI, cellJ) {
    var SIZE = gLevel.SIZE;
    var counterNegsMines = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= SIZE) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= SIZE) continue
            if (board[i][j].isMine === true && !(i === cellI && j === cellJ))
                counterNegsMines++;
        }
    }
    return counterNegsMines;
}

/////  Render the board as a <table> to the page  ///// 

function renderBoard(board) {
    var SIZE = gLevel.SIZE;
    var max = SIZE * SIZE;
    //var numbersArray = createRandomOrderNumbersArray(1, max);
    var counter = 0;
    var className = '';
    var htmlStr = '';
    for (var i = 0; i < SIZE; i++) {
        htmlStr += `<tr>`;

        for (var j = 0; j < SIZE; j++) {
            var className = '';
            //var item = numbersArray[counter]
            className += `cell-${i}-${j} hoverOverCell ${addClassesAtChangeLevel(SIZE)}`;
            var elCell = board[i][j];
            //  if (!elCell.isMarked && elCell.isShown && elCell.isMine) {
            //     var domIcon = MINE
            // } if (elCell.isMarked) {
            //     var domIcon = FLAG
            // } else if (!elCell.isMarked && ((!elCell.isMine && elCell.isShown) ||
            //         (elCell.isMine && !elCell.isShown))) {
            //     var domIcon = EMPTY
            // }
            var domIcon = EMPTY
            htmlStr += `<td class="cell ${className}"
           onclick="cellClicked(this, ${i}, ${j});
           exposeneighbours(this, ${i}, ${j});
           putMine(this,${i}, ${j})"
            oncontextmenu="cellMarked(this, ${i},${j})"
               style="backgroundColor :#fd8910" >${domIcon}</td>`;
        }
        htmlStr += `</tr>`;
    }
    var elBoard = document.querySelector('.grid');
    elBoard.innerHTML = htmlStr;
}

/////  Determine Board Size  And Allow Right Best Time Display /////

function addClassesAtChangeLevel(size) {
    var className = ''
    gLevel.SIZE = 8
    if (size === 4) {
        className = ' grid-four '
        gLevel.SIZE = 4;
        gLevel.MINES = 2;
        document.querySelector('.twelve').classList.add('non-display');
        document.querySelector('.eight').classList.add('non-display');
        document.querySelector('.four').classList.remove('non-display');
        if (localStorage.getItem('four') !== null &&
            localStorage.getItem('four') !== undefined) {
            var bestTime = localStorage.getItem('four');
            document.querySelector('.four').innerText = `Best Time : ${bestTime}`;
        }
    } else if (size === 8) {
        //debugger
        className = ' grid-eight '
        gLevel.SIZE = 8;
        gLevel.MINES = 12;
        document.querySelector('.twelve').classList.add('non-display');
        document.querySelector('.four').classList.add('non-display');
        document.querySelector('.eight').classList.remove('non-display');
        if (localStorage.getItem('eight') !== null &&
            localStorage.getItem('eight') !== undefined) {
            var bestTime = localStorage.getItem('eight');
            document.querySelector('.eight').innerText = `Best Time : ${bestTime}`;
        } else {
            document.querySelector('.eight').innerText = `Best Time : `;
        }
    } else if (size === 12) {
        className = ' grid-twelve '
        gLevel.SIZE = 12;
        gLevel.MINES = 30;
        document.querySelector('.eight').classList.add('non-display');
        document.querySelector('.four').classList.add('non-display');
        document.querySelector('.twelve').classList.remove('non-display');
        if (localStorage.getItem('twelve') !== null &&
            localStorage.getItem('twelve') !== undefined) {
            var bestTime = localStorage.getItem('twelve');
            document.querySelector('.twelve').innerText = `Best Time : ${bestTime}`;
        } else {
            document.querySelector('.twelve').innerText = `Best Time : `;
        }
    }
    return className
}

////  Called when a cell (td) is clicked ////

function cellClicked(elCell, i, j) {
    if (gIsHint) return
    if (!gGame.isOn) return
    if (!isManualGame) {
        if (gGame.shownCount === 0 && gBoard[i][j].isMine) { // make sure not to hit a mine at first click
            gFirstI = i; // to change to more efficient operation later !
            gFirstJ = j;
            gGame.isOn = false;
            reAssignGlobalVariables();
            initGame();
            var newElCell = document.querySelector(`.cell-${gFirstI}-${gFirstJ}`);
            cellClicked(newElCell, gFirstI, gFirstJ)
        }
    }
    var cell = gBoard[i][j];
    if (!cell.isMarked && gGame.isOn && !cell.isShown) {
        playClickingAudio();
        if (!cell.isMine && cell.minesAroundCount > 0) {
            cell.isShown = true;
            gGame.shownCount++;
            elCell.style.backgroundColor = 'rgb(101, 137, 172)'
            renderCell(elCell, cell.minesAroundCount)
        } else if (!cell.isMine && cell.minesAroundCount === 0) {
            expandShown(gBoard, i, j);
        } else if (gLivesNumber === 2 || gLivesNumber === 3) {
            playBomingAudio()
            gLivesNumber--;
            document.querySelector('.life').innerText = `Lives : Only ${gLivesNumber} !`
            cell.isShown = true;
            gGame.shownCount++;
            elCell.style.backgroundColor = 'rgb(101, 137, 172)'
            renderCell(elCell, MINE)
        } else if (cell.isMine && gLivesNumber === 1) {
            playBombingEndGameByMinesNumber()
            document.querySelector(".messageToUser").innerText = 'You Lost '
            document.querySelector(".smiley").innerText = '🤯'
            elCell.style.backgroundColor = 'rgb(255, 36, 36)'
            gLivesNumber--;
            document.querySelector('.life').innerText = `Lives : Dead`
            exposeMines()
            endGame();
        }
        checkGameWon();
        gBoardsArray.push(copyArrayToDifferentAddress());
    }

}

/////  Called on right click to mark a cell (suspected to be a mine) ////
/////  Search the web (and implement) how to hide the context menu on right click  ////

function cellMarked(elCell, i, j) {
    if (gGame.isOn)
        if (gBoard[i][j].isMarked) {
            playMarkingAudio();
            gBoard[i][j].isMarked = false;
            renderCell(elCell, EMPTY);
            gGame.markedCount--;
            gBoardsArray.push(copyArrayToDifferentAddress());
        } else if (!gBoard[i][j].isShown) {
        playMarkingAudio()
        gBoard[i][j].isMarked = true;
        renderCell(elCell, FLAG);
        gGame.markedCount++;
        checkGameWon();
        gBoardsArray.push(copyArrayToDifferentAddress());
    }
}

/////  When user clicks a cell with no mines around, we need to open not only  /////
/////  that cell, but also its neighbors.  /////
/////  NOTE: start with a basic implementation that only opens the non-mine  /////
/////  1st degree neighbors  /////

function expandShown(board, cellI, cellJ) {
    var SIZE = gLevel.SIZE;
    if (gExtraNoNegPos.length > 0) {
        gExtraNoNegPos.splice(0, 1)
    }
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= SIZE) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= SIZE) continue
            var cell = board[i][j];
            var elCellExp = document.querySelector(`.cell-${i}-${j}`);
            elCellExp.style.backgroundColor = 'rgb(101, 137, 172)'
            if (!cell.isShown) {
                cell.isShown = true;
                gGame.shownCount++;
                if (cell.minesAroundCount !== 0) {
                    renderCell(elCellExp, cell.minesAroundCount);
                } else {
                    gExtraNoNegPos.push({
                        i: i,
                        j: j
                    })
                }

            }

        }

    }
    while (gExtraNoNegPos.length > 0) {
        expandShown(gBoard, gExtraNoNegPos[0].i, gExtraNoNegPos[0].j);
    }
}

/////  Chose Game Level  ////////////

function chooseLevel(level, elButton) {
    gLevel.SIZE = level;
    elButton.classList.add('pushedButton');
    if (gPreviousPushedButton !== null) {
        gPreviousPushedButton.classList.remove('pushedButton');
    }
    gPreviousPushedButton = elButton;
    initGame();
    startNewGame();
    endGame();
    document.querySelector(".Timer").innerText = 'Timer : 000';
}

/////  Render Cell  /////

function renderCell(elcell, icon) {
    elcell.innerText = icon;
}

//////  Creates Random Positions Indexes  ////////

function createRandomMinesIndexesArrray() {
    var indexesArray = createRandomOrderNumbersArray(gLevel.SIZE * gLevel.SIZE, gLevel.MINES);
    bubbleSort(indexesArray);
    return indexesArray
}