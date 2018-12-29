const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect('...'); // insert here your MongoDB connecton URL
mongoose.connection.once('open', () => {
	console.log('connected!');
});

// express middleware set up with graphQL

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

app.listen(4000, () => {
	console.log('server up on 4000');
});
