var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({api:'Ikrili API' });
});

module.exports = router;
