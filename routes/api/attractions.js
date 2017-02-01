const express = require('express')
const router = express.Router();
const Sequelize = require('sequelize');
const Hotel = require('../../models/hotel');
const Restaurant = require('../../models/restaurant');
const Activity = require('../../models/activity');
const Place = require('../../models/place');

router.get('/hotels', (req, res, next) => {
  Hotel.findAll()
    .then((hotels) =>{
      console.log('hi in hotel route')
      res.json(hotels)
    }).catch(next)
})

router.get('/restaurants', (req, res, next) => {
   Restaurant.findAll()
    .then((restaurants) =>{
      res.json(restaurants)
    }).catch(next)
})

router.get('/activities', (req, res, next) => {
   Activity.findAll()
    .then((activities) =>{
      res.json(activities)
    }).catch(next)
})

module.exports = router;
