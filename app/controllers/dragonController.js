const Dragons = require('../model/dragonModel.js');

exports.getUserAttackCount = function(req, res) {
  Dragons.getUserAttackCount(function(err, count) {

    if (err){
      res.send(err);
    }
    res.json(count);
  });
};

exports.getUserAttacks = function(req, res) {
    Dragons.getUserAttacks(req.params.attacks, function(err, attacks) {
  
      if (err){
        res.send(err);
      }
      res.json(attacks);
    });
  };

  exports.getDragonAttackCount = function(req, res) {
    Dragons.getDragonAttackCount(function(err, count) {
  
      if (err){
        res.send(err);
      }
      res.json(count);
    });
  };

  exports.getDragonAttack = function(req, res) {
    Dragons.getDragonAttack(req.params.attack, function(err, attack) {
  
      if (err){
        res.send(err);
      }
      res.json(attack);
    });
  };