const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Csoki = db.model('Csoki', {
  name: String,
  status: String,
   _tulajdonos: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = Csoki;