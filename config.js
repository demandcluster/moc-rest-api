const { cleanEnv, str,url,num } = require('envalid');

const env = cleanEnv(process.env, {
  GRAPHQL_URL:        url({ default: 'https://api.demandcluster.com/graphql' }),
  NODE_ENV:           str({ choices: ['development', 'production' ]}),
  PORT:               num({default: 3000})
})

module.exports=env;