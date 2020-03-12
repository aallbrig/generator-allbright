const Generator = require('yeoman-generator');
const { stripIndents } = require('common-tags');

export default class extends Generator {
  async default() {
    const { log } = this;
    log();
    log(
      stripIndents`
        Available Commands
        ---
        yo allbright:gitignore
        yo allbright:bash-basic-script
        yo allbright:typescript-yeoman-generator
      `
    );
    log();
  }
};
