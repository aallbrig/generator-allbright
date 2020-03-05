const YeomanGenerator = require('yeoman-generator');
const exampleInquirerPrompts = require('./prompts.examples');

module.exports = class extends YeomanGenerator {

  async _collectDataOnYeomanGenerator() {
    return this.prompt([
      {
        type: 'input',
        name: 'generatorName',
        message: 'Desired name of new yeoman generator',
        default: 'example-generator'
      },
      {
        type: 'checkbox',
        name: 'yeomanMethods',
        message: 'Check the yeoman lifecycle methods you want',
        choices: [
          { name: 'constructor', checked: false },
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

  async _collectInquirerPrompts(inputs = []) {
    const prompts = [
      {
        type: 'list',
        name: 'desiredPrompt',
        message: 'This is a "type: checkbox" inquirer prompt',
        choices: exampleInquirerPrompts.map(({ type }) => type)
      },
      {
        type: 'input',
        name: 'desiredName',
        message: '(optional) Desired variable name?'
      },
      {
        type: 'input',
        name: 'desiredMessage',
        message: '(optional) Desired prompt message?'
      },
      {
        type: 'confirm',
        name: 'again',
        message: 'Add more prompts? ',
        default: true
      }
    ];
    const { again, ...answers } = await this.prompt(prompts);
    console.log(again);
    const newInputs = [ ...inputs, answers ];

    return again ? this._collectInquirerPrompts(newInputs) : newInputs;
  };

  async _handleCreatingPromptQuestions() {
    const inquirerPrompts = await this._collectInquirerPrompts();
    return inquirerPrompts.reduce(
      (acc, { desiredPrompt, desiredName, desiredMessage }) => ([
        ...acc,
        ...exampleInquirerPrompts
          .filter(({ type }) => type === desiredPrompt)
          .map(({ name, ...rest}) => ({ ...rest, name: desiredName ? desiredName : name }))
          .map(({ message, ...rest}) => ({ ...rest, message: desiredMessage ? desiredMessage : message }))
      ]),
      []
    );
  }

  async prompting() {
    // Where you prompt users for options (where you’d call this.prompt())
    const { log } = this;
    log('prompting fn executed');
    const { generatorName, yeomanMethods } = await this._collectDataOnYeomanGenerator();
    this.answers = {
      ...this.answers,
      generatorName,
      yeomanMethods
    };

    if (yeomanMethods.includes('constructor')) {
      const prompts = await this._handleCreatingPromptQuestions();
      this.answers = {
        ...this.answers,
        inquirerPrompts: prompts
      };
    }

    if (yeomanMethods.includes('prompting')) {
      const prompts = await this._handleCreatingPromptQuestions();
      this.answers = {
        ...this.answers,
        inquirerPrompts: prompts
      };
    }
  }

  async writing() {
    // Where you write the generator specific files (routes, controllers, etc)
    const fs = require('fs');
    const { log, answers } = this;
    const { generatorName, yeomanMethods, inquirerPrompts = [] } = answers;

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
      { yeomanMethods, inquirerPrompts }
    );
  }

};
