const http = require('http')
const request = require('request');
var readlineSync = require('readline-sync');
var cityName = readlineSync.question('Inter the city name : - ');
var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4dd1ac5a32c35cde09f36265c3c2cf94`

const jsonfile = require('jsonfile')

request(weatherUrl, { json: true }, (err, body) => {
        http.createServer((req, res) => {
                if (req.url === "/request") {
                        response = body.body
                        res.write(JSON.stringify(response));
                        let data = JSON.stringify(response);
                        // console.log(data)

                        let copyData = data
                        let cityNameKey = {};
                        cityNameKey[cityName] = copyData
                        // console.log(cityNameKey);

                        var data1 = {};
                        data1.weather = []


                        jsonfile.readFile("weatherData.json", (err, data2) => {
                                if (err) {
                                        console.log("Config file doesnot exist, creationg one.");
                                        data1.weather.push(cityNameKey)
                                        console.log(data1, "34567890-=-=09----------------------")
                                        jsonfile.writeFileSync('./weatherData.json', JSON.stringify(data1));
                                } else {
                                        global.config = require("./weatherData.json");
                                        jsonfile.readFile("weatherData.json", (err, contents) => {
                                                if (err) {
                                                        console.log("Config dota doesnot exist in the file.");
                                                } else {
                                                        var fileData = JSON.parse(contents)
                                                        // console.log(fileData)
                                                        var dd = fileData.weather.length
                                                        for (i = 0; i < dd; i++) {
                                                                // console.log(i)
                                                                var name = (Object.keys(fileData.weather[i]));
                                                                console.log(name)
                                                                if (cityName == name) {
                                                                        console.log("data exist...")
                                                                        break
                                                                } else {
                                                                        var fileData = JSON.parse(contents)
                                                                        console.log(fileData)
                                                                        fileData.weather.push(cityNameKey)

                                                                        jsonfile.writeFileSync('weatherData.json', JSON.stringify(fileData));
                                                                        console.log("...........................")

                                                                }
                                                        }
                                                }
                                        })
                                }
                        });
                }
                res.end();
        }).listen(3000);
        console.log("service running on 3000 port....");
}); 