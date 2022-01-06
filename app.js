const express = require("express");
const https = require('https');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
 


app.get("/", function (req,res){
    res.sendFile(__dirname +'/index.html')
})

app.post("/", function(req,res){

    const units = "metric";
    const query = req.body.cityName;
    const apiKey = "a02f9e80fd0df8a023d5a86231b01999"
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + units+ '';

    https.get(url, (response) => {

        console.log('statusCode:', response.statusCode);

        if(response.statusCode=== 404){
            res.send("Error 404");
        }


        if(response.statusCode === 200){
            response.on('data', function(data){
                const weatherData = JSON.parse(data);
                const city = weatherData.name;
                const temperature = weatherData.main.temp;  
                const description = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon;
                const imageLink = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
    
    
                res.write("<h1>The temperature in " + city + " is " + temperature + " - " + description + "</h1>");
                res.write("<p>The weather is currently " + description + "</p>");
                res.write("<img src="+imageLink+">")
                res.send();
            });
        }
        
      
    }).on('error', (e) => {
        console.error(e);
    });
})



















app.listen(3000, function(){
    console.log("Server is running on port 3000");
})