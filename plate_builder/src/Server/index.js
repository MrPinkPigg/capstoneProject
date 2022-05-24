const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "rootroot",
    database: "usersDB"
});

app.post('/register', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email == '' || password == '') {
        res.send({err: "Invalid email/password"})
    }
    else {
    db.query("INSERT INTO users (email, password) VALUES (?,?)", [email, password], (err, result) => {
        console.log(err)
    })
}
})
app.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, result) => {
        if (err) {
            res.send({err: err})
        }
        if (result.length > 0) {
            res.send({result: result, auth: true})
        }
        else {
            res.send({message: "wrong username or password"})
        }
    })
})
app.listen(3001, () => {
    console.log("running server")
})