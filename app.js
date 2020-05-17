var scores,
    roundScore,
    activePlayer,
    gamePlaying;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        //1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;


        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'img/' + 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'img/' + 'dice-' + dice2 + '.png';


        //3. Update the round score IF the rolled number was NOT a 1

        if ((dice1 === 6 && diceOld1 === 6) || (dice2 === 6 && diceOld2 === 6)) {
            //Player loses score
            scores[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).textContent = "0";

            nextPlayer();
        } else if ((dice1 !== 1) && (dice2 !== 1)) {
            roundScore += dice1 + dice2;
            diceOld1 = dice1;
            diceOld2 = dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;

        } else {
            nextPlayer();
            document.getElementById('dice-1').style.display = "none";
            document.getElementById('dice-2').style.display = "none";

        }


    }


});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        // Add the CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.getElementById("score-" + activePlayer).textContent =
            scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        // Undefined, 0, null or  "" are COERCED to false
        // Anything else is COERCED to true
        if (input) {
            var winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.getElementById("name-" + activePlayer).textContent = "Winner!";
            document.getElementById("dice-1").style.display = "none";
            document.getElementById("dice-2").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }

    }

});

function nextPlayer() {
    document.getElementById("current-" + activePlayer).textContent = "0";
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {


    scores = [0, 0];
    diceOld1 = 0;
    diceOld2 = 0;
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector(".player-0" + "-panel").classList.remove("winner");
    document.querySelector(".player-1" + "-panel").classList.remove("winner");
    document.querySelector(".player-0" + "-panel").classList.remove("active");
    document.querySelector(".player-0" + "-panel").classList.add("active");
    document.querySelector(".player-1" + "-panel").classList.remove("active");
}