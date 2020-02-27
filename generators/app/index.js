const Generator = require('yeoman-generator');
const { stripIndents } = require('common-tags');

module.exports = class extends Generator {
  async default() {
    const { log } = this;
    log();
    log(
      stripIndents`
        Available Commands
        ---
        yo allbright:gitignore
        yo allbright:bash-basic-script
        yo allbright:node-yeoman-generator
      `
    );
    log();
  }
};
