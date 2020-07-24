'use strict'


function createRandomOrderNumbersArray(sortedArrayLength, randomArrayLength) {
    var sortedArr = [];
    var randomArr = [];
    var randomIndex = 0;
    for (var i = 0; i < sortedArrayLength; i++) {
        sortedArr.push(i)
    }
    for (var i = 0; i < randomArrayLength; i++) {
        randomIndex = getRandomInteger(0, sortedArr.length);
        randomArr.push(sortedArr[randomIndex]);
        sortedArr.splice(randomIndex, 1);
    }
    return randomArr
}


function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function bubbleSort(a) {
    var swapped = true;
    while (swapped) {
        swapped = false;
        for (var i = 0; i < a.length - 1; i++) {
            if (a[i] > a[i + 1]) {
                var temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
            }
        }
    }
}

/////  Playing Sounds  ///////

function playBomingAudio() {
    var sound = new Audio()
    sound.src = 'sound/Explosion.wav'
    sound.play()
}

function playClickingAudio() {
    var sound = new Audio()
    sound.src = 'sound/clicking.wav'
    sound.play()
}

function playMarkingAudio() {
    var sound = new Audio()
    sound.src = 'sound/marking.wav'
    sound.play()
}

function playWinningAudio() {
    var sound = new Audio()
    sound.src = 'sound/winning.mp3'
    sound.play()
}


function playBombingEndGameByMinesNumber() {
    for (var i = 0; i < gLevel.MINES; i++) {
        setTimeout(() => {
            playBomingAudio()
            playBomingAudio()
        }, 200);
        setTimeout(() => {
            playBomingAudio()
            playBomingAudio()
        }, 300);
    }

    playBomingAudio()
    playBomingAudio()
}


/////  Innitiate and Update LocalStorage Best results  //////

function showBestScores() {
    if (gLevel.SIZE === 4) {
        if (localStorage.getItem('four') === null)  {
            localStorage.setItem('four', gGame.secsPassed);
            document.querySelector('.four').innerText = `Best Time : ${gGame.secsPassed}`;
        }else {
            var bestTime = parseInt(localStorage.getItem('four'))
            if(bestTime >  gGame.secsPassed){
                localStorage.setItem('four', gGame.secsPassed);
                document.querySelector('.four').innerText = `Best Time : ${gGame.secsPassed}`;
            }else{
                document.querySelector('.four').innerText = `Best Time : ${bestTime}`;
            }
        }
    } else if (gLevel.SIZE === 8) {
        debugger
        if (localStorage.getItem('eight') === null)  {
            localStorage.setItem('eight', gGame.secsPassed);
            document.querySelector('.eight').innerText = `Best Time : ${gGame.secsPassed}`;
        }else {
            var bestTime = parseInt(localStorage.getItem('eight'))
            if(bestTime >  gGame.secsPassed){
                localStorage.setItem('eight', gGame.secsPassed);
                document.querySelector('.eight').innerText = `Best Time : ${gGame.secsPassed}`;
            }else{
                document.querySelector('.eight').innerText = `Best Time : ${bestTime}`;
            }
        }
    } if (gLevel.SIZE === 12) {
        if (localStorage.getItem('twelve') === null)  {
            localStorage.setItem('twelve', gGame.secsPassed);
            document.querySelector('.twelve').innerText = `Best Time : ${gGame.secsPassed}`;
        }else {
            var bestTime = parseInt(localStorage.getItem('twelve'))
            if(bestTime >  gGame.secsPassed){
                localStorage.setItem('twelve', gGame.secsPassed);
                document.querySelector('.twelve').innerText = `Best Time : ${gGame.secsPassed}`;
            }else{
                document.querySelector('.twelve').innerText = `Best Time : ${bestTime}`;
            }
        }
    }
}