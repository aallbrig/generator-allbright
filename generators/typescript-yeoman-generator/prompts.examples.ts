import inquirer = require('inquirer');

export const promptsExamples: inquirer.DistinctQuestion[] = [
  {
    type: 'confirm',
    name: 'confirmPrompt',
    message: 'This is a "type: confirm" inquirer prompt',
    default: true
  },
  {
    type: 'input',
    name: 'inputPrompt',
    message: 'This is a "type: input" inquirer prompt',
    default: 'default input response'
  },
  {
    type: 'number',
    name: 'numberPrompt',
    message: 'This is a "type: number" inquirer prompt',
    default: 1337
  },
  {
    type: 'list',
    name: 'listPrompt',
    message: 'This is a "type: list" inquirer prompt',
    default: 'choice A',
    choices: [
      'choice A',
      'choice B',
      'choice C'
    ]
  },
  {
    type: 'rawlist',
    name: 'rawlistPrompt',
    message: 'This is a "type: rawlist" inquirer prompt',
    default: 'choice A',
    choices: [
      'choice A',
      'choice B',
      'choice C'
    ]
  },
  {
    type: 'checkbox',
    name: 'checkboxPrompt',
    message: 'This is a "type: checkbox" inquirer prompt',
    default: 'choice A',
    choices: [
      'choice A',
      'choice B',
      'choice C'
    ]
  },
  {
    type: 'expand',
    name: 'expandPrompt',
    message: 'This is a "type: expand" inquirer prompt',
    choices: [
      {
        key: 'y',
        name: 'Overwrite',
        value: 'overwrite'
      },
      {
        key: 'a',
        name: 'Overwrite this one and all next',
        value: 'overwrite_all'
      },
      {
        key: 'd',
        name: 'Show diff',
        value: 'diff'
      },
      new inquirer.Separator(),
      {
        key: 'x',
        name: 'Abort',
        value: 'abort'
      }
    ]
  },
];

export default promptsExamples;