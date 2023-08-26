document.addEventListener('DOMContentLoaded', function () {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function () {
            if (this.getAttribute('data-type') == 'submit') {
                alert('You clicked Submit!');
            }
            else {
                let gameType = this.getAttribute('data-type');
                alert(`You clicked ${gameType}`);
                runGame(gameType);
            }
        });
    }

});

document.getElementById('submit-button').addEventListener('click', function (event) {
    event.preventDefault();
    if (checkAnswer()) {
        incrementScore();
        return;
    }
    console.log("here you are wrong");
    incrementWrongAnswer();
});

function runGame(gameType) {
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    switch (gameType) {
        case 'addition':
            return displayAdditionQuestion(num1, num2);
        case 'substract':
            return displaySubstructQuestion(num1, num2);
        case 'multiply':
            return displayMultiplyQuestion(num1, num2);
        case 'division':
            return displayDivisionQuestion(num1*num2, num2);
        default:
            alert(`Unkowwn game type: ${gameType}`);
            throw `Unkowwn game type: ${gameType}. Aborting!`;

    }
}

function setInputs(operand1, operand2, operator) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = operator;
}

function getInputs() {
    let operand1 = parseInt(document.getElementById('operand1').textContent);
    let operand2 = parseInt(document.getElementById('operand2').textContent);
    let operator = document.getElementById('operator').textContent;
    return { operand1, operand2, operator };
}

function checkAnswer() {
    let answer = parseInt(document.getElementById('answer-box').value);
    let { operand1, operand2, operator } = getInputs();
    let expectedAnswer = calculateCorrectAnswer(operand1, operand2, operator);
    return answer === expectedAnswer;
}

function calculateCorrectAnswer(num1, num2, operator) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return (num1*num2) / num2;
        default:
            throw `Invalid operator: ${operator}`;
    }
}

function incrementScore() {
    let score = document.getElementById('score').textContent;
    document.getElementById('score').textContent = (parseInt(score) + 1).toString();
}

function incrementWrongAnswer() {
    let incorrectScore = document.getElementById('incorrect').textContent;
    document.getElementById('incorrect').textContent = (parseInt(incorrectScore) + 1).toString();
}

function displayAdditionQuestion(operand1, operand2) {
    setInputs(operand1, operand2, '+');
}

function displaySubstructQuestion(operand1, operand2) {
    setInputs(operand1, operand2, '-');

}

function displayMultiplyQuestion(operand1, operand2) {
    setInputs(operand1, operand2, '*');
}

function displayDivisionQuestion(operand1, operand2) {
    setInputs(operand1, operand2, '/');
}