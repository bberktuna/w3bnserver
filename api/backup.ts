const SQLiteStore = connectSqlite3(session);

async function bootstrap() {
  const app = express();
app.use(
    session({
      store: new SQLiteStore({
        db: 'database.sqlite',
        concurrentDB: true
      }),
      name: 'qid',
      secret: process.env.SESSION_SECRET || 'aslkdfjoiq12312',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );

  

  // get options from ormconfig.js
  const dbOptions = await getConnectionOptions(
    process.env.NODE_ENV || 'development'
  );

  createConnection({ ...dbOptions, name: 'default' })
    .then(async () => {

      const schema = await buildSchema({
        // __dirname + '/resolvers/*.ts'
        resolvers: [PlaceResolver],
        // automatically create `schema.gql` file with schema definition in current folder
        emitSchemaFile: path.resolve(__dirname, 'schema.gql')
      });

      // Create GraphQL server
      const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
        introspection: true,
        // enable GraphQL Playground
        playground: true
      });

      apolloServer.applyMiddleware({ app, cors: true });

      const port = process.env.PORT || 4000;
      // Start the server
      app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}/graphql`);
      });
    })
    .catch(error => console.log(error));
}
bootstrap();