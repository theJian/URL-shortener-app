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

