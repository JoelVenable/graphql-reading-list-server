const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = require('graphql');


const Book = require('../models/book');
const Author = require('../models/author');


const _ = require('lodash');


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType, resolve({ authorId }, _args) {
        //return _.find(dummyAuthors, { id: authorId })
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
        //return _.filter(dummyBooks, { authorId: id });
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
        //return _.find(dummyBooks, { id })
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, { id }) {
        //return _.find(dummyAuthors, { id })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        //return dummyBooks;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        // return dummyAuthors;
      }
    }
  }
});


const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, { name, age }) {
        let author = new Author({
          name,
          age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID }
      },
      resolve(parent, { name, genre, authorId }) {
        let book = new Book({
          name,
          genre,
          authorId
        });
        return book.save();
      }
    }
  }
})

module.exports.schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});