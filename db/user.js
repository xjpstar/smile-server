const client = require('mongodb').MongoClient;

//   GridStore = require('mongodb').GridStore,
//   ObjectID = require('mongodb').ObjectID,

//   var Db = require('mongodb').Db,
//   Mongos = require('mongodb').Mongos,
//   Server = require('mongodb').Server,
//   test = require('assert');
// // Connect using Mongos
// var server = new Server('localhost', 27017);
// var db = new Db('test', new Mongos([server]));
// db.open(function(err, db) {
//   // Get an additional db
//   db.close();
// });

client.connect(url, function(err, db){
  let user = db.user();
})