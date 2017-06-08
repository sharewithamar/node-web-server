const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    let log = `${now} : ${req.method} : ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to update log');
        }
    });
    console.log(log);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', function (req, res) {
    res.render('home.hbs', {
        title: 'Home hbs',
        //  year: new Date().getFullYear(),
        welcome: `welcome Amar`
    });

    // res.send('<h2>Hello Amar</h2>Hello World!')
    /* res.send({
         name: 'Amar',
         likings:[
            'Coding',
            'Photography',
            'Movies',
            'History',
            'Twitter'
         ]
     });*/
});

app.get('/about', (req, res) => {
    //  res.send('About Page1');
    res.render('about.hbs', {
        title: 'about hbs',
        //  year: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: `Avv that's bad url..`
    });
});
app.listen(3000, () => {
    console.log('Server is up');
});