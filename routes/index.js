var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET lecturer page. */
router.get('/lecturer', function(req, res, next) {
  res.render('lecturer', { title: 'Express' });
});

/* GET lecturer page. */
router.get('/lecturer/:uuid', function(req, res, next) {
  res.render('lecturer', { uuid: req.params.uuid });
});

router.get('/shrine', function(req, res, next) {
  res.render('shrine', { title: 'Express' });
});

module.exports = router;
