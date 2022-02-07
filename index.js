const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDef");
const { MONGODB } = require("./config");

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("mongodb connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at port ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
