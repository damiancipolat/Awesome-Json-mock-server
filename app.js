//Include api modules.
const http       = require('http');
const express    = require('express');
const config     = require('config');
const bodyParser = require('body-parser');

//Define events and routes.
const events = require('./events.js');
const routes = require('./routes');

//Get ip/port from config.
const port = config.get('port')||80;

//Start Express-js.
const app    = express();
const server = http.createServer(app);

//Add middlewares.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Bind routes.
app.use(routes);

//Start listen mode.
app.listen(port,()=>events.onListen(port));

//Define server "special" event to handle situations.
server.on('error',   events.onServerError);
process.on('SIGINT', ()=>events.onProcessKill(server));
process.on('SIGTERM',()=>events.onProcessKill(server));
process.on('unhandledRejection', (err)=>events.onException(err));
process.on('uncaughtException',  (err)=>events.onException(err));