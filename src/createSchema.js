const env = require("../config.js");
const getSchema = require("./getSchema.js");
const  GraphQL2REST = require('graphql2rest');
const {buildSchema} = require('graphql');

const  GQL_FILES_FOLDER = './src/gqlFilesFolder'; // this is where .gql files will be stored

const createSchema = async () => {
  const schema = await getSchema(env.GRAPHQL_URL, "./schema.graphql");
  //const builtSchema=buildSchema(schema)
  // a one-time pre-processing step:
 // GraphQL2REST.generateGqlQueryFiles(builtSchema, GQL_FILES_FOLDER);
 GraphQL2REST.generateGqlQueryFiles(schema,GQL_FILES_FOLDER);

  return schema;
};
module.exports = createSchema;
