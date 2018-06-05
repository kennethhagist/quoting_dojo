const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    port = 8000,
    app = express();

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/quoting_dojo');

const quoteSchema = new mongoose.Schema({
    name: String,
    quote: String
});

const Quote = mongoose.model('quotes', quoteSchema);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('welcome');
});

app.get('/quotes', function(request, response) {
    Quote.find({}, function(err, quotes) {
        if (err) { console.log(err); }
        response.render('quotes', { quotes: quotes });
    });
});

app.post('/quotes', function(request, response) {
    Quote.create(request.body, function(err) {
        if (err) { console.log(err); }
        response.redirect('/quotes');
    });
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})