`use strict`;

import { getColorCount, getColor } from './ColorService/index.js';
import { getRiddleCount, getQuestionAndAnswers } from './RiddleService/index.js';
import { drawDoor } from './DoorService/index.js';

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
let purpleDoorGame, usedRiddles = [];


class PurpleDoorGame {

    constructor() {
        this.options = []
    }

    async showGame(){
        welcomeScreen.classList.add(`hidden`);
        gameScreen.classList.remove(`hidden`);
        gameHeader.classList.add(`header2`);
        body.style.backgroundColor = `Black`;
    }

    async task(){
        //determining task type, can implement more later
        // let randomTask = Math.random(2) + 1;

        //riddle
        // if(randomTask == 1){
            // let running = true;
            // while(running){
                let totalRiddles = await getRiddleCount();
                console.log(totalRiddles);
                let randomRiddle = Math.random(totalRiddles);
                let riddle = getQuestionAndAnswers(randomRiddle);

                let answers = riddle.answers.split(`, `);

                //if the riddle has not been used already
                if(!usedRiddles.find(ur => ur.question.id == randomRiddle.question.id)){
                    //use riddle
                    promptLabel.innerHTML = riddle.question;
                    //send answers to options array
                    let answerCount = 1;
                    for(let answer of answers){
                        this.options.push(answer);
                        if(answerCount == 1){
                            answerLabel1.innerHTML = answer;
                        }
                        else if(answerCount == 2){
                            answerLabel2.innerHTML = answer;
                        }
                        else if(answerCount == 3){
                            answerLabel3.innerHTML = answer;
                        }
                    }
                    //add riddle to array after used
                    usedRiddles.push(randomRiddle);
                    running = false;
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

    async createDoors(){
        doors = [1, 2, 3];
        createdDoors = [];
        for(let door of doors){
            let totalColors = await getColorCount();
            let randomColor = Math.random(totalColors);
            let color = await getColor(randomColor);
            let door = drawDoor(color, door);
            createdDoors.push(door);
        }

        return createdDoors;
    }

    async checkIfCorrect(door){
        if(door == this.options.findIndex(o => o.correct_answer == 1) + 1){
            return true;
        }
        else{
            return false;
        }
    }

    // async purpleDoor(door){
    //     if(door == 1){
    //         const context = door2.getContext("2d");
    //         context.beginPath();
    //         context.rect(20, 20, 50, 100);
    //         context.fillStyle = `DarkGray`;
    //         context.fill();
    //         context.stroke();
    
    //         door2.removeEventListener(`click`, e);
    
    //         const context = door3.getContext("2d");
    //         context.beginPath();
    //         context.rect(20, 20, 50, 100);
    //         context.fillStyle = `DarkGray`;
    //         context.fill();
    //         context.stroke();
    
    //         door3.removeEventListener(`click`, e);
    //     }
    //     else if(door == 2){
    //         const context = door1.getContext("2d");
    //         context.beginPath();
    //         context.rect(20, 20, 50, 100);
    //         context.fillStyle = `DarkGray`;
    //         context.fill();
    //         context.stroke();
    
    //         door1.removeEventListener(`click`, e);
    
    //         const context = door3.getContext("2d");
    //         context.beginPath();
    //         context.rect(20, 20, 50, 100);
    //         context.fillStyle = `DarkGray`;
    //         context.fill();
    //         context.stroke();
    
    //         door3.removeEventListener(`click`, e);
    //     }
    //     else if(door == 3){
    //         const context = door1.getContext("2d");
    //         context.beginPath();
    //         context.rect(20, 20, 50, 100);
    //         context.fillStyle = `DarkGray`;
    //         context.fill();
    //         context.stroke();
    
    //         door1.removeEventListener(`click`, e);
    
    //         const context = door2.getContext("2d");
    //         context.beginPath();
    //         context.rect(20, 20, 50, 100);
    //         context.fillStyle = `DarkGray`;
    //         context.fill();
    //         context.stroke();
    
    //         door2.removeEventListener(`click`, e);
    //     }
    // };
}

startButton.addEventListener(`click`, (e) => {
    e.preventDefault();

    purpleDoorGame = new PurpleDoorGame;

    await purpleDoorGame.showGame();
    await purpleDoorGame.task();
    // await purpleDoorGame.door();
});

// door1.addEventListener(`click`, (e) => {
//     e.preventDefault();

//     let door = 1;

//     if(purpleDoorGame.checkIfCorrect(door))
//     {
//         purpleDoorGame = new PurpleDoorGame;

//         purpleDoorGame.display();
//         purpleDoorGame.task();
//         purpleDoorGame.door();
//         purpleDoorGame.purpleDoor();
//     }
//     else{
//         const context = door1.getContext("2d");
//         context.beginPath();
//         context.rect(20, 20, 50, 100);
//         context.fillStyle = `DarkGray`;
//         context.fill();
//         context.stroke();

//         door1.removeEventListener(`click`, e);
//     }
// });

// door2.addEventListener(`click`, (e) => {
//     e.preventDefault();

//     let door = 2;

//     if(purpleDoorGame.checkIfCorrect(door))
//     {
//         purpleDoorGame = new PurpleDoorGame;

//         purpleDoorGame.display();
//         purpleDoorGame.task();
//         purpleDoorGame.door();
//     }
//     else{
//         const context = door2.getContext("2d");
//         context.beginPath();
//         context.rect(20, 20, 50, 100);
//         context.fillStyle = `DarkGray`;
//         context.fill();
//         context.stroke();

//         door2.removeEventListener(`click`, e);
//     }
// });

// door3.addEventListener(`click`, (e) => {
//     e.preventDefault();

//     let door = 3;

//     if(purpleDoorGame.checkIfCorrect(door))
//     {
//         purpleDoorGame = new PurpleDoorGame;

//         purpleDoorGame.display();
//         purpleDoorGame.task();
//         purpleDoorGame.door();
//     }
//     else{
//         const context = door3.getContext("2d");
//         context.beginPath();
//         context.rect(20, 20, 50, 100);
//         context.fillStyle = `DarkGray`;
//         context.fill();
//         context.stroke();

//         door3.removeEventListener(`click`, e);
//     }
// });


