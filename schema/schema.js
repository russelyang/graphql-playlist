const graphql = require('graphql');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLID, 
    GraphQLSchema} = graphql;

const books = [
    {name:'Name of the Wind', genre:'Fantancy', id:'1', authorId:'1'},
    {name:'The Final Empire', genre:'Fantancy', id:'2', authorId:'2'},
    {name:'The Long Earth', genre:'Sci-Fi', id:'3', authorId:'3'}
];

const authors = [
    {name:'Patrick Rothfuss', age:44, id: '1'},
    {name:'Brandon Sanderson', age:42, id: '2'},
    {name:'Terry Pratchett', age:66, id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find((element) => element.id === parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                // code to get data from db/other source
                const id = args.id;
                return books.find((element) => element.id === id);   
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                // code to get data from db/other source
                const id = args.id;
                return authors.find((element) => element.id === id);   
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});