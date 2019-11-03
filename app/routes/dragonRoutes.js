'use strict';

module.exports = function Dragons(app) {
  const Dragons = require(`../controllers/dragonController`);
  
  // color routes
  app
    .route(`/user/attack/count`)
    .get(Dragons.getUserAttackCount, function(req, res){
      res.send();
    }),
  app
    .route(`/user/attack/info/:attacks`)
    .get(Dragons.getUserAttacks, function(req, res){
      res.send();
    }),
  app
    .route(`/dragon/attack/count`)
    .get(Dragons.getDragonAttackCount, function(req, res){
      res.send();
    }),
  app
    .route(`/dragon/attack/info/:attack`)
    .get(Dragons.getDragonAttack, function(req, res){
      res.send();
    });
}