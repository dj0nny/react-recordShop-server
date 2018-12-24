const graphql = require('graphql');

const { GraqhQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// create graphQL types (schemas)

const RecordType = new GraqhQLObjectType({
	name: 'Record',
	fields: () => ({
		id: { type: GraphQLString },
		title: { type: GraphQLString },
		genre: { type: GraphQLString },
		releaseYear: { type: GraphQLString }
	})
});

// query for fetching the records

const RootQuery = new GraqhQLObjectType({
	name: 'RootQueryType',
	fields: {
		record: {
			type: RecordType, // name of the graphQL type
			args: { id: { type: GraphQLString } }, // arguments expected when you call the query
			resolve(parent, args) {
				// MongoDB call
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
