/**
 * node-mongodb‚ÌƒhƒLƒ…ƒƒ“ƒg
 * http://mongodb.github.io/node-mongodb-native/2.1/
 */
var db;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://150.89.234.253:27017/myproject-room';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, mongodb) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db = mongodb;
});

var collection = function( name ) {
  return db.collection( name );
}

module.exports = collection;