const express = require('express');
const graphHttpServer = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphHttpServer({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('server is running on 4000');
});