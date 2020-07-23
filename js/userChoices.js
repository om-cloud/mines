'use strict'

/////  Give Hint of Cell Neighbours  /////

function giveHint(elButton) {
    gIsHint = true;
    elButton.classList.add('animated-bulb');
}

/////  Managing Exposing And Hiding Neighbours For 1 second  //////

function exposeneighbours(elCell, cellI, cellJ) {
    if (!gHintsCounter > 0 || !gIsHint) return
    var reveal = true;
    setTimeout(() => {
        reveal = false;
        toggleNegsContent(elCell, cellI, cellJ, reveal);
        document.querySelector(`.hint${gHintsCounter}`).classList.add('hidden');
        gHintsCounter--;
        gIsHint=false;
    },1000)
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
            elCell.sty
            if (reveal) {
                elCell.style.backgroundColor = 'rgb(101, 137, 172)'
                if (cell.isMine && !cell.isShown) {
                    renderCell(elCell, MINE)
                } else if (!cell.isMine && cell.minesAroundCount > 0 && !cell.isShown) {
                    renderCell(elCell, cell.minesAroundCount)
                }
            } else {
                if(!cell.isShown){
                    renderCell(elCell, EMPTY);
                    elCell.style.backgroundColor = '#fd8910'
                }
            }
        }
    }

}
