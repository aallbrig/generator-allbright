const Generator = require('yeoman-generator');
const { stripIndents } = require('common-tags');

module.exports = class extends Generator {
  async prompting() {
    this.prompt([
      {
        type: 'confirm',
        name: '_',
        message: stripIndents`
          Available Commands
          yo allbright:gitignore
          yo allbright:bash-basic-script`
      }
    ]);
  }
};
