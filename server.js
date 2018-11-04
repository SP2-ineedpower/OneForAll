const mysql = require('mysql');
const express = require('express');
const cors = require('cors')
const app = express();


const SELECTUSERS = 'SELECT * from user where userId = 1';
const SELECTPROJECT = 'SELECT * FROM project where creatorId = 1';

const connection = mysql.createConnection({
    host     : 'dt5.ehb.be',
    user     : '1819SP2_oneforall',
    password : 'NjGkqLQ',
    database : '1819SP2_oneforall'
});

connection.connect(function(error) {
    if (error) {
        console.log('Error');
    }else {
        console.log('Connected');
    }
});

app.use(cors());

app.get('/users', (req,res) => {
    connection.query(SELECTUSERS,(err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
})

app.get('/projects', (req,res) => {
    connection.query(SELECTPROJECT,(err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
})


const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
