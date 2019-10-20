`use strict`;

getCount(){
    /*
    SELECT COUNT(*)
    FROM questions;
    */
}

getQuestionAndAnswers(question => {
    /*
    Query database for random question and associated answers:

    SELECT * 
    FROM questions
    JOIN answers ON answers.question_id = questions.id
    WHERE questions.id = ${ question };
    */
});