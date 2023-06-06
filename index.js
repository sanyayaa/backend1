const express = require('express');
const fs = require("fs");
const morgan = require('morgan');

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

//server start
const server = express();

//bodyParser
server.use(express.json());
server.use(morgan('default'))
server.use(express.static('public')); 


//API
//Products
//API ROOT,base URL, example - google.com/api/v2
// C R U D

//CREATE API usnig POST
//Create POST/products
server.post('/products',(req,res) => {
  console.log(req.body);
  products.push(req.body);
  res.status(201).json(req.body)
})



//READ API   GET/products
server.get('/products',(req,res) => {
  res.json(products);
})

//READ API   GET/products/:id
server.get('/products/:id',(req,res) => {
  //vaise yeh string id thi toh convert krne k liyen umber mein we added +
  const id = +req.params.id;
  const product = products.find(p=>p.id===id)
  res.json(product);
})


//UPDATE PUT /products/:id
// put mein last data ko overwrite kr dia jata hai 
server.put('/products/:id',(req,res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex(p=>p.id===id)
  products.splice(productIndex,1,{...req.body,id})
  res.status(201).json();
})
//patch mein overwrite hi krte jo mein change kr raha hu vo change ho baaki ka sab same rahe

//UPDATE PATCH /products/:id
server.patch('/products/:id',(req,res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex(p=>p.id===id)
  const product = products[productIndex];
  products.splice(productIndex,1,{...product,...req.body})
  res.status(201).json();
})



//DELETE DELETE /products/:id
server.delete('/products/:id',(req,res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex(p=>p.id===id)
  const product = products[productIndex];
  products.splice(productIndex,1)
  res.status(201).json(product);
})



//server end
server.listen(8080,() => {
  console.log('server started')
});

