import yeomanEnv = require('yeoman-environment');
const [ targetGenerator = 'app' ] = process.argv.slice(2);
const env = yeomanEnv.createEnv();

env.register(
  require.resolve(`./generators/${targetGenerator}/index`),
  `allbright:${targetGenerator}`
);

env.lookup(() => {
  env.run(`allbright:${targetGenerator}`, {}, err => {});
});
