const express = require('express');
let router = new express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: req.user});
});

module.exports = router;
