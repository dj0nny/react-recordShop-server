const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

// create graphQL types (schemas)

// dummy data
var records = [
	{ id: '1', title: 'The Dark Side of the Moon', genre: 'Progressive Rock', releaseYear: 1973, band: '3' },
	{ id: '2', title: 'A Nigth at the Opera', genre: 'Progressive Rock', releaseYear: 1975, band: '1' },
	{ id: '3', title: 'Red', genre: 'Progressive Rock', releaseYear: 1974, band: '2' },
	{ id: '4', title: 'Island', genre: 'Progressive Rock', releaseYear: 1971, band: '2' },
	{ id: '5', title: 'Animals', genre: 'Progressive Rock', releaseYear: 1977, band: '3' }
];

var bands = [
	{ id: '1', name: 'Queen', nation: 'UK' },
	{ id: '2', name: 'King Crimson', nation: 'UK' },
	{ id: '3', name: 'Pink Floyd', nation: 'UK' }
];

const RecordType = new GraphQLObjectType({
	name: 'Record',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		genre: { type: GraphQLString },
		releaseYear: { type: GraphQLInt },
		band: {
			type: BandType,
			resolve(parent, args) {
				return _.find(bands, { id: parent.band });
			}
		}
	})
});

const BandType = new GraphQLObjectType({
	name: 'Band',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		nation: { type: GraphQLString },
		records: {
			type: new GraphQLList(RecordType),
			resolve(parent, args) {
				return _.filter(records, { band: parent.id });
			}
		}
	})
});

// query for fetching the records

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		record: {
			type: RecordType, // name of the graphQL type
			args: { id: { type: GraphQLID } }, // arguments expected when you call the query
			resolve(parent, args) {
				// MongoDB call
				return _.find(records, { id: args.id });
			}
		},
		band: {
			type: BandType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// MongoDB call
				return _.find(bands, { id: args.id });
			}
		},
		records: {
			type: new GraphQLList(RecordType),
			resolve(parent, args) {
				return records;
			}
		},
		bands: {
			type: new GraphQLList(BandType),
			resolve(parent, args) {
				return bands;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
