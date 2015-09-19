var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var transaction = require('../models/transaction');
var users = require('../models/users'); //user and recipe models imported
var budgetprefs = require('../models/budgetprefs');
 var request = require('request');

router.get('/login', function(req, res) {
  var user_id = req.body.user_id;

  //get: /accounts/id/purchase
  //http://api.reimaginebanking.com/accounts/55e94a6cf8d8770528e6190a/purchases?key=d7d568706156d07aed570d9ae78d97ab

  var apiRequest = "http://api.reimaginebanking.com/accounts/" + user_id + "/purchases?key=d7d568706156d07aed570d9ae78d97ab" //includes api key at end
  request(apiRequest, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); //use the body
    body.forEach(function(purchase) {
    
    });
    }
  });

  

  }
});
   



