var db = require("../models");
module.exports = function (app) {
  // Find all Records and return them to the user with res.json
  app.get("/api/records", function (req, res) {
    db.sequelize.query("select Username, Artist, Album, Year, WillingToTrade from Records r inner join Users u on u.id = r.UserId", { type: db.Sequelize.QueryTypes.SELECT })
      .then(function (dbRecord) {
        res.json(dbRecord);
      });
  });

  // Find all Records by Artist and return them to the user with res.json
  app.get("/api/records/artist/:artist", function (req, res) {
    db.sequelize.query("SELECT Username, Artist, Album, Year, WillingToTrade FROM Records r inner join Users u on u.id = r.UserId WHERE r.Artist='" + req.params.artist + "'", { type: db.Sequelize.QueryTypes.SELECT })
      .then(function (dbRecord) {
        res.json(dbRecord);
      });
  });

  // Find all Records by Album and return them to the user with res.json
  app.get("/api/records/album/:album", function (req, res) {
    db.sequelize.query("select Username, Artist, Album, Year, WillingToTrade from Records r inner join Users u on u.id = r.UserId Where r.Album = '" + req.params.album + "'", { type: db.Sequelize.QueryTypes.SELECT }).
      then(function (dbRecord) {
        res.json(dbRecord);
      });
  });

  // Get all record information by User
  app.get("/api/User/id/:id", function (req, res) {
    db.sequelize.query("select Username, Artist, Album, Year, WillingToTrade from Users u inner join Records r on u.id = r.UserId Where u.id=" + req.params.id, { type: db.Sequelize.QueryTypes.SELECT }).
      then(function (data) {
        res.json(data);
      });
  });

  // Get all record information by Current User
  app.get("/api/User/id", function (req, res) {
    db.sequelize.query("select Username, Artist, Album, Year, WillingToTrade from Users u inner join Records r on u.id = r.UserId Where u.id=" + req.user.id, { type: db.Sequelize.QueryTypes.SELECT }).
      then(function (data) {
        res.json(data);
      });
  });

  // Get Albums that are willing to trade with userId
  app.get("/api/WillingToTrade", function (req, res) {
    db.sequelize.query("select Username, Artist, Album, Year, WillingToTrade from Records r inner join Users u on u.id = r.UserId Where WillingToTrade=1", { type: db.Sequelize.QueryTypes.SELECT }).
      then(function (data) {
        res.json(data);
      });
  });

  // Post Record to Record collection
  app.post("/api/addRecord", function (req, res) {
    console.log(req.body);
    db.Record.create({
      Artist: req.body.Artist,
      Album: req.body.Album,
      Year: req.body.Year,
      WillingToTrade: req.body.WillingToTrade,
      UserId: req.user.id
    });
      // .then(function (data) {
      //   res.json(data);
      // });
  });

  //Delete Album
  app.delete("/api/records/delete/:id", function (req, res) {
    db.Record.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbRecord) {
      res.json(dbRecord);
    });
  });
};
