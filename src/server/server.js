const express = require('express');
const cors = require('cors');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const port = process.env.PORT || 3080;
const router = require('./router');
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Allowed origins
const allowedOrigins = ['*'];
const options= cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.all("/", function(req, res, next) {
  req.header("Origin", "*"); // ideally the '*' will be your hostname
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
  res.header("Access-Control-Expose-Headers", "ETag, Link, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset");
  res.header("Access-Control-Max-Age", "86400");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});


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
