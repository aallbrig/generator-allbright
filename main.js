const yeoman = require('yeoman-environment');
const env = yeoman.createEnv();

const [ targetGenerator = 'app' ] = process.argv.slice(2);

env.register(
  require.resolve(`./generators/${targetGenerator}/index.js`),
  `allbright:${targetGenerator}`
);

env.lookup(() => {
  env.run(`allbright:${targetGenerator}`, {}, err => {});
});
