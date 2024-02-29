var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TDA | Home' });
});

/* GET lecturer page. */
router.get('/lecturer', function(req, res, next) {
  res.render('lecturer', { title: 'TDA | Lecturer' });
});

/* GET lecturer page. */
router.get('/lecturer/:uuid', function(req, res, next) {
  res.render('lecturer', { title: 'TDA | Lecturer', uuid: req.params.uuid });
});

router.get('/shrine', function(req, res, next) {
  res.render('shrine', { title: 'TDA | Meow 🐈' });
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'TDA | Dashboard' });
});

router.get('/dashboard/:uuid', function(req, res, next) {
  res.render('dashboard', { title: 'TDA | Dashboard', uuid: req.params.uuid });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'TDA | About' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'TDA | Log in' });
});

router.get('/form/:uuid', function(req, res, next) {
  res.render('form', { title: 'TDA | Form', uuid: req.params.uuid });
});

module.exports = router;
