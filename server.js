const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    const now = new Date().toString();

    const log = `${now}:${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.get('/', (req, res) => {
    res.render('top.hbs', {
        pageTitle: "Top page",
        welcomeMessage: "Welcome to top page!",
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About page",
    });
});

// app.get('/dummy', (req, res) => {
//     res.render('dummy/dummy.hbs');
// });

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
