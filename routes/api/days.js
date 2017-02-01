const express = require('express')
const router = express.Router();
const Sequelize = require('sequelize');
const Hotel = require('../../models/hotel');
const Restaurant = require('../../models/restaurant');
const Activity = require('../../models/activity');
const Place = require('../../models/place');
const Day = require('../../models/day');

//get all the days
router.get('/', (req, res, next) => {
  Day.findAll().then(function (days) {
    res.json(days)
  }).catch(next)
});
//get one day
router.get('/:num', (req, res, next) => {
  var num = +req.params.num
  Day.findOne({
    where: {
      day: num
    }
  }).then(function (day) {
    res.json(day);
  }).catch(next);
});
//update
router.post('/', (req, res, next) => {
  Day.create({
    day: req.query.day
  })
    .then(function (day) {
      res.json(day);
    })
    .catch(next);
});

router.post('/:num/restaurants', (req, res, next) => {


});

router.post('/:num/hotels', (req, res, next) => {

});

router.post('/:num/activities', (req, res, next) => {

});

//creating a day

//delete
router.delete('/:num', function (req, res, next) {
  Day.findOne({
    where: {
      day: req.params.num
    }
  })
    .then(function (foundDay) {
      res.json(foundDay);
    })
    .catch(next);
});



module.exports = router;
