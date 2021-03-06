var request = require("request"),
    chalk = require('chalk');

var API_TOKEN = require('../local').token;
var URL = 'www.toggl.com/api/v8/time_entries';
var AUTH_URL = 'https://' + API_TOKEN + ':api_token@' + URL;
console.log(chalk.blue(AUTH_URL));


var weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

request.get(AUTH_URL, function(err, response, body) {
    if(err) console.log(chalk.red(err));

    var json = JSON.parse(body);
    console.log('found', chalk.cyan(json.length), 'entries');
    console.log('keys:', chalk.yellow(JSON.stringify(Object.keys(json[0]))));
    json.forEach(function(entry) {
        console.log(
            chalk.magenta(entry.id),
            
            chalk.green(weekday[new Date(entry.start).getDay()]),
            chalk.green(new Date(entry.start).getMonth()),
            chalk.green(new Date(entry.start).getYear()),
            chalk.red(Date.parse(entry.stop)),
            chalk.blue(entry.description)

/*            entry.id,
            entry.guid,
            entry.wid,
            entry.duronly*/
            
        );
    });
    
});
