const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createHash = require('./createhash.js');
const hashlen = 8;

const baseURL = process.env.BASE_URL;

const redirSchema = new Schema({
  shortURL: String,
  originalURL: String,
  createdAt: Date
});

const Redir = mongoose.model('Redir', redirSchema);

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler(req, res) {
      res.file('views/index.html');
    }
  },
  {
    method: 'GET',
    path: '/public/{file}',
    handler(req, res) {
      res.file(`public/${request.params.file}`);
    }
  },
  {
    method: 'POST',
    path: '/new',
    handler(req, res) {
      const uniqueID = createHash(hashlen);
      const newRedir = new Redir({
        shortURL: `${baseURL}/${uniqueID}`,
        originalURL: request.payload.url,
        createdAt: new Date()
      });

      newRedir.save( (err, redir) => {
        if(err) {
          res(err);
        } else {
          res(redir);
        }
      } );
    }
  }
];
