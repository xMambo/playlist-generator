const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require("./client/routes/apiRoutes");

const mongoose = require("mongoose");// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(apiRoutes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://xmambo:Littlep4wDB@ds153096.mlab.com:53096/heroku_qkz8vdtp';

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

mongoose.connection.once('open', function(){
  console.log('Database connection has been made');
}).on('error', function(error){
  console.log('Database error:', error);
});
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
