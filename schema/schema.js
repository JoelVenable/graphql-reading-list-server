const { GraphQLObjectType, GraphQLInteger, GraphQLString, GraphQLSchema } = require('graphql');
const { dummybooks } = require('./dummydata');
const _ = require('lodash');


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInteger },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, { id }) {
        return _.find(dummybooks, { id })
        // get data from db

      }
    }
  }
});

module.exports.schema = new GraphQLSchema({
  query: RootQuery
});