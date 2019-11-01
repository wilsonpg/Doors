'use strict';

module.exports = function Dragons(app) {
  const Dragons = require(`../controllers/dragonController`);
  
  // color routes
  app
    .route(`/user/attacks`)
    .get(Dragons.getUserAttacks, function(req, res){
      res.send();
    });
}