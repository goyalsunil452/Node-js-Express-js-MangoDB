const fs = require('fs');
const http = require('http');
// const url = require('url');
// const slugify = require('slugify');
// const replaceTemplate = require('./modules/replaceTemplate');

/////////////////////////////////
// FILES

// Blocking, synchronous way
// const textin = fs.readFileSync('./node-js/input.txt', 'utf-8');
// console.log(textin);
// const textout = `this is what we know about the avocado: ${textin}.\n created on ${Date.now()}`;
// fs.writefilesync('./node-js/input.txt', textout);
// console.log('file written!');


// non blocking ,asynchronous way
fs.writeFile(`./node-js/input.txt`,`test` ,'utf-8',(error2)=>{
    console.log('file has been written');
})
fs.readFile('./node-js/input.txt', 'utf-8',(error1,data1)=>{
    console.log(data1)
    fs.readFile(`./node-js/${data1}.js`, 'utf-8',(error2,data2)=>{
        console.log(data2);
        fs.writeFile(`./node-js/input.txt`,`${data1}\n${data2}` ,'utf-8',(error2)=>{
            console.log('file has been written');
        })
    })
})
console.log('will read file');




