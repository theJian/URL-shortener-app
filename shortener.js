const Hapi = require('hapi');
const server = new Hapi.Server();
const routes = require('./routes.js');
const mongoose = require('mongoose');
const mongoURL = process.env.MONGOURL;

mongoose.connect(mongoURL, {
  server: {
    socketOptions: { keepAlive: 5 * 60 * 1000, connectTimeoutMS: 30 * 1000 }
  },
  replset: {
    socketOptions: { keepAlive: 5 * 60 * 1000, connectTimeoutMS: 30 * 1000 }
  }
});

const db = mongoose.Connection;

/*
 * Server Initialization
 */
server.connection({
  port: process.env.PORT || 3000,
  routes: { cors: true }
});

server.register(require('inert'), err => {
  db.on('error', console.error.bind(console, 'connection error: '))
    .once('open', () => {
      server.route(routes);

      server.start( err => {
        if(err) throw err;

        console.log( 'Server running at port', server.info.port );
      } );
    });
});
