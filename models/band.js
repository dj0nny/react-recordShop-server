const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create mongoDB band's schema

const bandSchema = new Schema({
	name: String,
	nation: String
});

module.exports = mongoose.model('Band', bandSchema);
