'use strict'

/////  Temporary Timer Functions  //////

function operateTimer() {
    var seconds = 0;
    var secondsToShow = 0;
    timer(seconds, secondsToShow);
}

function timer(seconds, secondsToShow) {
    gTime = setTimeout(() => {
        timer(seconds, secondsToShow);
    }, 1000);
    seconds += 1;
    gGame.secsPassed += 1
    if (!gGame.isOn && gGame.shownCount !== 0) { ///  to add case of winning
        stoptimer();
        return
    }
    var timerToDom = createTimerStringToDom(seconds, secondsToShow);
    document.querySelector(".Timer").innerText = timerToDom
}

function createTimerStringToDom(seconds, secondsToShow) {

    if (seconds === 0) {
        secondsToShow = '000';
    } else if (seconds < 10) {
        secondsToShow = '00' + seconds;
    } else if (seconds >= 10 && seconds <= 100) {
        secondsToShow = '0' + seconds;
    } else if (seconds >= 100 && seconds <= 1000) {
        secondsToShow = seconds;
    }
    gGame.secsPassed = seconds;
    return 'Timer : ' + secondsToShow
}

function stoptimer() {
    clearTimeout(gTime);
}