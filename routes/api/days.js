const express = require('express')
const router = express.Router();
const Sequelize = require('sequelize');
const Hotel = require('../../models/hotel');
const Restaurant = require('../../models/restaurant');
const Activity = require('../../models/activity');
const Place = require('../../models/place');
const Day = require('../../models/day');


//api/days
//get all the days
router.get('/', (req, res, next) => {
  Day.findAndSort().then((sortedDays) => {
    res.json(sortedDays)
  })
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

//update
router.post('/:num/restaurants/:id', (req, res, next) => {


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
      res.json(foundDay);
    })
    .catch(next);
});



module.exports = router;
