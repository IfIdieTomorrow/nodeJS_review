const express = require('express');
const router = express.Router()
const db = require("../../lib/db");

router.get('/list', function(req,res) {
	let id = req.user;
	if(!id) res.render('login.ejs');
	res.render('movie.ejs');
})

// 1. /movie , GET
router.get('/', function(req,res) {
	let responseData = {};
	db.query('select title from movie', function(err, rows) {
		if(err) throw err;
		if(rows.length) {
			responseData.result = 1;
			responseData.data = rows;
		} else {
			responseData.result = 0;
		}
		res.json(responseData)
	})	
})

// 2. /movie , POST
router.post('/', function(req,res){
	let title = req.body.title;
	let type = req.body.type;
	let grade = req.body.grade;
	let actor = req.body.actor;

	let sql = {title,type,grade,actor};
	db.query('insert into movie set ?', sql, function(err,rows) {
		if(err) throw err
		return res.json({'result' : 1});
	})

})


// 3. /movie/:title , GET
router.get('/:title', function(req,res) {
	let title = req.params.title;

	let responseData = {};

	db.query('select * from movie where title =?', [title], function(err, rows) {
		if(err) throw err;
		if(rows[0]) {
			responseData.result = 1;
			responseData.data = rows;
		} else {
			responseData.result = 0;
		}
		res.json(responseData)
	})	
})


// 4. /movie/:title , DELETE
router.delete('/:title', function(req,res) {
	let title = req.params.title;

	let responseData = {};

	db.query('delete from movie where title =?', [title], function(err, rows) {
		if(err) throw err;

		if(rows.affectedRows > 0) {
			responseData.result = 1;
			responseData.data = title;
		} else {
			responseData.result = 0;
		}
		res.json(responseData)
	})	
})


module.exports = router;