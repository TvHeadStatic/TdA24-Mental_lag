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
const db = new sqlite3.Database(path.join(__dirname, 'data','book.sqlite'));

var router = express.Router();

router.use(bodyParser.json());
var sql = `
CREATE TABLE book(
  book_id VARCHAR(36) PRIMARY KEY,
  uuid,
  full_name,
  date,
  email,
  phone,
  note
  )
`
db.run(sql)

// /book
router.post('/', function(req, res, next) {
  try {
    var {
      uuid,
      full_name,
      date,
      email,
      phone,
      note
    } = req.body
    bookid = crypto.randomUUID()
    sql = `INSERT INTO book(
      book_id,
      uuid,
      full_name,
      date,
      email,
      phone,
      note
      ) VALUES (?,?,?,?,?,?,?)`
    if (!req.body.hasOwnProperty('uuid') || req.body.uuid == null) return res.status(400).json({ status: 400, success: false, })
    if (!req.body.hasOwnProperty('full_name') || req.body.full_name == null) return res.status(400).json({ status: 400, success: false, })
    if (!req.body.hasOwnProperty('date') || req.body.date == null) return res.status(400).json({ status: 400, success: false, })
    db.run(sql, [bookid, uuid, full_name, date, email, phone, note], (err) => {
      if (err) return console.error(err)
      console.log("saved:", uuid, full_name, date, email, phone, note)
    })
    let result = req.body
    return res.status(200).json({
      status: 200,
      success: true,
      book_id: bookid,
      uuid: result.uuid,
      full_name: result.full_name,
      date: result.date,
      email: result.email,
      phone: phone.phone,
      note: result.note
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      success: false,
    })
  }
});

router.get('/:uuid/:date', function(req, res, next) {
  sql = `SELECT * FROM book WHERE uuid = '${req.params.uuid}' AND date = '${req.params.date}'`
  try {
    db.all(sql, [], (err, rows) => {
      if (err) return console.error(err)
      return res.status(200).json({ rows })
    })
  } catch (error) {
    return res.status(404).json({
      status: 404,
      success: false,
    })
  }
});

router.delete('/:uuid', function(req, res, next) {
  try {
    sql = `SELECT * FROM book WHERE book_id = '${req.params.uuid}'`
    let oldresult
    db.all(sql, [], (err, rows) => {
      if (err) return res.status(404).json({ status: 404, success: false, })
      oldresult = rows[0]
    })
    sql = `DELETE FROM book WHERE book_id = '${req.params.uuid}'`
    db.run(sql, [], (err) => {
      if (err) return res.status(404).json({ status: 404, success: false })
      try {
        if (oldresult.book_id == null) return res.status(404).json({ status: 404, success: false, })
      } catch {
        return res.status(404).json({ status: 404, success: false, })
      }
      console.log("removed:", req.params.uuid)
      return res.status(200).json({ status: 200, success: true })
    })
  } catch(error) { return res.status(404).json({ status: 404, success: false }) }
});


module.exports = router;
