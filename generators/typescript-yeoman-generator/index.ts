import YeomanGenerator = require('yeoman-generator');
import exampleInquirerPrompts from './prompts.examples';
import { DistinctQuestion } from 'inquirer';

type generatorQuestionAnswers = {
  generatorName: string,
  yeomanMethods: string[]
};
type inquirorPromptQuestionAnswers = {
  desiredPrompt: string,
  desiredName: string,
  desiredMessage: string
};
type again = {
  again: boolean
};

export default class extends YeomanGenerator {
  private answers: generatorQuestionAnswers & {
    promptingPrompts: DistinctQuestion[];
  } = {
    generatorName: '',
    yeomanMethods: [],
    promptingPrompts: []
  };

  async _collectDataOnYeomanGenerator() {
    return this.prompt<generatorQuestionAnswers>([
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

  async _collectInquirerPrompts(inputs: inquirorPromptQuestionAnswers[] = []): Promise<inquirorPromptQuestionAnswers[]> {
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
    const { again, ...answers } = await this.prompt<inquirorPromptQuestionAnswers & again>(prompts);
    const newInputs = [ ...inputs, answers ];

    return again ? this._collectInquirerPrompts(newInputs) : newInputs;
  };

  async _ensureDefaultsForPrompt(inquirerPrompts: inquirorPromptQuestionAnswers[]) {
    return inquirerPrompts.reduce<DistinctQuestion[]>(
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

  async _createPromptingPrompts(): Promise<DistinctQuestion[]> {
    const inquirerPrompts = await this._collectInquirerPrompts();
    return await this._ensureDefaultsForPrompt(inquirerPrompts);
  }

  async prompting() {
    // Where you prompt users for options (where you’d call this.prompt())
    const { log } = this;
    log('prompting fn executed');
    const { generatorName, yeomanMethods } = await this._collectDataOnYeomanGenerator();
    this.answers = {
      ...this.answers,
      generatorName,
      yeomanMethods,
      promptingPrompts: []
    };

    if (yeomanMethods.includes('prompting')) {
      const promptingPrompts = await this._createPromptingPrompts();
      this.answers = {
        ...this.answers,
        promptingPrompts
      };
    }
  }

  async writing() {
    const fs = require('fs');
    const { answers } = this;
    const { generatorName, yeomanMethods, promptingPrompts = [] } = answers;

    const generatorTemplates = this.destinationPath(`generators/${generatorName}/templates`);
    if (!fs.existsSync(generatorTemplates)) {
      await fs.mkdirSync(
        generatorTemplates,
        { recursive: true }
      );
    }

    await this.fs.copyTpl(
      this.templatePath('yeoman-generator.ts.ejs'),
      this.destinationPath(
        `generators/${generatorName}/index.ts`),
        { yeomanMethods, promptingPrompts }
    );
  }
};