const express = require('express')
const router = express.Router();
const Sequelize = require('sequelize');
const Hotel = require('../../models/hotel');
const Restaurant = require('../../models/restaurant');
const Activity = require('../../models/activity');
const Place = require('../../models/place');
const Day = require('../../models/day');
const Promise = require('bluebird');
var db = require('../../models/_db');
const Day_Activity = db.models.day_activity;
const Day_Restaurant = db.models.day_restaurant;


//api/days
//get all the days
router.get('/', (req, res, next) => {
  // Day.findAndSort().then((sortedDays) => {
  //   res.json(sortedDays)
  // })
  Day.findAll({
    include: [Hotel, Restaurant, Activity],
    order: 'number ASC'
  })
    .then(function (days) {
      res.json(days);
    })
    .catch(next);
});
//get one day
router.get('/:num', (req, res, next) => {
  var num = +req.params.num
  Day.findOne({
    where: {
      number: num
    }
  }).then(function (day) {
    res.json(day);
  }).catch(next);
});

router.post('/:num/hotels/remove/:id', (req, res, next) => {
  Day.findOne({
    where: { number: req.params.num }
  }).then(function (day) {
    return day.setHotel(null);
  }).then(function (day) {
    res.json(day)
  }).catch(next);

});

//update
router.post('/:num/restaurants/:id', (req, res, next) => {
  Day.findOne({
    where: { number: req.params.num }
  }).then(function (day) {
    return Restaurant.findById(req.params.id)
      .then(function (restaurant) {
        return day.addRestaurant(restaurant)
      })
  }).then(function (restaurant) {
    res.json(restaurant);
  }).catch(next);

});

router.post('/:num/hotels/:id', (req, res, next) => {
  Day.findOne({
    where: { number: req.params.num }
  }).then(function(day){
    return Hotel.findById(req.params.id)
      .then(function(hotel){
        return day.setHotel(hotel)
      })
  }).then(function(finalHotel){
    res.json(finalHotel)
  }).catch(next)

});

router.post('/:num/activities/:id', (req, res, next) => {
  Day.findOne({
    where: { number: req.params.num }
  }).then(function(day){
    return Activity.findById(req.params.id)
      .then(function(activity){
        return day.addActivity(activity)
      })
  }).then(function(activity){
    res.json(activity)
  }).catch(next)
});

//creating a day
router.post('/', (req, res, next) => {
  Day.create({
    number: req.query.day
  })
    .then(function (day) {
      res.json(day);
    })
    .catch(next);
});

//delete
router.delete('/:num', function (req, res, next) {
  Day.findOne({
    where: {
      number: req.params.num
    }
  })
    .then(function (foundDay) {
     return foundDay.destroy();
      // res.json(foundDay);
    })
    .then(function () {
      return Day.findAll();
    })
    .then(function (days) {
      return Promise.map(days, function (day) {
        return day.update({
          number: days.indexOf(day) + 1
        });
      });
    })
    .then(function () {
      res.sendStatus(200);
    })
    .catch(next);
});



module.exports = router;
