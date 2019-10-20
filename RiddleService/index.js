`use strict`;

getQuestionAndAnswers(random => {
    /*
    Query database for random question and associated answers:

    SELECT * 
    FROM questions
    JOIN answers ON answers.question_id = questions.id
    WHERE id = ${ random };
    */
});