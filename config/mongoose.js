const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/grocerskart_devlopment', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
const AutoIncrement = require('mongoose-sequence')(mongoose);
db.on('error', console.error.bind(console,"Error connecting to Database"));

db.once('open',function(){
    console.log('Connected to Database');
})

module.exports = db;