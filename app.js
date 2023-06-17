const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = "database.db"

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.static("../frontend/"));

app.use(express.json());

app.get('/', urlencodedParser, (req, res) =>{
    res.sendFile(path.join(__dirname, '/index.html'))
})

// Endpoint to send the number to the Database, reference from Inteli Github
app.post('/sendNumber', urlencodedParser, (req, res) =>{
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH)
    var sql = `INSERT INTO data (number) VALUES ('${req.body.guess}')`;
    db.run(sql, [], err => {
        if(err) {
            throw err;
        }
    });
    res.write('<p>numero enviado!</p><a href="/">VOLTAR</a> ');
    db.close();
    res.end(); 
});

//Endpoint to return the last sent number from the database
app.get('/check', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = 'SELECT number FROM data WHERE id=(SELECT MAX(id) FROM data)'
    db.all(sql, [], (err, rows)=> {
        if(err){
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

app.listen(port, hostname, () => {
	console.log('Servidor rodando em http://' + hostname + ':' + port);
})