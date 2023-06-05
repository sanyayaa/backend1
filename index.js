const express = require('express');
const fs = require("fs");
const morgan = require('morgan');

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

//server start
const server = express();



server.use(express.json());

server.use(morgan('dev'))


//static hosting - slash / k baad tum ese directly access kr sakte ho middleware ki zarurat nhi hogi 
//built in static middleware
server.use(express.static('public')); 


// MIDDLEWARE 
// example - jaise ap kisi country se req bheji kisi website mein if vo website nhi de allow karti apki country ko toh vo vapis bhej deti hai ya allow kr deti hai .

// server.use((req,res,next) =>{
//   //yeh waha req.f=get dusre wala get hai info laa kr deta hai 
//   console.log(req.method,req.ip,req.hostname,new Date(),req.get('User-Agent'))
//   next()
// })


const auth = ((req,res,next) =>{
  // console.log(req.query)
  // if(req.query.password == '123'){
  //   next()
  // }

//express req  ki body ko nhi nikalta apne aap.so we use built in middleware for this we'll use express.json middleware
  if(req.body.password == '123'){
    next()
  }else{
    res.sendStatus(401);
  }
  next()
})

// yeh pure program mein auth wala middleware laga raha hai jo ki galat hai kyuki sab mein auth thodi lagega so hum route mein hi auth wlaa middleware daal denge jaha chaiye jaise login sign up mein 

// server.use(auth);


// check kro auth chll raha hai ya nhi yeh daalo url 
// http://localhost:8080/?password=123

//API - Endpoint - Route
// server.get('/',auth,(req,res) => {
//   res.json({type:'GET'})
// })
server.get('/product/:id',auth,(req,res) => {
  // yeh jo /:id kia hai ese bolte hai url parameter mtlab product k baad kuch bhi ho sakta hai product static hai 
  console.log(req.params)
  res.json({type:'GET'})
})
server.post('/',auth,(req,res) => {
  res.json({type:'POST'})
})
server.put('/',(req,res) => {
  res.json({type:'PUT'})
})
server.delete('/',(req,res) => {
  res.json({type:'DELETE'})
})
server.patch('/',(req,res) => {
  res.json({type:'PATCH'})
})










// server.get('/demo',(req,res) => {
  // res.send('<h1>hello world</h1>');
  // res.sendFile('/Users/Sanya/Desktop/BACKEND/New folder/index.html');
  // res.json(products);
  // res.sendStatus(404);
  // res.status(201).send('<h1>hello</h1>');
// })


//server end
server.listen(8080,() => {
  console.log('server started')
});

