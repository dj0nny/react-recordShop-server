const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create mongoDB record's schema

const recordSchema = new Schema({
	title: String,
	genre: String,
	releaseYear: Number,
	bandID: String
});

module.exports = mongoose.model('Record', recordSchema);
