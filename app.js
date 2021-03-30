require('dotenv').config()
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const appRouter = require('./routes/router');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
let sessionStore;

const app = express();
//connect to the database: 
const uri = process.env.DB_URI


try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('connected to the database');
    //link mongo store with mongo db: 
    sessionStore = new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'sessions'
    })
} catch (error) {
    console.log(error);
}
const port = process.env.PORT || process.env.PORT2 
app.listen(port);
console.log('server start at http://localhost:' + port);

app.use(cors());

//user express session: 
app.use(session({
    secret: 'random session secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1 * (24 * 3600 * 1000), // 1day 24hours 3600sec 1000millSec
    }
}));


//allow origin from other sites : 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
})


//use body-parser:
app.use(bodyParser.json());
//set view engine:
app.set('view engine', 'ejs');
//set public folder:
app.use(express.static('public'));

//users route: 
app.use('/user', userRoute);
//app router
app.use('/', appRouter);

