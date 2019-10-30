`use strict`;

/* 
1. node server.js
*/

//html dom elements
const body = document.getElementById(`body`);

const welcomeScreen = document.getElementById(`welcomeScreen`);
const startButton = document.getElementById(`startButton`);

const gameScreen = document.getElementById(`gameScreen`);
const gameHeader = document.getElementById(`gameHeader`);

const promptLabel = document.getElementById(`promptLabel`);
const answerLabel1 = document.getElementById(`answerLabel1`);
const answerLabel2 = document.getElementById(`answerLabel2`);
const answerLabel3 = document.getElementById(`answerLabel3`);

const door1 = document.getElementById(`door1`);
const door2 = document.getElementById(`door2`);
const door3 = document.getElementById(`door3`);

//initialized variable for site visit
 let usedRiddles = [], purpleDoorGame, colors = [];

//game class
class PurpleDoorGame {

    constructor() {
        this.answers = []
    }

    showGame() {
        welcomeScreen.classList.add(`hidden`);
        gameScreen.classList.remove(`hidden`);
        gameHeader.classList.add(`header2`);
        body.style.backgroundColor = `Black`;
    }

    restartGame(){
        welcomeScreen.classList.remove(`hidden`);
        gameScreen.classList.add(`hidden`);
        gameHeader.classList.remove(`header2`);
        body.style.backgroundColor = `Magenta`;
    }

    async task() {
        return new Promise(async (resolve, reject) => {
            let riddleCount = await this.getRiddleCount();
            let riddle = await this.getRiddle(riddleCount);

            let riddleText = Object.values(riddle.riddle);
            let answerText = Object.values(riddle.answerText);
            let correctAnswer = Object.values(riddle.answerValidation);

            this.answers = [
                            {
                                text: answerText[0],
                                is_correct_answer: correctAnswer[0]
                            },
                            {
                                text: answerText[1],
                                is_correct_answer: correctAnswer[1]
                            },
                            {
                                text: answerText[2],
                                is_correct_answer: correctAnswer[2]
                            }
                        ];

                promptLabel.innerHTML = riddleText;

                resolve(this.answers);
        });
    }

    async getRiddleCount() {
        return new Promise(async (resolve, reject) => {
        const response = await fetch('http://localhost:8080/riddles');
        const riddleCount = await response.json();

        resolve(riddleCount.riddles);
        });
    }

    async getRiddle(riddleCount) {
        return new Promise(async (resolve, reject) => {
            let randomRiddle = Math.floor((Math.random() * riddleCount) + 1);
            const response = await fetch('http://localhost:8080/riddle/' + randomRiddle);
            const riddleObject = await response.json();

            resolve(riddleObject);
        });
    }

    async getColorCount() {
        return new Promise(async (resolve, reject) => {
        const response = await fetch('http://localhost:8080/colors');
        const colorCount = await response.json();

        resolve(colorCount.colors);
        });
    }

    async getColor(color) {
        return new Promise(async (resolve, reject) => {
            let randomColor = Math.floor((Math.random() * color) + 1);
            const response = await fetch('http://localhost:8080/color/' + randomColor);
            const colorObject = await response.json();

            resolve(colorObject);
        });
    }

    async createDoors(colors, answers) {
        //check for purple door
        if(colors.find(c => c.is_purple_door == 1)){
            let purpleIndex = colors.findIndex(c => c.is_purple_door == 1);
            this.drawPurpleDoor(colors[purpleIndex].name);
        }
        else{
            let count = 1;
            //draw 3 doors
            for (let color of colors) {
                this.drawDoor(color, count, answers);
                count++;
            }
        }
        
    }

    drawDoor(color, door, answers) {
        let answerIndex = door - 1;
        if (door == 1) {
            const context = door1.getContext("2d");
            context.clearRect(0, 0, door1.width, door1.height);
            context.beginPath();
            context.rect(100, 20, 135, 300);
            context.fillStyle = color.name;
            context.fill();
            context.moveTo(130 , 150);
            context.lineTo(125, 150);
            context.lineTo(125, 120);
            context.lineTo(130, 120);
            context.stroke();

            context.textBaseline = "bottom";
            context.font = "20px Arial";
            context.fillStyle = `Black`;
            context.fillText(answers[answerIndex].text, 135, 350);
        }
        else if (door == 2) {
            const context = door2.getContext("2d");
            context.clearRect(0, 0, door2.width, door2.height);
            context.beginPath();
            context.rect(100, 20, 150, 300);
            context.fillStyle = color.name;
            context.fill();
            context.moveTo(130, 150);
            context.lineTo(125, 150);
            context.lineTo(125, 120);
            context.lineTo(130, 120);
            context.stroke();

            context.textBaseline = "bottom";
            context.font = "20px Arial";
            context.fillStyle = `Black`;
            context.fillText(answers[answerIndex].text, 135, 350);
        }
        else if (door == 3) {
            const context = door3.getContext("2d");
            context.clearRect(0, 0, door3.width, door3.height);
            context.beginPath();
            context.rect(100, 20, 150, 300);
            context.fillStyle = color.name;
            context.fill();
            context.moveTo(130, 150);
            context.lineTo(125, 150);
            context.lineTo(125, 120);
            context.lineTo(130, 120);
            context.stroke();

            context.textBaseline = "bottom";
            context.font = "20px Arial";
            context.fillStyle = `Black`;
            context.fillText(answers[answerIndex].text, 150, 350);
        }
    }

    drawPurpleDoor(purple){
        promptLabel.innerHTML = ``;

        let context = door2.getContext("2d");
        context.clearRect(0, 0, door2.width, door2.height);
        context.beginPath();
        context.rect(100, 20, 150, 300);
        context.fillStyle = purple;
        context.fill();
        context.moveTo(130 , 150);
        context.lineTo(125, 150);
        context.lineTo(125, 120);
        context.lineTo(130, 120);
        context.stroke();

        let context2 = door1.getContext("2d");
        context2.clearRect(0, 0, door1.width, door1.height);

        let context3 = door3.getContext("2d");
        context3.clearRect(0, 0, door3.width, door3.height);
    } 

    checkForCorrect(door){
        if(this.answers[door].is_correct_answer == 1){
            return true;
        }
        else{
            return false;
        }
    }
}

startButton.addEventListener(`click`, async (e) => {
    e.preventDefault();

    purpleDoorGame = new PurpleDoorGame;

    let totalColors = await purpleDoorGame.getColorCount();

    let colors = [];
    for (i = 0; i < 3; i++){
        let color = await purpleDoorGame.getColor(totalColors);
        colors.push(color);
    }

    purpleDoorGame.showGame();

    let answers = await purpleDoorGame.task();

    purpleDoorGame.createDoors(colors, answers);

});

door1.addEventListener(`click`, async (e) => {
    e.preventDefault();

    if(purpleDoorGame.checkForCorrect(0)){
        //generate new page
        purpleDoorGame = new PurpleDoorGame;

        let totalColors = await purpleDoorGame.getColorCount();

        let colors = [];
        for (i = 0; i < 3; i++){
            let color = await purpleDoorGame.getColor(totalColors);
            colors.push(color);
        }
        let answers = await purpleDoorGame.task();

        purpleDoorGame.createDoors(colors, answers);
    }
    else{
        purpleDoorGame = new PurpleDoorGame;

        purpleDoorGame.restartGame();
    }
    
});

door2.addEventListener(`click`, async (e) => {
    e.preventDefault();

    if(colors.find(c => c.is_purple_door == 1)){
        //purple door end screen stuff
        purpleDoorGame.restartGame();
    }
    else if(purpleDoorGame.checkForCorrect(1)){
        //generate new page
        purpleDoorGame = new PurpleDoorGame;

        let totalColors = await purpleDoorGame.getColorCount();

        let colors = [];
        for (i = 0; i < 3; i++){
            let color = await purpleDoorGame.getColor(totalColors);
            colors.push(color);
        }

        let answers = await purpleDoorGame.task();

        purpleDoorGame.createDoors(colors, answers);
    }
    else{
        purpleDoorGame = new PurpleDoorGame;

        purpleDoorGame.restartGame();
    }
});

door3.addEventListener(`click`, async (e) => {
    e.preventDefault();

    if(purpleDoorGame.checkForCorrect(2)){
        //generate new page
        purpleDoorGame = new PurpleDoorGame;

        let totalColors = await purpleDoorGame.getColorCount();

        let colors = [];
        for (i = 0; i < 3; i++){
            let color = await purpleDoorGame.getColor(totalColors);
            colors.push(color);
        }
        let answers = await purpleDoorGame.task();

        purpleDoorGame.createDoors(colors, answers);
    }
    else{
        purpleDoorGame = new PurpleDoorGame;

        purpleDoorGame.restartGame();
    }
    
});

