/* Variables */

let cards = Array.from(document.querySelectorAll('.game__image'));
const deck = document.querySelector('.card__container');
const restartBtn = document.querySelector('.restart');
const modalBtn = document.querySelector('button');
let score = 0;
let clickedCards = [];
let timerID = null;
time = 0;


/* Event Listeners */

cards.forEach(function(card){
    card.addEventListener('click', function(e){
        if (timerID === null) {
            startTimer();
        }
        if (clickedCards.indexOf(card)===-1) {
            //if the card is not in the array, add it and reshuffle
            clickedCards.push(card);
            reshuffleCards();
            score++;
            updateScore(score);
            if (score === 16) {
                //Win Codition
                gameOver('Nice Job! You Win!')
            }
        } else {
            //Game over
            gameOver('Sorry, you lost!');
        }
    });
});

restartBtn.addEventListener('click', resetGame);

modalBtn.addEventListener('click', resetGame);


/* functions */

function gameOver(text) {
    gameOverText = document.querySelector('.modal__subheading');
    gameOverText.textContent = text;
    openModal();
    stopTimer();
    clickedCards = [];
}

function resetGame() {
    if (timerID !== null) {
        stopTimer();
    }
    score = 0;
    updateScore(score);
    time = 0;
    updateTime(time);
    reshuffleCards();
    closeModal();
    clickedCards = [];
}

function formatTime(time) {
    // 0:00
    let minute = parseInt(time/60);
    let seconds = time%60;
    if (seconds < 10) {
        seconds= '0'+seconds;
    } 
    let formattedTime = minute+':'+seconds;
    return formattedTime;
}

function openModal() {
    const modal = document.querySelector('.modal');
    modal.classList.remove('hide');
}

function closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('hide');
}

function startTimer () {
    timerID = setInterval(function(){
        time++;
        updateTime(time);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerID);
    timerID = null;
}

function updateTime(time) {
    let timerDisplays = document.querySelectorAll('.timer__clock');
    timerDisplays.forEach(function(display) {
        display.textContent = formatTime(time);
    });
}

function updateScore(updatedScore) {
    const scoreDisplays = document.querySelectorAll('.score__count');
    scoreDisplays.forEach(function(display){
        display.textContent = updatedScore;
    });
}

reshuffleCards();


function reshuffleCards() {
    cards = shuffle(cards);
    deck.innerHTML = "";
    cards.forEach(function(card){
        deck.appendChild(card);
    });
}




function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
