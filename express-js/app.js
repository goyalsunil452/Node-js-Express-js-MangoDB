var express = require('express');

const app = express();


app.get('/',function(req,res){
    res.send('hello buddy')
})

// if url is http://localhost:9000/sunil  we use params
// app.get('/:user',function(req,res){
//     var user = req.params.user;
//     console.log(req.params);
//     res.send(`hello ${req.params.user}`)
// })

// if url is http://localhost:9000/sunil?id=20   we use query
// http://localhost:9000/user?id=20&&name=sunil
app.get('/:user',function(req,res){
    console.log(req.params);
    console.log(req.query);
    res.send(`hello ${req.query.name} ${req.query.id}`)
})
// req.params = { user: 'user' }
// req.query = { id: '20', name: 'sunil' }
//hello sunil 20

//start sever for perticular port using express
app.listen(9000,function (re1,res){
    console.log('Running');
});