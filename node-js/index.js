const res = require('express/lib/response');
const fs = require('fs')
const http = require('http');
var url =require('url');
const sample = fs.readFileSync(
    `${__dirname}/templates/samletest.html`,
    'utf-8'
  );
const server=http.createServer((req,res)=>{
    const { query, pathname } = url.parse(req?.url, true);
    console.log(pathname);
    if(pathname=='/hi'){
        res.end(sample)
    }else if(pathname=='/'){
        res.write('home');
        res.end();
    }
})
server.listen(8001,'127.0.0.1' ,()=>{

    console.log('listing to server 127.0.0.2:8001');
})