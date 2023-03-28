const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const jwtKey = 'SIT323/JINWEI';
const app = express();

app.use(bodyParser.json());

//database
const database = {username: 'jinwei', password:'Hello SIT323'};
//login JWT

app.post('/log-in', (req, res) => {
    const { username, password } = req.body;
    if (username === database.username && password === database.password) {
      jwt.sign(
          { username },
          jwtKey,
          { expiresIn: '30s' }, 
        (err, token) => {
          res.json({ username, password, message: 'log-in is successfuly ', token });
        }
      );
    }
  });
  
app.get('/home-page', (req,res) => {
    const headers = req.headers;
    const token = headers['authorization'].split(' ')[1];//extract
    

    jwt.verify(token, jwtKey, (err, payload) => {
        if(err) return res.sendStatus(400); // wrong message  page        
        res.json({message:'Authentication successful Welcome to' , payload});
    })
     
});

app.listen(3020,() => console.log('server is start in part  3020'));
