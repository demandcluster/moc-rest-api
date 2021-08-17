const env = require("../config.js");
const getSchema = require("./getSchema.js");

const createSchema = async () => {
  const schema = await getSchema(env.GRAPHQL_URL, "./schema.graphql");
  return schema;
};
module.exports = createSchema;
