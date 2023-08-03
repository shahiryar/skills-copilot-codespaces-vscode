//create web server
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

//GET
router.get('/comments', function(req, res, next) {
  Comment.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});

//POST
router.post('/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment){
    if(err){ return next(err); }
    res.json(comment);
  });
});

//PRELOAD
router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }
    req.comment = comment;
    return next();
  });
});

//GET
router.get('/comments/:comment', function(req, res) {
  res.json(req.comment);
});

//PUT
router.put('/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});

//DELETE
router.delete('/comments/:comment', function(req, res) {
  console.log("in delete");
  req.comment.remove();
  res.sendStatus(200);
});

//EXPORT
module.exports = router;