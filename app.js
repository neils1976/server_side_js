var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:false }));
app.get('/template', function(req, res){
  res.render('temp', {time:Date(), title:'jade'});
});
app.get('/', function(req, res){
    res.send('Hello homepage');
});
app.get('/dynamic', function(req, res){
    var lis = '';
    for (var i=0; i<5; i++){
        lis = lis + '<li>coding</li>';
    }
    var time = Date();
    var output = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
        hello, dynamic!
        <ul>
        ${lis}
        </ul>
        ${time}
      </body>
    </html>`;
    res.send(output);
});
app.get('/login', function(req, res){
    res.send('<h1>login please</h1>');
});
app.get('/route', function(req, res){
    res.send('Hello Router <br> <img src="/route.jpg">');
});
app.listen(3000, function(){
    console.log('Connected 3000 Port!');
});
