`use strict`;

//html dom elements
const body = document.getElementById(`body`);

const welcomeScreen = document.getElementById(`welcomeScreen`);
const startButton = document.getElementById(`startButton`);

const gameScreen = document.getElementById(`gameScreen`);
const gameHeader = document.getElementById(`gameHeader`);

const promptLabel = document.getElementById(`promptLabel`);
const lifeOne = document.getElementById(`lifeOne`);
const lifeTwo = document.getElementById(`lifeTwo`);
const lifeThree = document.getElementById(`lifeThree`);
const answerLabel1 = document.getElementById(`answerLabel1`);
const answerLabel2 = document.getElementById(`answerLabel2`);
const answerLabel3 = document.getElementById(`answerLabel3`);

const door1 = document.getElementById(`door1`);
const door2 = document.getElementById(`door2`);
const door3 = document.getElementById(`door3`);

const dragonScreen = document.getElementById(`dragonScreen`);

const dragonMoveLabel = document.getElementById(`dragonMoveLabel`);
const userMoveLabel = document.getElementById(`userMoveLabel`);
const fightButton = document.getElementById(`fightButton`);
const dragonMove = document.getElementById(`dragonMove`);

const moveOne = document.getElementById(`moveOne`);
const moveTwo = document.getElementById(`moveTwo`);
const moveThree = document.getElementById(`moveThree`);

const dragon = document.getElementById(`dragon`);
const user = document.getElementById(`user`);

const victoryScreen = document.getElementById(`victoryScreen`);
const treasure = document.getElementById(`treasure`);
const playAgainVictory = document.getElementById(`playAgainVictory`);

const loserScreen = document.getElementById(`loserScreen`);
const playAgainLost = document.getElementById(`playAgainLost`);
const loserHeader = document.getElementById(`loserHeader`);

//initialized variable for site visit
 let usedRiddles = [], purpleDoorGame, colors = [], lives = [1, 2, 3], userAttacks;

 let dragonGame;

 let dragonImage = new Image();
 dragonImage.src = `./dragon.png`;
 let userImage = new Image();
 userImage.src = `./wizard.png`;
 let lifeImage = new Image();
 lifeImage.src = `./heart.png`;
 let treasureImage = new Image();
 treasureImage.src = `./treasure.png`;
 
 class DragonGame{
     constructor() {
     }
 
     drawDragon(){
         const context = dragon.getContext("2d");
         context.drawImage(dragonImage, 0, 0);
     }

     drawUser(){
        const context = user.getContext("2d");
        context.drawImage(userImage, 0, 0);
    }

    pageSetup(){
        fightButton.classList.remove(`button`);
        fightButton.classList.add(`hidden`);
        moveOne.classList.remove(`hidden`);
        moveOne.classList.add(`button`);
        moveTwo.classList.remove(`hidden`);
        moveTwo.classList.add(`button`);
        moveThree.classList.remove(`hidden`);
        moveThree.classList.add(`button`);
        userMoveLabel.innerHTML = `Above are the possible moves for defending against the dragon.
        Each attack has a damage number which is specified in parentheses () as well as a hidden resistance percentage based on both element and power.
        As a general rule, the higher the damage, the higher the likelihood that the attack is resisted.  Choose wisely.`;
        dragonMoveLabel.innerHTML = ``;
    }

    dragonMoveSetup(){
        moveOne.classList.remove(`hidden`);
        moveOne.classList.add(`button`);
        moveTwo.classList.remove(`hidden`);
        moveTwo.classList.add(`button`);
        moveThree.classList.remove(`hidden`);
        moveThree.classList.add(`button`);
        dragonMove.classList.remove(`button`);
        dragonMove.classList.add(`hidden`);
        userMoveLabel.innerHTML = ``;
    }

     async getUserAttack(){
        return new Promise(async (resolve, reject) => {
            const userAttackCountResponse = await fetch(`http://localhost:${ process.env.PORT }/user/attack/count`);
            let userAttackCount = await userAttackCountResponse.json();

            let attacks = [];
            for(let i = 0; i < 3; i += 1){
                let randomAttack = Math.floor((Math.random() * userAttackCount.userAttacks) + 1);

                if(!attacks.find(a => a == randomAttack)){
                    attacks.push(randomAttack);
                }
                else{
                    i -= 1;
                }
            }

            const response = await fetch(`http://localhost:${ process.env.PORT }/user/attack/info/` + attacks);
            const userAttacks = await response.json();
    
            resolve(userAttacks);
        });
     }

     async getDragonAttack(){
        return new Promise(async (resolve, reject) => {
            const dragonAttackCountResponse = await fetch(`http://localhost:${ process.env.PORT }/dragon/attack/count`);
            let dragonAttackCount = await dragonAttackCountResponse.json();

            let randomAttack = Math.floor((Math.random() * dragonAttackCount.dragonAttacks) + 1);

            const response = await fetch(`http://localhost:${ process.env.PORT }/dragon/attack/info/` + randomAttack);
            const dragonAttack = await response.json();
    
            resolve(dragonAttack);
        });
     }

     async setUserMoves(userAttacks){
        moveOne.innerHTML = userAttacks[0].text + ` (` + userAttacks[0].damage + `)`;
        moveOne.style.background = userAttacks[0].element_color;

        moveTwo.innerHTML = userAttacks[1].text + ` (` + userAttacks[1].damage + `)`;
        moveTwo.style.background = userAttacks[1].element_color;

        moveThree.innerHTML = userAttacks[2].text + ` (` + userAttacks[2].damage + `)`;
        moveThree.style.background = userAttacks[2].element_color;
     }

     moveSetup(){
        moveOne.classList.add(`hidden`);
        moveOne.classList.remove(`button`);
        moveTwo.classList.add(`hidden`);
        moveTwo.classList.remove(`button`);
        moveThree.classList.add(`hidden`);
        moveThree.classList.remove(`button`);
        dragonMove.classList.remove(`hidden`);
        dragonMove.classList.add(`button`);
     }

     checkIfResisted(resist_percentage){
        let randomNumber = Math.random();
        if(randomNumber <= resist_percentage){
            return true;
        }
        else{
            return false;
        }
     }

     victoryScreen(){
        dragonScreen.classList.add(`hidden`);
        victoryScreen.classList.remove(`hidden`);
        body.style.backgroundColor = `Magenta`;
        const context = treasure.getContext("2d");
        context.drawImage(treasureImage, 0, 0);
     }

     restartGame(){
        dragonScreen.classList.add(`hidden`);
        loserScreen.classList.remove(`hidden`);
        loserHeader.classList.add(`header2`);
     }
 }

//game class
class PurpleDoorGame {

    constructor() {
        this.answers = []
    }

    displayLives(){
        const context1 = lifeOne.getContext("2d");
        context1.drawImage(lifeImage, 0, 0);

        const context2 = lifeTwo.getContext("2d");
        context2.drawImage(lifeImage, 0, 0);

        const context3 = lifeThree.getContext("2d");
        context3.drawImage(lifeImage, 0, 0);
    }

    showGame() {
        welcomeScreen.classList.add(`hidden`);
        gameScreen.classList.remove(`hidden`);
        gameHeader.classList.add(`header2`);
        body.style.backgroundColor = `Black`;
    }

    restartGame(){
        loserScreen.classList.remove(`hidden`);
        gameScreen.classList.add(`hidden`);
        loserHeader.classList.add(`header2`);
    }

    async task() {
        return new Promise(async (resolve, reject) => {
            //length of total riddles I've added so that application doesnt crash when it runs out
            if(usedRiddles.length == 20){
                usedRiddles = [];
            }
            let riddleCount = await this.getRiddleCount();

            let riddle;
            for(let i = 0; i < 1; i++){
                riddle = await this.getRiddle(riddleCount);

                if(usedRiddles.find(ur => { return ur.text == riddle.riddle })){
                    i -= 1;
                }
            }
            let usedRiddle = {
                text: riddle.riddle
            }
            usedRiddles.push(usedRiddle);

            let riddleText = riddle.riddle;
            let answerText = riddle.answerText.split(`, `);
            let correctAnswer = riddle.answerValidation.split(`, `);

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
        const response = await fetch(`http://localhost:${ process.env.PORT }/riddles`);
        const riddleCount = await response.json();

        resolve(riddleCount.riddles);
        });
    }

    async getRiddle(riddleCount) {
            return new Promise(async (resolve, reject) => {
                let randomRiddle = Math.floor((Math.random() * riddleCount) + 1);
                const response = await fetch(`http://localhost:${ process.env.PORT }/riddle/` + randomRiddle);
                const riddleObject = await response.json();

                resolve(riddleObject);
            });
    }

    async getColorCount() {
        return new Promise(async (resolve, reject) => {
        const response = await fetch(`http://localhost:${ process.env.PORT }/colors`);
        const colorCount = await response.json();

        resolve(colorCount.colors);
        });
    }

    async getColor(color) {
        return new Promise(async (resolve, reject) => {
            let randomColor = Math.floor((Math.random() * color) + 1);
            const response = await fetch(`http://localhost:${ process.env.PORT }/color/` + randomColor);
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
            context.rect(100, 20, 150, 300);
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
            context.fillText(answers[answerIndex].text, 100, 350);
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
            context.fillText(answers[answerIndex].text, 100, 350);
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
            context.fillText(answers[answerIndex].text, 100, 350);
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

    enterPurpleDoor(){
        gameScreen.classList.add(`hidden`);
        dragonScreen.classList.remove(`hidden`);
        dragonGame = new DragonGame();
        dragonGame.drawDragon();
        dragonGame.drawUser();
    }
}

startButton.addEventListener(`click`, async (e) => {
    e.preventDefault();

    purpleDoorGame = new PurpleDoorGame;

    purpleDoorGame.displayLives();

    let totalColors = await purpleDoorGame.getColorCount();

    colors = [];
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

        colors = [];
        for (i = 0; i < 3; i++){
            let color = await purpleDoorGame.getColor(totalColors);
            colors.push(color);
        }
        let answers = await purpleDoorGame.task();

        purpleDoorGame.createDoors(colors, answers);
    }
    else{
        if(lives.length > 1){
            if(lives.length == 3){
                lifeThree.classList.add(`hidden`);
                lives.splice(2, 1);
            }
            else if(lives.length == 2){
                lifeTwo.classList.add(`hidden`);
                lives.splice(1, 1);
            }
        }
        else if(lives.length == 1){
            purpleDoorGame = new PurpleDoorGame;

            //take to loser screen prompt to try again
            purpleDoorGame.restartGame();
        }
    }
    
});

door2.addEventListener(`click`, async (e) => {
    e.preventDefault();

    if(colors.find(c => c.is_purple_door == 1)){
        //purple door end screen stuff
        purpleDoorGame.enterPurpleDoor();
    }
    else if(purpleDoorGame.checkForCorrect(1)){
        //generate new page
        purpleDoorGame = new PurpleDoorGame;

        let totalColors = await purpleDoorGame.getColorCount();

        colors = [];
        for (i = 0; i < 3; i++){
            let color = await purpleDoorGame.getColor(totalColors);
            colors.push(color);
        }

        let answers = await purpleDoorGame.task();

        purpleDoorGame.createDoors(colors, answers);
    }
    else{
        if(lives.length > 1){
            if(lives.length == 3){
                lifeThree.classList.add(`hidden`);
                lives.splice(2, 1);
            }
            else if(lives.length == 2){
                lifeTwo.classList.add(`hidden`);
                lives.splice(1, 1);
            }
        }
        else if(lives.length == 1){
            purpleDoorGame = new PurpleDoorGame;

            //take to loser screen prompt to try again
            purpleDoorGame.restartGame();
        }
    }
});

door3.addEventListener(`click`, async (e) => {
    e.preventDefault();

    if(purpleDoorGame.checkForCorrect(2)){
        //generate new page
        purpleDoorGame = new PurpleDoorGame;

        let totalColors = await purpleDoorGame.getColorCount();

        colors = [];
        for (i = 0; i < 3; i++){
            let color = await purpleDoorGame.getColor(totalColors);
            colors.push(color);
        }
        let answers = await purpleDoorGame.task();

        purpleDoorGame.createDoors(colors, answers);
    }
    else{
        if(lives.length > 1){
            if(lives.length == 3){
                lifeThree.classList.add(`hidden`);
                lives.splice(2, 1);
            }
            else if(lives.length == 2){
                lifeTwo.classList.add(`hidden`);
                lives.splice(1, 1);
            }
        }
        else if(lives.length == 1){
            purpleDoorGame = new PurpleDoorGame;

            //take to loser screen prompt to try again
            purpleDoorGame.restartGame();
        }
    }
    
});

fightButton.addEventListener(`click`, async (e) => {
    e.preventDefault();

    dragonGame.pageSetup();
    
    userAttacks;
    userAttacks = await dragonGame.getUserAttack();
    
    await dragonGame.setUserMoves(userAttacks);
});

moveOne.addEventListener(`click`, (e) => {
    e.preventDefault();

    dragonGame.moveSetup();

    let resisted = dragonGame.checkIfResisted(userAttacks[0].resist_percentage);

    if(!resisted){
        userMoveLabel.innerHTML = `Your ` + userAttacks[0].text + ` attack dealt ` + userAttacks[0].damage + ` damage!`;
        dragonHealth.value = dragonHealth.value - userAttacks[0].damage;
    }
    else{
        userMoveLabel.innerHTML = `Oh no! Your ` + userAttacks[0].text + ` attack was resisted and dealt no damage!`;
    }

    if(dragonHealth.value == 0){
        dragonGame.victoryScreen();
    }
    else{
        dragonMoveLabel.innerHTML = ``;
    }
});

moveTwo.addEventListener(`click`, (e) => {
    e.preventDefault();

    dragonGame.moveSetup();

    let resisted = dragonGame.checkIfResisted(userAttacks[1].resist_percentage);

    if(!resisted){
        userMoveLabel.innerHTML = `Your ` + userAttacks[1].text + ` attack dealt ` + userAttacks[1].damage + ` damage!`;
        dragonHealth.value = dragonHealth.value - userAttacks[1].damage;
    }
    else{
        userMoveLabel.innerHTML = `Oh no! Your ` + userAttacks[1].text + ` attack was resisted and dealt no damage!`;
    }

    if(dragonHealth.value == 0){
        dragonGame.victoryScreen();
    }
    else{
        dragonMoveLabel.innerHTML = ``;
    }
});

moveThree.addEventListener(`click`, (e) => {
    e.preventDefault();

    dragonGame.moveSetup();

    let resisted = dragonGame.checkIfResisted(userAttacks[2].resist_percentage);

    if(!resisted){
        userMoveLabel.innerHTML = `Your ` + userAttacks[2].text + ` attack dealt ` + userAttacks[2].damage + ` damage!`;
        dragonHealth.value = dragonHealth.value - userAttacks[2].damage;
    }
    else{
        userMoveLabel.innerHTML = `Oh no! Your ` + userAttacks[2].text + ` attack was resisted and dealt no damage!`;
    }

    if(dragonHealth.value == 0){
        dragonGame.victoryScreen()
    }
    else{
        dragonMoveLabel.innerHTML = ``;
    }
});

dragonMove.addEventListener(`click`, async (e) => {
    e.preventDefault();

    let dragonAttack = await dragonGame.getDragonAttack();

    let resisted = dragonGame.checkIfResisted(dragonAttack.resist_percentage);

    if(!resisted){
        dragonMoveLabel.innerHTML = `The dragon's ` + dragonAttack.text + ` attack dealt ` + dragonAttack.damage + ` damage!`;
        userHealth.value = userHealth.value - dragonAttack.damage;
    }
    else{
        dragonMoveLabel.innerHTML = `Nice!  The dragon's ` + dragonAttack.text + ` attack was resisted and dealt no damage!`;
    }

    if(userHealth.value == 0){
        //take to loser screen prompt to try again
        dragonGame.restartGame();
    }
    else{
        dragonGame.dragonMoveSetup();
    
        userAttacks;
        userAttacks = await dragonGame.getUserAttack();
        
        await dragonGame.setUserMoves(userAttacks);
    }
});

playAgainVictory.addEventListener(`click`, (e) => {
    e.preventDefault();

    location.reload();
});

playAgainLost.addEventListener(`click`, (e) => {
    e.preventDefault();

    location.reload();
});