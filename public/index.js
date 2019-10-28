`use strict`;

/* 
Important commands:

Using Node js shell - 
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
let purpleDoorGame, usedRiddles = [], colors = [], answers = [];


class PurpleDoorGame {

    constructor() {
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
        //determining task type, can implement more later
        // let randomTask = Math.random(2) + 1;

        //riddle
        // if(randomTask == 1){
            // let running = true;
            // while(running){
                let riddleCount = await this.getRiddleCount();
                let riddle = await this.getRiddle(riddleCount);

                let riddleText = Object.values(riddle.riddle);
                let answerText = Object.values(riddle.answerText);
                let correctAnswer = Object.values(riddle.answerValidation);

                answers = [
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

                //if the riddle has not been used already
                // if (!usedRiddles.find(ur => ur.question.id == randomRiddle.question.id)) {
                    //use riddle
                    promptLabel.innerHTML = riddleText;
                    //send answers to options array
                    let answerCount = 1;
                    for (let answer of answers) {
                        console.log(answer);
                        if (answerCount == 1) {
                            answerLabel1.innerHTML = answer.text;
                        }
                        else if (answerCount == 2) {
                            answerLabel2.innerHTML = answer.text;
                        }
                        else if (answerCount == 3) {
                            answerLabel3.innerHTML = answer.text;
                        }
                        answerCount++;
                    }
                    //add riddle to array after used
                    // usedRiddles.push(randomRiddle);
                    // running = false;
            // }
        // }
        // // task 2
        // Math?
        // else if(randomTask == 2){

        // }
        // // task 3
        // History / trivia?
        // else if(randomTask == 3){

        // }
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

    async createDoors(colors) {
        //check for purple door
        console.log(colors.find(c => c.is_purple_door == 1));
        if(colors.find(c => c.is_purple_door == 1)){
            console.log(`1`);
            let purpleIndex = colors.findIndex(c => c.is_purple_door == 1);
            this.drawPurpleDoor(colors[purpleIndex].name);
        }
        else{
            let count = 1;
            //draw 3 doors
            for (let color of colors) {
                this.drawDoor(color, count);
                count++;
            }
        }
        
    }

    drawDoor(color, door) {
        if (door == 1) {
            const context = door1.getContext("2d");
            context.beginPath();
            context.rect(100, 20, 150, 300);
            context.fillStyle = color.name;
            context.fill();
            context.moveTo(130 , 150);
            context.lineTo(125, 150);
            context.lineTo(125, 120);
            context.lineTo(130, 120);
            context.stroke();
        }
        else if (door == 2) {
            const context = door2.getContext("2d");
            context.beginPath();
            context.rect(100, 20, 150, 300);
            context.fillStyle = color.name;
            context.fill();
            context.moveTo(130, 150);
            context.lineTo(125, 150);
            context.lineTo(125, 120);
            context.lineTo(130, 120);
            context.stroke();
        }
        else if (door == 3) {
            const context = door3.getContext("2d");
            context.beginPath();
            context.rect(100, 20, 150, 300);
            context.fillStyle = color.name;
            context.fill();
            context.moveTo(130, 150);
            context.lineTo(125, 150);
            context.lineTo(125, 120);
            context.lineTo(130, 120);
            context.stroke();
        }
    }

    drawPurpleDoor(purple){
        let context = door2.getContext("2d");
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
}

startButton.addEventListener(`click`, async (e) => {
    e.preventDefault();

    purpleDoorGame = new PurpleDoorGame;

    let totalColors = await purpleDoorGame.getColorCount();

    colors = [];
    for (i = 0; i < 3; i++){
        let color = await purpleDoorGame.getColor(totalColors);
        colors.push(color);
    }

    purpleDoorGame.showGame();

    purpleDoorGame.createDoors(colors);

    purpleDoorGame.task();

});

door1.addEventListener(`click`, async (e) => {
    e.preventDefault();

    
}, false);

door2.addEventListener(`click`, async (e) => {
    e.preventDefault();
    console.log(`i was clicked`);
    answers = [{ is_correct_answer: 0 }, { is_correct_answer: 1 }]

    if(colors.find(c => c.is_purple_door == 1)){
        //purple door end screen stuff
        console.log(`purple`);
        purpleDoorGame.restartGame();
    }
    else if(answers[1].is_correct_answer == 1){
        console.log(`correct answer`);
        //generate new page
        purpleDoorGame = new PurpleDoorGame;

        let totalColors = await purpleDoorGame.getColorCount();

        colors = [];
        for (i = 0; i < 3; i++){
            let color = await purpleDoorGame.getColor(totalColors);
            colors.push(color);
        }
        console.log(colors);

        purpleDoorGame.createDoors(colors);
    }
    else{
        console.log(`incorrect`);
        purpleDoorGame = new PurpleDoorGame;

        purpleDoorGame.restartGame();
    }
}, false);


