// JavaScript source code
var express = require('express');
var router = express.Router();
var async = require('async');
var ObjectID = require('mongodb').ObjectID;
// MongoDB用ファイルを指定
var collection = require('../mongo');
var COL = 'beacons1mz';

// For Cross Origin
router.all('/*', function (req, res, next) {
    res.contentType('json');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// GET find
router.get('/', function (req, res) {
    collection(COL).find().toArray(function (err, docs) {
        res.send(docs);
    })
});

router.get('/latest', function (req, res, next) {
    async.waterfall([
      //コレクション取得, ビーコン一覧を取得
      function (callback) {
          var query = [{ "$group": { "_id": "$minor" } }];
          collection(COL).aggregate(query, function (err, minors) {
              callback(err, minors);
          });
      },
      //各ビーコンのデータを取得
      function (minors, callback) {
          //イテレーション関数
          var iterate = function (queue, results, callback0) {
              if (queue.length > 0) {
                  var minor = queue.shift();
                  collection(COL).findOne({ minor: minor }, { sort: { date: -1 } }, function (err, res) {
                      if (err) callback0(err);
                      delete res._id;
                      results.push(res);
                      iterate(queue, results, callback0);
                  });
              } else {
                  callback0(null, results);
              }
          };
          //イテレーションの呼び出し
          var emp = [];
          var queue = [];
          minors.forEach(function (val) { queue.push(val["_id"]); });
          iterate(queue, emp, callback);
      }
    //ターミネータ
    ], function (err, results) {
        if (err) next(err);
        res.json(results);
    });
});

// GET find :id
router.get('/:id', function (req, res) {
    collection(COL).findOne({ minor: parseInt(req.params.id, 10) }, {}, function (err, r) {
        res.send(r);
    });
});

// POST insert data
router.post('/', function (req, res) {
    collection(COL).insertOne(req.body).then(function (r) {
        res.send(r);
    });
});

// PUT update data
router.put('/:id', function (req, res) {
    collection(COL).findOneAndUpdate({ _id: new ObjectID(req.params.id) }, req.body, {}, function (err, r) {
        res.send(r);
    });
});

// DELETE remove data
router.delete('/:id', function (req, res) {
    collection(COL).findOneAndDelete({ _id: new ObjectID(req.params.id) }, {}, function (err, r) {
        res.send(r);
    });
});

module.exports = router;