const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gh307a', {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;