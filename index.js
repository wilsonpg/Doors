`use strict`;


/* Main idea: Starts on purple screen.  User is searching for a door the same color as the screen.
Once they open that door, they get some prize.

Commandments:
1. Make it so that the user cannot possibly find the purple door until ~10 iterations.
2. Adjust the door colors to align with random css colors chosen from an array.
3. User must click on one of three doors on the page.
    a. User is then asked a riddle.
        i. If they answer correctly, they move through the door.
        ii. If they answer incorrectly, they are barred from passage through that door. (becomes grey / colorless and inaccessible)
    b. Potential to add more games / puzzles to this as I go.
4. First and last page have Fuschia coloring, rest are black to highlight doors
    a. text changes to Fuschia
*/

//external files
// const DoorService = require(`./DoorService`);
// const ColorService = require(`./ColorService`);
// const RiddleService = require(`./RiddleService`);

//html elements
const body = document.getElementById(`body`);
const gameHeader = document.getElementById(`gameHeader`);
const welcomeScreen = document.getElementById(`welcomeScreen`);
const gameScreen = document.getElementById(`gameScreen`);
const startButton = document.getElementById(`startButton`);
const promptLabel = document.getElementById(`promptLabel`);
const door1 = document.getElementById(`door1`);
const door2 = document.getElementById(`door2`);
const door3 = document.getElementById(`door3`);

//initialized variable for game
let game, usedRiddles = [];


class PurpleDoorGame {

    constructor() {
        this.doors = [],
        this.prompt,
        this.options = [],
        this.count = 1,
        this.color;
    }

    async display(){
        welcomeScreen.classList.add(`hidden`);
        gameScreen.classList.remove(`hidden`);
        gameHeader.classList.add(`header2`);
        body.style.backgroundColor = `Black`;
    }

    async task(){
        //determining task type
        // let randomTask = Math.random(2) + 1;

        //riddle
        // if(randomTask == 1){
            // let running = true;
            // while(running){
                let totalRiddles = await this.getRiddleCount();
                let randomRiddle = Math.random(totalRiddles);
                let riddle = this.getQuestionAndAnswers(randomRiddle);

                let answers = riddle.answers.split(`, `);

                //if the riddle has not been used already
                if(!usedRiddles.find(ur => ur.question.id == randomRiddle.question.id)){
                    //use riddle
                    promptLabel.innerHTML = riddle[0].question;
                    //send answers to options array
                    for(let answer of answers){
                        this.options.push(riddle.answer);
                        running = false;
                    }
                    //add riddle to array after used
                    usedRiddles.push(randomRiddle);
                }
            // }
        // }
        // // task 2
        // else if(randomTask == 2){

        // }
        // // task 3
        // else if(randomTask == 3){

        // }
    }

    async getColorCount(){
        /*
        SELECT COUNT(*)
        FROM colors;
        */
    };
    
    async getColor(color){
        // main (){
        //     /*
        //     SELECT *
        //     FROM colors
        //     WHERE id = ${ color };
        //     */
        // }
        // main();
    };

    async getRiddleCount(){
        /*
        SELECT COUNT(*)
        FROM questions;
        */
    }
    
    async getQuestionAndAnswers(question){
        /*
        Query database for random question and associated answers:
    
        SELECT DISTINCT questions.id, questions.text, GROUP_CONCAT(answers.text SEPARATOR (', '))
        FROM questions
        JOIN answers ON answers.question_id = questions.id
        WHERE questions.id = ${ question };
        */
    };

    async door(){
        //door creation
        for(let option of this.options){
            //for random door color
            let totalColors = await this.getColorCount();
            let randomColor = Math.random(totalColors);
            let color = await this.getColor(randomColor);

            let door = this.drawDoor(color.name, this.count);
            if(color.is_purple_door){
                //grey out other two doors and show message `Your treasure awaits`
            }
            this.count++;
        }
    }

    async drawDoor(color, count){
        if(count == 1){
            const context = door1.getContext("2d");
            context.beginPath();
            context.rect(20, 20, 50, 100);
            context.fillStyle = color;
            context.fill();
            context.stroke();
        }
        else if(count == 2){
            const context = door2.getContext("2d");
            context.beginPath();
            context.rect(20, 20, 50, 100);
            context.fillStyle = color;
            context.fill();
            context.stroke();
        }
        else if(count == 3){
            const context = door3.getContext("2d");
            context.beginPath();
            context.rect(20, 20, 50, 100);
            context.fillStyle = color;
            context.fill();
            context.stroke();
        }
    };

    async checkIfCorrect(door, option){
        if(door == this.options.findIndex(o => o.answer = option) + 1){
            return true;
        }
        else{
            return false;
        }
    }
}

startButton.addEventListener(`click`, (e) => {
    e.preventDefault();

    game = new PurpleDoorGame;

    game.display();
    game.task();
    game.door();
});

door1.addEventListener(`click`, (e) => {
    e.preventDefault();

    let door = 1;

    if(game.checkIfCorrect(door, this.options[0]))
    {
        game = new PurpleDoorGame;

        game.display();
        game.task();
        game.door();
    }
    else{
        const context = door1.getContext("2d");
        context.beginPath();
        context.rect(20, 20, 50, 100);
        context.fillStyle = `DarkGray`;
        context.fill();
        context.stroke();
    }
});

door2.addEventListener(`click`, (e) => {
    e.preventDefault();

    let door = 2;

    if(game.checkIfCorrect(door, this.options[1]))
    {
        game = new PurpleDoorGame;

        game.display();
        game.task();
        game.door();
    }
    else{
        const context = door2.getContext("2d");
        context.beginPath();
        context.rect(20, 20, 50, 100);
        context.fillStyle = `DarkGray`;
        context.fill();
        context.stroke();
    }
});

door3.addEventListener(`click`, (e) => {
    e.preventDefault();

    let door = 3;

    if(game.checkIfCorrect(door, this.options[2]))
    {
        game = new PurpleDoorGame;

        game.display();
        game.task();
        game.door();
    }
    else{
        const context = door3.getContext("2d");
        context.beginPath();
        context.rect(20, 20, 50, 100);
        context.fillStyle = `DarkGray`;
        context.fill();
        context.stroke();
    }
});


