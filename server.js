var express  = require("express")
var bodyParser = require('body-parser');
var methodOverride = require('method-override')


// bring in the models
var models = require('./models')

// sync the models
models.sequelize.sync();

// Instantiate Express
var app = express();
//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}));
// override with POST having ?_method=DELETEs
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// bring in the routes
var routes = require("./controllers/burgers_controllers");

// connect the routes
app.use('/', routes);
app.use('/update', routes);
app.use('/create', routes);



// listen on port 3000
var PORT = process.env.PORT || 8000;
app.listen(PORT, function(){
    console.log("server listening on http://localhost:" + PORT)
});

console.log(module.exports)