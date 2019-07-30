const
  express = require('express'),
  app = express(),
  port = 5000,
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  appRoutes = require('./routes/app.js')

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use('/', appRoutes);

// server connection
app.listen(port, (err) => {
  console.log(err || "Server running on port: " + port);
});
