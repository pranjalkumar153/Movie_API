var express = require("express");
var app = express();

var parser = require("body-parser");

var request = require("request");

app.use(parser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

var results = "";
// HOME PAGE CREATED SUCCESSFULLY 
app.get("/", function(req, res) {
    console.log("WELCOME TO HOMEPAGE!!");
    res.send("WELCOME TO HOMEPAGE!!");
});

// PAGE TO TAKE INPUT FROM THE USER
app.get("/search_page", function(req, res) {
    res.render("form");
    // var s_key = req.params;
    // console.log(s_key + "from /search page");
});


// A ROUTE TO FETCH RESULTS
app.post("/res_search", function(req, res) {
    var s_key = req.body.movie;
    console.log(s_key);
    // MAKING API CALL
    var url = "http://www.omdbapi.com/?apikey=90331194&s=";
    url += s_key;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            results = JSON.parse(body);
            console.log(results.Search);
            console.log(typeof(Object.values(results.Search)));
            //Converted the object to array;
            results = Object.values(results.Search);
            console.log(results);
            console.log("INFORMATION SUCCESFULLY FETCHED");
        } else {
            console.log("AN ERROR OCCURRED WHILE CONNECTING TO THE SERVER!!");
        }
    });
    res.redirect("/results");
});

app.get("/results", function(req, res) {
    res.render("result_page", { results: results });
})

app.listen(8000, 8000, function(req, res) {
    console.log("CONNECTED SUCCESSFULLY TO THE SERVER!!");
});