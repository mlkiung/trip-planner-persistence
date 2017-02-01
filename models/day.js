var Sequelize = require('sequelize');
var db = require('./_db');
var Hotel = db.models.hotel;
var Restaurant = db.models.restaurant;
var Activity = db.models.activity;

var Day = db.define('day', {
  day: {
    type: Sequelize.INTEGER
  }
})

Day.belongsTo(Hotel)
Day.belongsToMany(Restaurant, {through: 'day_restaurant'});
Day.belongsToMany(Activity, {through: 'day_activity'});

module.exports = Day;
