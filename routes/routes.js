var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var transaction = require('../models/transaction');
var users = require('../models/users'); //user and recipe models imported
var budgetprefs = require('../models/budgetprefs');
 var request = require('request');

router.get('/login', function(req, res) {
  var userID = req.body.user_id;

  //get: /accounts/id/purchase
  //http://api.reimaginebanking.com/accounts/55e94a6cf8d8770528e6190a/purchases?key=504b6724f21e8161fc5b1ddbcb07a55d

  var apiRequest = "http://api.reimaginebanking.com/accounts/" + userID + "/purchases?key=504b6724f21e8161fc5b1ddbcb07a55d" //includes api key at end
  request(apiRequest, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); //use the body
    var transactionArray= []
    //amount added or subtracted, date, title, 
    body.forEach(function(purchase) {
      purchaseID = purchase._id;
      purchaseDate = purchase.purchase_date;
      purchaseAmt = purchase.amount
      purchaseItem = purchase.description;
      transactionObj =  {
        id: purchaseID,
        date: purchaseDate,
        amt: purchaseAmt,
        item: purchaseItem
      }
      transactionArray.push(transactionObj);
    });

    //now get all the budget restrictions associated with ths user
     mongoose.model('BudgetPref').find({_id: userID}, 
      function(err, budgetPrefs){
      if (err) {
        console.log('error in finding budget prefs associated with user', err);
      }
      var budgetArray = []
      budgetPrefs.forEach(function(budgetPref) {
        budgetDic =  {
          userID: budgetPref.userID,
          item: budgetPref.item,
          max: budgetPref.monthlyMax
        }
        budgetArray.push(budgetDic);
      });

      console.log('purchase array', purchaseArray)
      console.log('transaction array', transactionArray)

      res.json({
        purchaseArray: transactionArray,
        budgetArray: budgetArray
      });
    });
    }
  });
  }
});

router.post('/addTransaction', function(req, res) {
  var transactionID = req.body.transactionID;
  var userID = req.body.userID;
  var tag = req.body.tag;
  //"http://api.reimaginebanking.com/purchases/55fde3b3ce1cef140015e2c7?key=504b6724f21e8161fc5b1ddbcb07a55d"
  var apiRequest = "http://api.reimaginebanking.com/purchases/" + transactionID + "?key=504b6724f21e8161fc5b1ddbcb07a55d";
    request(apiRequest, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) 
      transactionInfo = body[0];

      var newTransaction = transaction.Transaction({
        transaction_id: transactionInfo._id, //CapitalOne Id for bill, deposit, etc.
        description: transactionInfo.description,
        amount: transactionInfo.amount,
        date: transactionInfo.purchase_date,
        tag: [tag]
      });

      newTransaction.save(function(err, result) {
        if (err) {
          console.log("wahhhh");
        }
      });
      req.json( {
        adding: true
      })


    } else {
      res.json( {
        adding: true
      })

    }
  });


});

router.post('/updateTransaction', function(req, res) {
  var tag = req.body.tag;
  var transactionID = req.body.transactionID;
  transaction.Transaction.findOneAndUpdate(
        {transaction_id:transactionID}, 
        {$push: {tag: tag}}, 
        function (err, result) {
          if (err) {
            res.json({
               updated: false
            });

          } else {
            console.log('trying to save the added tag')
            res.json({
               updated: true
            });

          }
          
          
      });

});



   



