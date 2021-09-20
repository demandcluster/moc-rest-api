const createSchema = require( "./src/createSchema.js");
const env = require("./config.js");
const chalk = require("chalk");
const log = console.log;
const fetchSchema=async ()=>await createSchema();
log(chalk.bold(`Building GraphQL Schema from ${env.GRAPHQL_URL}`))
fetchSchema().then(()=>{
    log(chalk.green(`Saved schema from ${env.GRAPHQL_URL} to schema.graphql`))
}).catch(()=>{
    log(chalk.yellow(`Could not get schema from ${env.GRAPHQL_URL}`))
}).finally(()=>{log(chalk("---\n"));});
