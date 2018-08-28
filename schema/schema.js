const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

const books = [
    {name:'Name of the Wind', genre:'Fantancy', id:'1'},
    {name:'The Final Empire', genre:'Fantancy', id:'2'},
    {name:'The Long Earth', genre:'Sci-Fi', id:'3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args) {
                // code to get data from db/other source
                const id = args.id;
                return books.find((element) => element.id === id);   
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});