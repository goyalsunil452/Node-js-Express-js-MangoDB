//here we are importing http services

var fs =require('fs');
var http =require('http');
var url =require('url');
var slugify =require('slugify');

const data =  fs.readFileSync(`${__dirname}/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

const replaceTemplate = (temp,product)=>{
  let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
  output = output.replace(/{%IMAGE%}/g,product.image);
  output = output.replace(/{%PRICE%}/g,product.price);
  output = output.replace(/{%FROM%}/g,product.from);
  output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
  output = output.replace(/{%QUANTITY%}/g,product.quantity);
  output = output.replace(/{%ORGANIC%}/g,product.organic);
  output = output.replace(/{%DESCRIPTION%}/g,product.description);
  output = output.replace(/{%ID%}/g,product.id);
  if(!product.organic) output =output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
  return output;
}
const tempoverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempproduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);


//using http method to create server at specific port 
var server =http.createServer((req,res)=>{
  //const pathname =req.url;
  const { query, pathname } = url.parse(req.url, true);
  console.log(pathname);
  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempoverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
   // res.end(output);
    //console.log(cardsHtml);
    res.write(output);
    res.end();
  }else if(pathname.includes('/product')){
    let subpath = pathname.split('/')
    let index = slugs.indexOf(subpath[subpath.length-1]);
    console.log('sas',subpath)
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    if(query.id<dataObj.length){
      const product = dataObj[query.id];
      //console.log(product)
      const output = replaceTemplate(tempproduct, product);
      res.end(output);
    }else if(index!=-1){
      const product = dataObj[index];
      const output = replaceTemplate(tempproduct, product);
      res.end(output)
    }else if(index==-1){
      res.end('<h1>Page not found</h1>');
    }
  }else if(pathname === '/api'){
    console.log(dataObj);
    res.end(data);
  }else{
    res.writeHead(400, {
      'Content-type': 'text/html'
    });
    res.end('<h1>Page not found</h1>');
  }

});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});

//http://127.0.0.1:8080/s