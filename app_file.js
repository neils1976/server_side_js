var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var _storage = multer.diskStorage({
  description: function (req, res, cb){
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
var upload = multer({ storage: _storage })
var fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');
app.get('/upload', function (req, res){
  res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req, res){
  res.send('uploaded : '+req.file.filename);
});
app.get('/topic/new', function(req, res){
  fs.readdir('data', function(err,files){
    if(err){
      console.log(err)
      res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics:files});
  });
});
app.get(['/topic', '/topic/:id'], function(req, res){
  fs.readdir('data', function(err,files){
    if(err){
      console.log(err)
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if(id){
      //id값이 있을때
      fs.readFile('data/'+id, 'utf-8', function(err,data){
        if(err){
          console.log(err)
          res.status(500).send('Internal Server Error');
        }
      res.render('view', {topics:files, title:id, description:data});
      })
    } else {
      //id값이 없을때
      res.render('view', {topics:files, title:'Welcome', description:'Hello, Java for Server'});
    }
  })
});
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
      consile.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/'+title);
  });
})
app.listen(3000, function(){
  console.log('Connected, 3000 port!');
})
