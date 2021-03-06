var db = require("../models");

module.exports = function (app) {
  // Get all events
  app.get("/api/search", function (req, res) {
    console.log("api/search/ was hit")
    db.events.findAll({
      //descending order
    }).then(function (results) {
      res.json(results);
    });
  });

  // specific event by price (free or not)
  app.get("/api/search/free", function (req, res) {
    console.log("api/search/free was hit")
    db.events.findAll({
      where: {
        cost: {
          $lte: 0
        }
      },
    }).then(function (results) {
      console.log(results);
      res.json(results);
    });
  });

    // specific event on date
    app.get("/api/search/date/:date", function (req, res) {
      console.log("api/search/date/:date was hit")
      db.events.findAll({
        where: {
          date: req.params.date
        }
      }).then(function (results) {
        res.json(results);
      });
    });  

  // specific event by price (free or not) AND date ????????????
  app.get("/api/search/free/:date", function (req, res) {
    console.log("api/search/results/:date was hit")
    db.events.findAll({
      where: {
        date: req.params.date,
        cost: {
          $lte: 0
        }
      },
    }).then(function (results) {
      res.json(results);
    });
  });

  // Create a new event

  app.post("/api/create", function (req, res) {
    console.log("Events:");
    console.log(req.body);
    console.log(db.events);

    db.events.create({
      name: req.body.name,
      type: req.body.type,
      date: req.body.date,
      time: req.body.time,
      description: req.body.description,
      location: req.body.location,
      cost: req.body.cost

    }).then(function (results) {
      res.json(results);
      console.log(results);
    });
  });
};
