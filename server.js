const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const logiciels = require("./routes/api/logiciels");
const app = express();
const compression = require('compression');
const path = require('path');

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
mongoose.set('useCreateIndex', true);
const db = process.env.MONGO_URI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use(compression());
app.use("/api/users", users);
app.use("/api/logiciels", logiciels);
// Production
const env = process.env.NODE_ENV;
var initTracer = require('jaeger-client').initTracer;

// See schema https://github.com/jaegertracing/jaeger-client-node/blob/master/src/configuration.js#L37
var config = {
  serviceName: 'projet-31',
  sampler: {
    type: 'const',
    param: 1,
  },
};
var options = {
  tags: {
    'projet-31.version': '3.0',
  },
  logger: {
    info: function logInfo(msg) {
      console.log('INFO  ', msg);
    },
    error: function logError(msg) {
      console.log('ERROR ', msg);
    },
  }, 
};
var tracer = initTracer(config, options);
if(env === 'Production'){
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and working on port ${port} in a ${env} environment !`));