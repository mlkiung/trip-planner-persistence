const express = require('express')
const router = express.Router();
const Sequelize = require('sequelize');
const Hotel = require('../../models/hotel');
const Restaurant = require('../../models/restaurant');
const Activity = require('../../models/activity');
const Place = require('../../models/place');
const Day = require('../../models/day');

//get a;; the days
router.get('/', (req, res, next) => {
  // Day.findAl().then(function(days){
  //   res.json(days)
  // }).catch(next)
})
//get one day
router.get('/:num', (req, res, next) => {
//   Day.findOne({
//     where: {
//       number: req.params.num;
//     }
//   }).then(function(day){
//     res.json(day)
//   }).catch(next)
})
//update
router.post('/:num/restaurants', (req, res, next) => {


})

router.post('/:num/hotels', (req, res, next) => {

})

router.post('/:num/activities', (req, res, next) => {

})

//creating a day
router.post('/', (req, res, next) => {

})

//delete
router.delete('/:num', function(req, res, next){

})



module.exports = router;
