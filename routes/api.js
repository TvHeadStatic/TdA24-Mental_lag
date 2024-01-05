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
  uuid VARCHAR(36) PRIMARY KEY,
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
      uuid,
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
      uuid,
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
    if (!req.body.hasOwnProperty('first_name') || req.body.first_name == null) return res.status(400).json({ status: 400, success: false, })
    if (!req.body.hasOwnProperty('last_name') || req.body.last_name == null) return res.status(400).json({ status: 400, success: false, })
    if (uuid == null) uuid = crypto.randomUUID()
    if (req.body.hasOwnProperty('tags')) {
      for (var x = 0; x < tags.length; x++) {
        tags[x] = { uuid: crypto.randomUUID(), name: tags[x].name }
      }
    }
    db.run(sql, [
      uuid,
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
      console.log("saved:", uuid, first_name, middle_name, last_name, tags, contact)
    })
    let result = req.body
    return res.status(200).json({
      status: 200,
      success: true,
      uuid: uuid,
      title_before: result.title_before,
      first_name: result.first_name,
      middle_name: result.middle_name,
      last_name: result.last_name,
      title_after: result.title_after,
      picture_url: result.picture_url,
      location: result.location,
      claim: result.claim,
      bio: result.bio,
      tags: result.tags,
      price_per_hour: result.price_per_hour,
      contact: result.contact
    })
  } catch (error) {
    return res.status(400).json({
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
    if (req.body.hasOwnProperty('tags')) {
      for (var x = 0; x < tags.length; x++) {
        tags[x] = { uuid: crypto.randomUUID(), name: tags[x].name }
      }
    }
    sql = `UPDATE lecturer SET `
    if (req.body.hasOwnProperty('title_before')) { sql += `title_before = '${title_before}', ` }
    if (req.body.hasOwnProperty('first_name')) { sql += `first_name = '${first_name}', ` }
    if (req.body.hasOwnProperty('middle_name')) { sql += `middle_name = '${middle_name}', ` }
    if (req.body.hasOwnProperty('last_name')) { sql += `last_name = '${last_name}', ` }
    if (req.body.hasOwnProperty('title_after')) { sql += `title_after = '${title_after}', ` }
    if (req.body.hasOwnProperty('picture_url')) { sql += `picture_url = '${picture_url}', ` }
    if (req.body.hasOwnProperty('location')) { sql += `location = '${location}', ` }
    if (req.body.hasOwnProperty('claim')) { sql += `claim = '${claim}', ` }
    if (req.body.hasOwnProperty('bio') && req.body.bio == null) { sql += `bio = '${bio}', ` }
    if (req.body.hasOwnProperty('tags')) { sql += `tags = json('${JSON.stringify(tags)}'), ` }
    if (req.body.hasOwnProperty('price_per_hour')) { sql += `price_per_hour = '${price_per_hour}', ` }
    if (req.body.hasOwnProperty('contact')) { sql += `contact = json('${JSON.stringify(contact)}'), ` }
    sql = sql.substring(0, sql.length - 2)
    sql += ` WHERE uuid LIKE '%${req.params.uuid}%'`
    console.log(sql)
    db.run(sql, [], (err) => {
      if (err) return console.error(err)
      console.log("updated:", req.body)
      // try {
      //   for(var x = 0; x < rows.length; x++) {
      //     if (rows[x].tags != null) { rows[x].tags = JSON.parse(rows[x].tags) }
      //     if (rows[x].contact != null) { rows[x].contact = JSON.parse(rows[x].contact) }
      //   }
      // } catch (error) { return res.status(400).json({ status: 400, success: false, })}
      let result = req.body
      return res.status(200).json({
        status: 200,
        success: true,
        uuid: req.params.uuid || "None",
        title_before: result.title_before || "None",
        first_name: result.first_name || "None",
        middle_name: result.middle_name || "None",
        last_name: result.last_name || "None",
        title_after: result.title_after || "None",
        picture_url: result.picture_url || "None",
        location: result.location || "None",
        claim: result.claim || "None",
        bio: result.bio || "None",
        tags: result.tags || "None",
        price_per_hour: result.price_per_hour || "None",
        contact: result.contact || "None"
      })
    })
  } catch (error) {
    return res.status(400).json({
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
          if (rows[x].hasOwnProperty('tags')) { rows[x].tags = JSON.parse(rows[x].tags) }
          if (rows[x].hasOwnProperty('contact')) { rows[x].contact = JSON.parse(rows[x].contact) }
        }
      } catch (error) { return res.status(400).json({ status: 400, success: false, })}
      return res.status(200).json(rows)
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    })
  }
});

router.get('/lecturers/:uuid', function(req, res, next) {
  sql = `SELECT * FROM lecturer WHERE uuid LIKE '%${req.params.uuid}%'`
  try {
    db.all(sql, [], (err, rows) => {
      if (err) return console.error(err)
      try {
        if (rows[0].hasOwnProperty('tags')) { rows[0].tags = JSON.parse(rows[0].tags) }
        if (rows[0].hasOwnProperty('contact')) { rows[0].contact = JSON.parse(rows[0].contact) }
      } catch (error) { return res.status(404).json({ status: 404, success: false, })}
      let result = rows[0]
      return res.status(200).json({
        status: 200,
        success: true,
        uuid: result.uuid,
        title_before: result.title_before,
        first_name: result.first_name,
        middle_name: result.middle_name,
        last_name: result.last_name,
        title_after: result.title_after,
        picture_url: result.picture_url,
        location: result.location,
        claim: result.claim,
        bio: result.bio,
        tags: result.tags,
        price_per_hour: result.price_per_hour,
        contact: result.contact
      })
    })
  } catch (error) {
    return res.status(404).json({
      status: 404,
      success: false,
    })
  }
});

router.delete('/lecturers/:uuid', function(req, res, next) {
  try {
    sql = `DELETE FROM lecturer WHERE uuid LIKE '%${req.params.uuid}%'`
    db.run(sql, [], (err) => {
      if (err) return res.status(404).json({ status: 404, success: false })
      console.log("removed:", req.params.uuid)
    })
    return res.status(200).json({ status: 200, success: true })
  } catch(error) { return res.status(404).json({ status: 404, success: false }) }
});


module.exports = router;
