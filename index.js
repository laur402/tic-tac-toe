const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let isOTurn = false;
let isGameOver = false;

window.onload = () => {
    const gameBoardButtons = document.getElementsByClassName('game-board__game-cell');
    const textBox = document.getElementsByClassName('game-information__text')[0];
    loadGameBoardButtons(gameBoardButtons, textBox);
    loadTextBox(textBox);

    const resetButton = document.getElementsByClassName('game-information__reset-board')[0];
    loadResetButton(resetButton, gameBoardButtons, textBox);
}

function loadGameBoardButtons(buttons, textBox) {
    for (let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', ()=>{
            if (isGameOver) return;
            switch(isOTurn){
                case true:
                    buttons[i].innerText = 'O';
                    textBox.innerText = "X's turn."
                    break;
                case false:
                    buttons[i].innerText = 'X';
                    textBox.innerText = "O's turn.";
                    break;
            }
            buttons[i].disabled = true;

            if (isGameBoardWinner(buttons)) endGame(buttons, textBox);
            if (isGameBoardTie(buttons)) endGame(buttons, textBox, true);

            isOTurn = !isOTurn;
        })
    }
}

function loadTextBox(textBox){
    textBox.innerText = isOTurn ? "O's turn." : "X's turn.";
}

function loadResetButton(resetButton, gameBoardButtons, textBox) {
    resetButton.onclick = ()=> {
        for (let i=0; i<gameBoardButtons.length; i++) {
            gameBoardButtons[i].innerText = '';
            gameBoardButtons[i].disabled = false;
        }
        loadTextBox(textBox);
        isGameOver = false;
    }
}

function isGameBoardWinner(buttons){
    for (let i = 0; i < winPatterns.length; i++) {
        if (buttons[winPatterns[i][0]].innerText !== ''
            && buttons[winPatterns[i][0]].innerText === buttons[winPatterns[i][1]].innerText
            && buttons[winPatterns[i][1]].innerText === buttons[winPatterns[i][2]].innerText){
            return true;
        }
    }
    return false;
}

function isGameBoardTie(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].innerText === '') return false;
    }
    return true;
}

function endGame(buttons, textBox, isTie = false){
    if (isTie) textBox.innerText = "It's a tie!";
    else textBox.innerText = isOTurn ? "O wins!" : "X wins!";
    isGameOver = true;
}