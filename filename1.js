var express = require('express');
var app = express();

app.use(express.static('Notepad++'));

//////////////////////////////////////////////////   USER LOGIN   ///////////////////////////////////////////////////////////
app.get("/pro_get",function(req,res){
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://sayantanraut:12345@ds243325.mlab.com:43325/student24"

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("users").findOne({username:req.query.uname}, function(err, result) {
    if (err) throw err;
    if(req.query.uname==result.username && req.query.psw==result.password)
    {
	res.redirect("/afterlogin.html");
	
	app.put("/pro_get100",function(req,res){
		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://sayantanraut:12345@ds243325.mlab.com:43325/student24"
	
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			db.collection("books").findOne({username:"user1"}, function(err, result) {
				if (err) throw err;
				res.send(result.bookname);
			});
		});
	});
    
    }
    else
    {
    	res.redirect("/loginfail.html");
    }
    db.close();
  });

});
});

////////////////////////////////////////////////////   ADD BOOK   ///////////////////////////////////////////////////////////
app.get("/pro_get10",function(req,res){
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://sayantanraut:12345@ds243325.mlab.com:43325/student24"

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("users").findOne({username:req.query.username}, function(err, result) {
  if (err) throw err;
  if(req.query.username==result.username && req.query.password==result.password)
  {
  	db.collection("books").insertOne({username:req.query.username,password:req.query.password,bookname:req.query.Bookname}, function(err, res) {
    	if (err) throw err;
    	console.log("1 document inserted");
    	db.close();
  	});
  	res.redirect("/afteraddbook.html");
  }
  else
  {
  	res.redirect("/addbookfail.html");
  }
  db.close();
  });

});
});

/////////////////////////////////////////////////////   SIGN UP   ////////////////////////////////////////////////////////////
app.get("/pro_get1", function(req,res){

var MongoClient = require('mongodb').MongoClient;
var url="mongodb://sayantanraut:12345@ds243325.mlab.com:43325/student24"

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("users").findOne({username:"user1"}, function(err, user) {
  	 if(user.username==req.query.username)
 	 {
	  	console.log("insertion failed!");
		res.redirect("/signupfail.html");
	}
	else
	{
		db.collection("users").insertOne({username:req.query.username, password:req.query.password}, function(err, res) {
		if (err) throw err;
		console.log("1 user inserted");
		db.close();
		});
		res.redirect("/signupsuccess.html");
	  }
	  	
  db.close();
  });
});
});

	  
app.listen(8081,'127.0.0.1');