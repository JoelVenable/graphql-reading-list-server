const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = require('graphql');

const { dummyBooks, dummyAuthors } = require('./dummydata');
const _ = require('lodash');


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType, resolve({ authorId }, _args) {
        return _.find(dummyAuthors, { id: authorId })
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve({ id }, args) {
        return _.filter(dummyBooks, { authorId: id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, { id }) {
        return _.find(dummyBooks, { id })
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, { id }) {
        return _.find(dummyAuthors, { id })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return dummyBooks;
      }
    }
  },
  authors: {
    type: new GraphQLList(AuthorType),
    resolve() {
      return dummyAuthors;
    }
  }
});


module.exports.schema = new GraphQLSchema({
  query: RootQuery
});