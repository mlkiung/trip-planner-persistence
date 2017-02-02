'use strict';
/* global $ dayModule */

/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

var tripModule = (function () {

  // application state

  var days = [];
  var currentDay;

  // jQuery selections

  var $addButton, $removeButton;
  $(function () {
    $addButton = $('#day-add');
    $removeButton = $('#day-title > button.remove');
  });

  // method used both internally and externally

  function switchTo (newCurrentDay) {
    if (currentDay) currentDay.hide();
    currentDay = newCurrentDay;
    currentDay.show();
  }

 // ~~~~~~~~~~~~~~~~~~~~~~~
    // before calling `addDay` or `deleteCurrentDay` that update the frontend (the UI), we need to make sure that it happened successfully on the server
  // ~~~~~~~~~~~~~~~~~~~~~~~
  $(function () {
    $addButton.on('click', addDay);
    $removeButton.on('click', deleteCurrentDay);
  });



  // ~~~~~~~~~~~~~~~~~~~~~~~
    // `addDay` may need to take information now that we can persist days -- we want to display what is being sent from the DB
  // ~~~~~~~~~~~~~~~~~~~~~~~
  function addDay () {
    if (this && this.blur) this.blur(); // removes focus box from buttons
    //here we need to make an ajax request to MAKE a day. Return it.
    $.post('/api/days?day='+(days.length + 1))

      .then(function(createdDay){
        var newDay = dayModule.create(createdDay)
        days.push(newDay);
        if (days.length === 1) {
          currentDay = newDay;
        }
        switchTo(newDay);
      }).catch(console.error)


    //var newDay = dayModule.create({ number: days.length + 1 }); // dayModule
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~
    // Do not delete a day until it has already been deleted from the DB
  // ~~~~~~~~~~~~~~~~~~~~~~~
  function deleteCurrentDay () {
    // prevent deleting last day
    if (days.length < 2 || !currentDay) return;
    // remove from the collection
    var index = days.indexOf(currentDay),
      previousDay = days.splice(index, 1)[0],
      newCurrent = days[index] || days[index - 1];
    //remove the deleted day from the DB
    $.ajax({
      url:'/api/days/'+(index+1),
      type: 'DELETE'
    }).then(function(results){
      // fix the remaining day numbers
      console.log('deleted!',results)
      days.forEach(function (day, i) {
        day.setNumber(i + 1);
      })
      switchTo(newCurrent);
      previousDay.hideButton();
    }).catch(console.error)
  }

  // globally accessible module methods

  var publicAPI = {

    load: function () {

      $.get('/api/days')
        .then(function(databaseDays){
          if(!databaseDays.length){
            $(addDay)
          }else{
            days = dayModule.loadEnhancedDays(databaseDays)
            switchTo(days[0])
          }
        }).catch(console.error)

    },

    switchTo: switchTo,

    addToCurrent: function (attraction) {
      currentDay.addAttraction(attraction);
    },

    removeFromCurrent: function (attraction) {
      currentDay.removeAttraction(attraction);
    }

  };

  return publicAPI;

}());
