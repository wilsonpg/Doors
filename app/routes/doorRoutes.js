'use strict';

module.exports = function Doors(app) {
  const Doors = require(`../controllers/doorController`);
  
  // color routes
  app
    .route(`/colors`)
    .get(Doors.getColorCount, function(req, res){
      res.send();
    }),
  app
    .route(`/color/:color`)
    .get(Doors.getColor, function(req, res){
      res.send();
    }),
  app
    .route(`/riddles`)
    .get(Doors.getRiddleCount, function(req, res){
      res.send();
    })
  app
    .route(`/riddle/:riddle`)
    .get(Doors.getRiddle, function(req, res){
      res.send();
    });
}