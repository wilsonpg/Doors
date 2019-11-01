`use strict`;
const sql = require(`./db.js`);

const Dragons = function(){
};

Dragons.getUserAttacks = async function (attacks, result){
    await sql.execute(
        `SELECT *
        FROM user_attacks
        JOIN attack_types ON attack_types.id = user_attacks.attack_type_id
        WHERE user_attacks.id IN ${ attacks };`, 
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