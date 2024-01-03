var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const crypto = require("crypto");
const sqlite3 = require('sqlite3').verbose();
const fs = require("node:fs");
const internal = require('stream');
if(!fs.existsSync(path.join(__dirname, 'data'))){
  fs.mkdirSync(path.join(__dirname, 'data'));
}
const db = new sqlite3.Database(path.join(__dirname, 'data','db.sqlite'));

var router = express.Router();

router.use(bodyParser.json());
var sql = `
CREATE TABLE lecturer(
  UUID VARCHAR(36) PRIMARY KEY,
  title_before,
  first_name,
  middle_name,
  last_name,
  title_after,
  picture_url,
  location,
  claim,
  bio,
  tags,
  price_per_hour INTEGER,
  contact
  )
`
db.run(sql)

// api
router.get('/', function(req, res, next) {
  res.status(200).json({ secret: "The cake is a lie" });
});

// api/lecturers
router.post('/lecturers', function(req, res, next) {
  try {
    var {
      UUID,
      title_before,
      first_name,
      middle_name,
      last_name,
      title_after,
      picture_url,
      location,
      claim,
      bio,
      tags,
      price_per_hour,
      contact
    } = req.body
    sql = `INSERT INTO lecturer(
      UUID,
      title_before,
      first_name,
      middle_name,
      last_name,
      title_after,
      picture_url,
      location,
      claim,
      bio,
      tags,
      price_per_hour,
      contact
      ) VALUES (?,?,?,?,?,?,?,?,?,?,json(?),?,json(?))`
    if (UUID == null) UUID = crypto.randomUUID()
    for (var x = 0; x < tags.length; x++) {
      tags[x] = { uuid: crypto.randomUUID(), name: tags[x].name }
    }
    db.run(sql, [
      UUID,
      title_before,
      first_name,
      middle_name,
      last_name,
      title_after,
      picture_url,
      location,
      claim,
      bio,
      JSON.stringify(tags),
      price_per_hour,
      JSON.stringify(contact)
    ], (err) => {
      if (err) return console.error(err)
      console.log("saved:", UUID, first_name, middle_name, last_name, tags, contact)
    })
    return res.json({
      status: 200,
      success: true,
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    })
  }
});

router.put('/lecturers/:uuid', function(req, res, next) {
  try {
    var {
      title_before,
      first_name,
      middle_name,
      last_name,
      title_after,
      picture_url,
      location,
      claim,
      bio,
      tags,
      price_per_hour,
      contact
    } = req.body
    sql = `UPDATE lecturer SET `
    if (title_before != null) { sql += `title_before = '${title_before}', ` }
    if (first_name != null) { sql += `first_name = '${first_name}', ` }
    if (middle_name != null) { sql += `middle_name = '${middle_name}', ` }
    if (last_name != null) { sql += `last_name = '${last_name}', ` }
    if (title_after != null) { sql += `title_after = '${title_after}', ` }
    if (picture_url != null) { sql += `picture_url = '${picture_url}', ` }
    if (location != null) { sql += `location = '${location}', ` }
    if (claim != null) { sql += `claim = '${claim}', ` }
    if (bio != null) { sql += `bio = '${bio}', ` }
    if (tags != null) { sql += `tags = json('${JSON.stringify(tags)}'), ` }
    if (price_per_hour != null) { sql += `price_per_hour = '${price_per_hour}', ` }
    if (contact != null) { sql += `contact = json('${JSON.stringify(contact)}'), ` }
    sql = sql.substring(0, sql.length - 2)
    sql += ` WHERE UUID LIKE '%${req.params.uuid}%'`
    console.log(sql)
    db.run(sql, [], (err) => {
      if (err) return console.error(err)
      console.log("updated:", req.body)
    })
    return res.json({
      status: 200,
      success: true,
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    })
  }
});

router.get('/lecturers', function(req, res, next) {
  sql = "SELECT * FROM lecturer"
  try {
    db.all(sql, [], (err, rows) => {
      if (err) return console.error(err)
      try {
        for(var x = 0; x < rows.length; x++) {
          rows[x].tags = JSON.parse(rows[x].tags)
          rows[x].contact = JSON.parse(rows[x].contact)
        }
      } catch (error) { return res.json({ status: 400, success: false, })}
      return res.json({ secret: "The cake is a lie", status: 200, success: true, rows })
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    })
  }
});

router.get('/lecturers/:uuid', function(req, res, next) {
  sql = `SELECT * FROM lecturer WHERE UUID LIKE '%${req.params.uuid}%'`
  try {
    db.all(sql, [], (err, rows) => {
      if (err) return console.error(err)
      try {
        rows[0].tags = JSON.parse(rows[0].tags)
        rows[0].contact = JSON.parse(rows[0].contact)
      } catch (error) { return res.json({ status: 400, success: false, })}
      return res.json({ secret: "The cake is a lie", status: 200, success: true, rows })
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    })
  }
});

router.delete('/lecturers/:uuid', function(req, res, next) {
  sql = `DELETE FROM lecturer WHERE UUID LIKE '%${req.params.uuid}%'`
  try {
    db.run(sql, [], (err) => {
      if (err) return console.error(err)
      console.log("removed:", req.params.uuid)
    })
    return res.json({ status: 200, success: true })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    })
  }
});


module.exports = router;
