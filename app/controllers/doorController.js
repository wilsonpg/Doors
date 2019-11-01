const Doors = require('../model/doorModel.js');

exports.getColorCount = function(req, res) {
    Doors.getColorCount(function(err, count) {
  
      if (err){
        res.send(err);
      }
      res.json(count);
    });
  };

  exports.getColor = function(req, res) {
    Doors.getColor(req.params.color, function(err, color) {
      if (err){
        res.send(err);
      }
      res.json(color);
    });
  };

  exports.getRiddleCount = function(req, res) {
    Doors.getRiddleCount(function(err, count) {
  
      if (err){
        res.send(err);
      }
      res.json(count);
    });
  };

  exports.getRiddle = function(req, res) {
    Doors.getRiddle(req.params.riddle, function(err, riddle) {
      if (err){
        res.send(err);
      }
      res.json(riddle);
    });
  };