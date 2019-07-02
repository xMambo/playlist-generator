var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server

// Require all models
var db = require("./client/src/models");

var PORT = 3001;


// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// Connect to the database before starting the application server.
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/bandsintown';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
});


mongoose.connection.once('open', function () {
    console.log('Database connection has been made');
}).on('error', function (error) {
    console.log('Database error:', error);
});

db.Band.collection.drop();

function getBandData() {
    var cheerio = require("cheerio");
    var axios = require("axios");


    // First, tell the console what server.js is doing
    console.log("\n***********************************\n" +
        "Grabbing Top 18 bands playing\n" +
        "in 'this location':" +
        "\n***********************************\n");

    // Making a request via axios for reddit's "webdev" board. We are sure to use old.reddit due to changes in HTML structure for the new reddit. The page's Response is passed as our promise argument.
    //axios.get("https://www.bandsintown.com/?place_id=ChIJzWXFYYuifDUR64Pq5LTtioU&sort_by_filter=Number+of+RSVPs").then(function(response) {
    const BASEURL = "https://www.bandsintown.com/?latitude=";
    let LAT = "36.16";
    let LON = "-86.77";
    const SORT = "&sort_by_filter=Number+of+RSVPs";
    const url = BASEURL + LAT + "&" + LON + SORT;


    axios.get(url)
        .then(function (response) {



            // Load the Response into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            var $ = cheerio.load(response.data);

            // An empty array to  save the data that we'll scrape
            var results = [];

            // With cheerio, find each p-tag with the "title" class
            // (i: iterator. element: the current element)
            $("div.upcomingEvents-075e0336").each(function (i, element) {
                
                // Save the text of the element in a "title" variable
                //var title = $(element).text();
                
                //let eventsNear = $(element).find("h1").text();
                
                $(element).find("h2.event-5daafce9").each(function (i, element) {
                   //add this code if you want to limit the number of bands
                    /* if(i === 10) {
                        return false;
                    };*/
                    let bandName = $(element).text()


                    // In the currently selected element, look at its child elements (i.e., its a-tags),
                    // then save the values for any "href" attributes that the child elements may have

                    // Save these results in an object that we'll push into the results array we defined earlier
                    results.push({
                        //title: title,
                        //City: eventsNear,
                        bandName: bandName
                    });
                });

                
                  

                db.Band.create(results)
                .then(function (dbBands) {
                    console.log("********************************************\n" +
                    "These bands have been added to the database\n" +
                    "and the old content has been removed." +
                    "\n********************************************");
                })
                .catch(function (err) {
                    console.log(err);
                });
            });
            
            
            // Log the results once you've looped through each of the elements found with cheerio
            console.log("These are the results from getBandData:\n", results);
            

            // Route for getting all Articles from the db
            app.get("/bands", function (req, res) {
                db.Band.find({})
                    .then(function (dbBands) {
                        res.json(dbBands);
                    })
                    .catch(function (err) {
                        res.json(err);
                    });
            });
        });
    }

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

getBandData()

module.exports = getBandData