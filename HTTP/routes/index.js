const express = require('express')
const mysql = require('mysql')
const router = express.Router()

let db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'wht441465797',
  database : 'todo'
});

db.connect();

router.get('/', (req, res) => {
	console.log(content)
	res.send('hello Express')
})

// 获取列表
router.get('/getlist', (req, res) => {
	db.query('select * from todolist;', (err, data) => {
		if(err){
			console.log(err)
			res.end()
		}
		res.send(data)
	})
	
})

// 获取“已完成”列表
router.get('/get_compelete', (req, res) => {
	db.query('select * from tb_complete;', (err, data) => {
		if(err){
			console.log(err)
			res.end()
		}
		res.send(data)
	})
	
})

// 添加待办事项
router.post('/add', (req, res) => {
	let data = req.body.data
	let { content, typeid, type, time } = data
	db.query(`insert into todolist (content, typeid, type, time) values('${content}', '${typeid}','${type}', '${time}')`, (err, res)=>{
		if(err){
			console.log(err)
			res.end()
		}
	})
	res.json({code:1,status:'ok'})
})

// 删除选定的条目并添加到“已完成”的表里面
router.post('/delete', (req, res) => {
	let {id, time} = req.body.data
	
	//添加到完成列表
	db.query(`select * from todolist where id = ${id}`, (err, res)=>{
		if(err){
			console.log(err)
			res.end()
		}else{
			let {content, type} = res[0]
			db.query(`insert into tb_complete (content, typeid, type, time) values('${content}', '${typeid}','${type}', '${time}')`, (err, res)=>{
				if(err){
					console.log(`插入 tb_complete 错误：${err}`)
					res.end()
				}
			})
			db.query(`delete from todolist where id = ${ id }`, (err, res)=>{
				if(err){
					console.log(`删除 todolist 错误：${err}`)
					res.end()
				}
			})
		}
	})
	
	res.json({code:1,status:'ok'})
})


module.exports = router