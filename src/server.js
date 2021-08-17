
const express = require("express");
//const bodyParser = require("body-parser");
const schema = require("../schemas/index.js");
const env = require("../config.js");
const path = require('path');
const graphqlTools = require("@graphql-tools/schema");
const { makeExecutableSchema } = graphqlTools;
const exSchema = makeExecutableSchema({ typeDefs: schema });
const chalk = require("chalk");
const log = console.log;

const GraphQL2REST = require('graphql2rest');
const { execute } = require('graphql'); // or any GraphQL execute function (assumes apollo-link by default)

const gqlGeneratorOutputFolder = path.resolve(__dirname, './gqlFilesFolder'); 
const manifestFile = path.resolve(__dirname, '../manifest.json');




const server = () => {
  const app = express();


  GraphQL2REST.generateGqlQueryFiles(exSchema, gqlGeneratorOutputFolder); // a one time pre-processing step

  const restRouter = GraphQL2REST.init(exSchema, execute, { gqlGeneratorOutputFolder, manifestFile });
  
  // restRouter now has our REST API attached
  app.use('/api', restRouter);
  
  
  app.listen(
    env.PORT,
    log(chalk.yellow(`DemandCluster MOC REST`)),
    log(
      chalk.green(
        `API Server running in ${env.NODE_ENV} mode on port ${env.PORT}`
      )
    )
  );
  process.on("unhandledRejection", (err) => {
    log(chalk.red(`Error: ${err.message}`));
    //Close server & exit process
    server.close(() => process.exit(1));
  });
};

module.exports = server;
