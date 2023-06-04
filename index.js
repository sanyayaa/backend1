// const { log } = require('console');
const http = require("http");
const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

// +"/product":
//       res.setHeader("Content-Type", "text/html");
//       let modified_index = index.replace('**title**',product.title).replace('**url**',product.thumbnail).replace('**price**',product.price).replace('**rating**',product.rating)
//       res.end(modified_index);
//       break;

const server = http.createServer((req, res) => {
  console.log(req.url);
  if(req.url.startsWith('/product')){
    const id = req.url.split('/')[2];
    const product = products.find(p=>p.id ===(+id))
    console.log(product);

    res.setHeader("Content-Type", "text/html");

    let modified_index = index.replace('**title**',product.title)
    .replace('**url**',product.thumbnail)
    .replace('**price**',product.price)
    .replace('**rating**',product.rating)
    res.end(modified_index);
    return;
}


  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      res.end(index);
      break;

    case "/api":
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
      break;

    // case "/product":
    //   res.setHeader("Content-Type", "text/html");
    //   let modified_index = index.replace('**title**',product.title).replace('**url**',product.thumbnail).replace('**price**',product.price).replace('**rating**',product.rating)
    //   res.end(modified_index);
    //   break;

    default:
      res.writeHead(404, "NOT FOUND");
      res.end();
  }
  console.log("SERVER STARTED");
  // res.setHeader('Dummy','DummyValue');
});

server.listen(8080);

//FILE SYSTEM MODULE
// const fs = require('fs');

// const text = fs.readFileSync('demo.txt','utf-8' );
// console.log(text);

// fs.readFile('demo.txt','utf-8',(err,txt) => {
//     console.log(txt)
// } );

// console.log("HELLO")
// terminal mein  node index.js likho run hogi yeh file and yeh js code chalega
//importing module
// const lib = require('./lib')

// import {sum,diff} from './lib';

// console.log(sum(4,5),diff(3,6))
// const a = 5;
