const express =  require("express");
const https = require("https"); // we need to require the native https module of node in order to provide the response to our client from some other API (openWeatherMap API)
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");

});

app.post('/', function(req, res){
    console.log(req.body.city);
    const query = req.body.city;
    const apiKey = "Your API Key";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit; // this we are defining here as its very long and here the appid : value is the API Key 
    // const url = "https://api.openweathermap.org/data/2.5/weather?q=Lucknow&appid={Your_API_Key}&units=metric";
    // https is a native package of node used to get the response from an API
    https.get(url, function(response){ 
    /* console.log(response);
    console.log(response.statusCode); // gives the status code
    response.on("data", function(data){
    console.log(data);
    });*/

   /* response.on("data", function(data){
   const weatherData = JSON.parse(data);
   const object = {
       name: "Neha",
       favfood: "Paneer"
   }
    // console.log(weatherData);
    const result = JSON.stringify(object);
    console.log(result);
    });*/

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

         // console.log(temperature +" and " + description);
         // res.send("The temp in degree celcius is "+temperature +" and the weather condition is "+ description); // this is a simple response without any html
         //res.send("<h1>The temp in degree celcius is "+temperature +" and the weather condition is "+ description +"</h1>"); // in html
         // we can have multiple res.write() but only one res.send() inside app.get()
         res.write("<p>The weather condition is " + description + "</p>");
         res.write("<h1>The temp in " + query + " in degree celcius is " + temperature + "</h1>");
         res.write("<img src = " + imageURL + ">");
         res.send();
    });

 // res.send("Server is up and running");


});


});


app.listen(3000, function(){
    console.log("server is running on port 3000");
});

// Note : console.log(response) this gives all the data including path , method(GET) and status code (200 OK)