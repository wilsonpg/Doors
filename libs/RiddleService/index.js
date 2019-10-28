`use strict`;

let mysql = require(`mysql2/promise`);

let connectionObject = {
    host: `localhost`,
    user: `root`,
    password: `wilson`,
    database: `sys`
}

module.exports = async function getRiddleCount(){
    let rows;
    async function main() {
        // create the connection
        const connection = await mysql.createConnection(connectionObject);
        // query database
        [rows, fields] = await connection.execute(
            `SELECT *
            FROM questions;`);
      }
      await main();

      return rows;
};

module.exports = async function getQuestionAndAnswers(question){
    let rows;
    async function main() {
        // create the connection
        const connection = await mysql.createConnection(connectionObject);
        // query database
        [rows, fields] = await connection.execute(
            `SELECT DISTINCT questions.id,
            questions.text AS question,
            GROUP_CONCAT(answers.text SEPARATOR (', ')) AS answers
            FROM questions
            JOIN answers ON answers.question_id = questions.id
            WHERE questions.id = ${ question };`);
      }
      await main();

      return rows;
};