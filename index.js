require('dotenv').config()
const serverless = require('serverless-http');
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors')
let app = express();
let apiRoutes = require("./api-routes");
let path = require('path');
var serveStatic = require('serve-static');

app.use(express.json());
app.enable('trust proxy');
app.use(function (req, res, next) {
    req.clientIP = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
    next();
});
app.use(cors())

app.use(express.static(path.join(__dirname, 'client/dist')));

// Heroku Mongoose connection
let connection = process.env.MONGO_URI || "mongodb+srv://dbUser:cqHFoU522X7XUlQW@cluster0.b9mte.mongodb.net/RestHub?retryWrites=true&w=majority"
mongoose.connect(connection, { useNewUrlParser: true });

// Send message for default URL
// app.get('/', async function (req, res) {
//     res.send('Hello World with Express')
// });

// Use Api routes in the App
app.use('/api', apiRoutes);
app.use(serveStatic(__dirname + "/dist"));

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

module.exports = app;
module.exports.handler = serverless(app);