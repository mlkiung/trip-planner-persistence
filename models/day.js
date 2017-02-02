var Sequelize = require('sequelize');
var db = require('./_db');
var Hotel = db.models.hotel;
var Restaurant = db.models.restaurant;
var Activity = db.models.activity;

var Day = db.define('day', {
  number: {
    type: Sequelize.INTEGER
  }
}, {
  classMethods: {
    findAndSort: function(){
       return Day.findAll().then(function(days){
        days = days.sort(function(a,b){
          return a.number>b.number
        })
        return days;
       })
    }
  }
})

Day.belongsTo(Hotel)
Day.belongsToMany(Restaurant, {through: 'day_restaurant'});
Day.belongsToMany(Activity, {through: 'day_activity'});

module.exports = Day;
