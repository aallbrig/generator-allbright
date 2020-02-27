const YeomanGenerator = require('yeoman-generator');

module.exports = class extends YeomanGenerator {

  async initializing() {
    // Your initialization methods
    // (checking current project state, getting configs, etc)
    const { log } = this;
    log('initializing fn executed');
  }

  async prompting() {
    // Where you prompt users for options (where you’d call this.prompt())
    const { log } = this;
    log('prompting fn executed');
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'generatorName',
        message: 'Desired name of new yeoman generator',
        default: 'generic-generator'
      },
      {
        type: 'checkbox',
        name: 'yeomanMethods',
        message: 'This is a "type: checkbox" inquirer prompt',
        choices: [
          { name: 'initializing', checked: false },
          { name: 'prompting', checked: true },
          { name: 'configuring', checked: false },
          { name: 'default', checked: false },
          { name: 'writing', checked: true },
          { name: 'conflicts', checked: false },
          { name: 'install', checked: false },
          { name: 'end', checked: true }
        ]
      }
    ]);
  }

  async writing() {
    // Where you write the generator specific files (routes, controllers, etc)
    const fs = require('fs');
    const { log, answers } = this;
    const { generatorName, yeomanMethods } = answers;

    const generatorRoot = this.destinationPath(`generators/${generatorName}`);
    if (!fs.existsSync(generatorRoot)) {
      await fs.mkdirSync(
        generatorRoot,
        { recursive: true }
      );
    }
    const generatorTemplates = this.destinationPath(`generators/${generatorName}/templates`);
    if (!fs.existsSync(generatorTemplates)) {
      await fs.mkdirSync(
        generatorTemplates,
        { recursive: true }
      );
    }
    await this.fs.copyTpl(
      this.templatePath('yeoman-generator.js'),
      this.destinationPath(`generators/${generatorName}/index.js`),
      { yeomanMethods }
    );
  }

};
