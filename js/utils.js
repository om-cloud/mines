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


function playBombingEndGameByMinesNumber(){
for(var i=0;i<gLevel.MINES;i++){
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