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



