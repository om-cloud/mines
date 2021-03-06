'use strict'


/////  Temporary Timer Functions  //////


function operateTimer() {
    var miliSeconds = 0;
    var seconds = 0;
    var miliSecondToShow = 0;
    var secondsToShow = 0;
    timer(miliSeconds, seconds, miliSecondToShow, secondsToShow);
}


function timer(miliSeconds, seconds, miliSecondToShow, secondsToShow) {
    gTime = setTimeout(() => {
        timer(miliSeconds, seconds, miliSecondToShow, secondsToShow);
    }, 1);
    miliSeconds += 1;
    if (!gGame.isOn) {  ///  to add case of winning
        stoptimer();
        losingMessagesToUser();
        return
    }
    var timerToDom = createTimerStringToDom(miliSeconds, seconds, miliSecondToShow, secondsToShow);
    document.querySelector(".Timer").innerText = timerToDom = timerToDom
}


function createTimerStringToDom(miliSeconds, seconds, miliSecondToShow, secondsToShow) {
    if (miliSeconds === 0) {
        miliSecondToShow = '000'
    } else if (miliSeconds < 10) {
        miliSecondToShow = '00' + miliSeconds
    } else if (miliSeconds >= 10 && miliSeconds < 100) {
        miliSecondToShow = '0' + miliSeconds;
    } else if (miliSeconds >= 100 && miliSeconds < 1000) {
        miliSecondToShow = miliSeconds
    } else if (miliSeconds >= 1000) {
        seconds = Math.floor(miliSeconds / 1000);
        miliSecondToShow = miliSeconds - seconds * 1000
    }
    if (seconds === 0) {
        secondsToShow = '00';
    }
    if (seconds < 10) {
        secondsToShow = '0' + seconds;
    }
    return 'Timer : ' + secondsToShow + ':' + miliSecondToShow
}

function stoptimer() {
    clearTimeout(gTime);
}