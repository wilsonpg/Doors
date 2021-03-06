`use strict`;
const sql = require(`./db.js`);

const Doors = function(color){
    this.color = color
};

Doors.getColorCount = async function (result) {    
    await sql.execute(
        `SELECT COUNT(*) AS colors
        FROM colors;`,
        function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res[0]);
            }
    });           
};

Doors.getColor = async function (color, result){
    await sql.execute(
        `SELECT *
        FROM colors
        WHERE id = ${ color };`, 
        function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res[0]);
            }
    });   
}

Doors.getRiddleCount = async function (result) {
    await sql.execute(
        `SELECT COUNT(*) AS riddles
        FROM questions;`,
        function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res[0]);
            }
    });  
}

Doors.getRiddle = async function (riddle, result){
    await sql.execute(
        `SELECT 
        questions.text AS riddle,
        GROUP_CONCAT(answers.text SEPARATOR ', ') AS answerText,
        GROUP_CONCAT(answers.is_correct_answer SEPARATOR ', ') AS answerValidation
        FROM questions
        JOIN answers ON answers.question_id = questions.id
        WHERE questions.id = ${ riddle }
        GROUP BY questions.id;`, 
        function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res[0]);
            }
    });   
}

module.exports = Doors;