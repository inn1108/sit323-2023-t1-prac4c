const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const jwtKey = 'SIT323/JINWEI';
const app = express();

const res = require("express/lib/response")
const fs = require('fs');
const winston = require('winston');

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
          { expiresIn: '100s' }, 
        (err, token) => {
          res.json({ username, password, message: 'log-in is successfuly ', token });
        }
      );
    }
  });




  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
  
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
  
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) NMNMNM`
  
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
  
  const add=(n1,n2)=>{
      return n1+n2
  }
  
  //add
  
  app.get("/add", (req,res)=>{
      try{
          const n1=parseFloat(req.query.n1);
          const n2 = parseFloat(req.query.n2);
          if(isNaN(n1)){
              logger.error("n1 error defined please check again");
              throw new Error("n1 error defined please check again");
          }
          if(isNaN(n2)){
              logger.error("n2 incorrectly defined please check again");
              throw new Error("n2 incorrectly defined  please check again");
          }
  
          logger.info("Paramenters "+n1+ ' and ' +n2+ ' received for addition')
          const result = add(n1,n2);
          res.status(200).json({statuscode:100,data: result})
      } catch(error){
          console.error(error)
          res.status(500).json({statuscode:500,msg:error.toString()})
      }
  });


  
  //sub
  
  const sub=(n1,n2)=>{
    return n1-n2
  }
  
  
  app.get("/sub", (req,res)=>{
    try{
        const n1=parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if(isNaN(n1)){
            logger.error("n1 incorrectly defined please double check n1 data");
            throw new Error("n1 incorrectly defined please double check n1 data");
        }
        if(isNaN(n2)){
            logger.error("n2 incorrectly defined please double check n2 data");
            throw new Error("n2 incorrectly defined please double check n2 data");
        }
  
        logger.info("Paramenters "  +n1+' and ' +n2+' received for subtraction')
        const result = sub(n1,n2);
        res.status(200).json({statuscode:100,data: result})
    } catch(error){
        console.error(error)
        res.status(500).json({statuscode:500,msg:error.toString()})
    }
  });
  
  
  
  
  
  
  //mul
  
  const mul=(n1,n2)=>{
    return n1*n2
  }
  
  
  app.get("/mul", (req,res)=>{
    try{
        const n1=parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if(isNaN(n1)){
            logger.error("n1 incorrectly defined remove error data ");
            throw new Error("n1 incorrectly defined remove error data");
        }
        if(isNaN(n2)){
            logger.error("n2 incorrectly defined try again");
            throw new Error("n2 incorrectly defined try again");
        }
  
        logger.info("Paramenters "  +n1+' and ' +n2+' received for multiplication')
        const result = mul(n1,n2);
        res.status(200).json({statuscode:100,data: result})
    } catch(error){
        console.error(error)
        res.status(500).json({statuscode:500,msg:error.toString()})
    }
  });
  
  //div
  
  const div=(n1,n2)=>{
    return n1/n2
  }
  
  
  app.get("/div", (req,res)=>{
    try{
        const n1=parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if(isNaN(n1)){
            logger.error("n1 incorrectly defined try again");
            throw new Error("n1 incorrectly defined try again");
        }
        if(isNaN(n2)){
            logger.error("n2 incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
  
        logger.info("Paramenters answer "  +n1+' and ' +n2+' received for division')
        const result = div(n1,n2);
        res.status(200).json({statuscode:100,data: result})
    } catch(error){
        console.error(error)
        res.status(500).json({statuscode:500,msg:error.toString()})
    }
  });
  
  
  






  
app.get('/after-login-page', (req,res) => {
    const headers = req.headers;
    const token = headers['authorization'].split(' ')[1];//extract
    

    jwt.verify(token, jwtKey, (err, payload) => {
        if(err) return res.sendStatus(400); // wrong message  page        
        res.json({message:'Authentication successful Welcome to' , payload});
    })
     
});

app.listen(3020,() => console.log('server is start in part  3020'));


