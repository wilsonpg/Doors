`use strict`;

const door1 = document.getElementById(`door1`);
const door2 = document.getElementById(`door2`);
const door3 = document.getElementById(`door3`);

export async function drawDoor(color, door){
    if(door == 1){
        const context = door1.getContext("2d");
        context.beginPath();
        context.rect(20, 20, 50, 100);
        context.fillStyle = color;
        context.fill();
        context.stroke();
    }
    else if(door == 2){
        const context = door2.getContext("2d");
        context.beginPath();
        context.rect(20, 20, 50, 100);
        context.fillStyle = color;
        context.fill();
        context.stroke();
    }
    else if(door == 3){
        const context = door3.getContext("2d");
        context.beginPath();
        context.rect(20, 20, 50, 100);
        context.fillStyle = color;
        context.fill();
        context.stroke();
    }
};