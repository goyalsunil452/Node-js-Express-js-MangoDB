var fileSys = require('fs');



//Blocking , Synchrounous method



//read file
fileSys.readFile('module-new.js','utf8',function(error,data) {
    if(data!=undefined){
        console.log(data)
    }
    else{
        console.log(error)
    }
})

var fun = `function divide(a,b){
    return a/b;
}`
//write file
// it will create a file which code , file had some content i will replace
fileSys.writeFile('writen-file.js',fun,function(error){
    console.log(error);
})


//it will append new content to file
fileSys.appendFile('writen-file.js',fun,function(error){
    console.log(error);
})

//to delete file
fileSys.unlink('writen-file.js',function(error){
    console.log(error);
})