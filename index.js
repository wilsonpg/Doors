`use strict`;

/* Main idea: Starts on purple screen.  User is searching for a door the same color as the screen.
Once they open that door, they get some prize.

Commandments:
1. Make it so that the user cannot possibly find the purple door until ~10 iterations.
2. Adjust the door colors to align with random css colors chose from an array.
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

//initialized variable for game
let game, usedRiddles = [];


class PurpleDoorGame {

    constructor() {
        this.doors = [],
        this.options = []
    }

    async task(){
        //determining task type
        let randomTask = Math.random(2);

        if(randomTask == 0){
            let running = true;
            while(running){
                let randomRiddle = Math.random(riddles.length);

                if(usedRiddles.length){
                    //if the riddle has not been used already
                    if(!usedRiddles.find(ur => ur.question.id == randomRiddle.question.id)){
                        //use riddle, send answers to options array
                        for(let riddle of randomRiddle){
                            this.options.push(riddle.answer);
                            running = false;
                        }
                        //add riddle to array after used
                        usedRiddles.push(randomRiddle);
                    }
                }
            }
        }
    }

    async door(){
        //door creation
        for(let option of this.options){
            //for random door color
            let randomColor = Math.random(colors.length);
            let color = colors[randomColor].name;

            let door = await DoorService.getDoor(color, option);
        }
    }
}

startButton.addEventListener(`click`, (e) => {
    e.preventDefault();

    welcomeScreen.classList.add(`hidden`);
    gameScreen.classList.remove(`hidden`);
    gameHeader.classList.add(`header2`);
    body.style.backgroundColor = `Black`;
    

    // game = new PurpleDoorGame;

    // game.task();
    // game.door();
});
