const Dragons = require('../model/dragonModel.js');

exports.getUserAttacks = function(req, res) {
    Dragons.getUserAttacks(req.params.attacks, function(err, attacks) {
  
      if (err){
        res.send(err);
      }
      res.json(attacks);
    });
  };