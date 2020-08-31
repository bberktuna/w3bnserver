import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import path from "path"
import { PlaceResolver } from './resolvers/PlaceResolver';

const main = async () => {

  const dbOptions = await getConnectionOptions(
    process.env.NODE_ENV || 'development'
  );
  


  createConnection({...dbOptions, name: "default"})
  .then(async () => {

  const app = express();


  app.set("trust proxy", 1);


  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PlaceResolver],
      emitSchemaFile: path.resolve(__dirname, 'schema.gql')
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: true,
  });

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log("server started on localhost:4000");
  })
  }).catch(error => console.log(error));

}
  main()
