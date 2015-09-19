var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var transaction = require('../models/transaction');
var users = require('../models/users'); //user and recipe models imported

var isLoggedIn = function(req, res, next) {
  //if the user is logged in, call next() to request the next request handler
  //Passport adds this method to request an object
  //middleware allowed to add properties to request and response objects
  if (req.isAuthenticated())
    return next();
  //If not logged in session, redirect to the home page
  res.redirect('/');
}

var isAdmin = function(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.username==='deepti')
      return next();
  } 
  res.redirect('/');
}


module.exports = function(passport) {
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('home');
  });




router.post('/new_tag', function(req, res) {
    // store itthe submitted recipe
    console.log('this is a post request to add tags to transactions');
    //console.log(req.body.dish_type, 'dish_type')
    var newTag = new transaction.Transaction({
      transaction_id: req.body.transaction_id, //CapitalOne Id for bill, deposit, etc.
      description: req.body.description,
      amount: req.body.amount,
      date: req.body.date,
      tag: req.body.tag
    });
    //console.log(req.body.steps, 'steps');
    //console.log(req.body.ingredients, 'ingredients');

    newTag.save(function(err, result) {
      if (err)
        console.log('something with saving going wrong', err);
      //console.log(result);
      //console.log(req.user.recipe_list)
      users.User.findOneAndUpdate(
        {_id:req.user._id}, 
        {$push: {recipe_list: result._id}}, 
        function () {
          console.log('trying to save the new marker')
          newMarker.save(function(err, result2) {
            if (err)
              console.log('what is going on savign marker', err)
            //console.log('result 2', result2);
            res.redirect('/new_tag');  
          });
      });
    });
  });



