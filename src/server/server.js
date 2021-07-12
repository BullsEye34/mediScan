const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const router = require('./router');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/images/', express.static('/public/images')); 
app.use('/upload', router);

app.get("/public/images/:id",(req,res)=>{
  res.sendFile(path.join(__dirname, "./public/images/"+req.params.id))
})

app.listen(port, function () {
  console.log('Server is running on PORT',port);
});
