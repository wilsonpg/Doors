`use strict`;
const sql = require(`./db.js`);

const Dragons = function(){
};

Dragons.getUserAttackCount = async function (result) {
    await sql.execute(
        `SELECT COUNT(*) AS userAttacks
        FROM user_attacks;`,
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

Dragons.getUserAttacks = async function (attacks, result){
    await sql.execute(
        `SELECT user_attacks.text,
        user_attacks.damage,
        user_attacks.resist_percentage,
        attack_types.element_color
        FROM user_attacks
        JOIN attack_types ON attack_types.id = user_attacks.attack_type_id
        WHERE user_attacks.id IN (${ attacks });`, 
        function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
    });   
}

Dragons.getDragonAttackCount = async function (result) {
    await sql.execute(
        `SELECT COUNT(*) AS dragonAttacks
        FROM dragon_attacks;`,
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

Dragons.getDragonAttack = async function (attack, result){
    await sql.execute(
        `SELECT text,
        damage,
        resist_percentage
        FROM dragon_attacks
        WHERE id = ${ attack };`, 
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

module.exports = Dragons;