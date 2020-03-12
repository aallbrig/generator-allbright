"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const YeomanGenerator = require("yeoman-generator");
const prompts_examples_1 = __importDefault(require("./prompts.examples"));
class default_1 extends YeomanGenerator {
    constructor() {
        super(...arguments);
        this.answers = {
            generatorName: '',
            yeomanMethods: [],
            promptingPrompts: []
        };
    }
    _collectDataOnYeomanGenerator() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    _collectInquirerPrompts(inputs = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const prompts = [
                {
                    type: 'list',
                    name: 'desiredPrompt',
                    message: 'This is a "type: checkbox" inquirer prompt',
                    choices: prompts_examples_1.default.map(({ type }) => type)
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
            const _a = yield this.prompt(prompts), { again } = _a, answers = __rest(_a, ["again"]);
            const newInputs = [...inputs, answers];
            return again ? this._collectInquirerPrompts(newInputs) : newInputs;
        });
    }
    ;
    _ensureDefaultsForPrompt(inquirerPrompts) {
        return __awaiter(this, void 0, void 0, function* () {
            return inquirerPrompts.reduce((acc, { desiredPrompt, desiredName, desiredMessage }) => ([
                ...acc,
                ...prompts_examples_1.default
                    .filter(({ type }) => type === desiredPrompt)
                    .map((_a) => {
                    var { name } = _a, rest = __rest(_a, ["name"]);
                    return (Object.assign(Object.assign({}, rest), { name: desiredName ? desiredName : name }));
                })
                    .map((_a) => {
                    var { message } = _a, rest = __rest(_a, ["message"]);
                    return (Object.assign(Object.assign({}, rest), { message: desiredMessage ? desiredMessage : message }));
                })
            ]), []);
        });
    }
    _createPromptingPrompts() {
        return __awaiter(this, void 0, void 0, function* () {
            const inquirerPrompts = yield this._collectInquirerPrompts();
            return yield this._ensureDefaultsForPrompt(inquirerPrompts);
        });
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            // Where you prompt users for options (where you’d call this.prompt())
            const { log } = this;
            log('prompting fn executed');
            const { generatorName, yeomanMethods } = yield this._collectDataOnYeomanGenerator();
            this.answers = Object.assign(Object.assign({}, this.answers), { generatorName,
                yeomanMethods, promptingPrompts: [] });
            if (yeomanMethods.includes('prompting')) {
                const promptingPrompts = yield this._createPromptingPrompts();
                this.answers = Object.assign(Object.assign({}, this.answers), { promptingPrompts });
            }
        });
    }
    writing() {
        return __awaiter(this, void 0, void 0, function* () {
            const fs = require('fs');
            const { answers } = this;
            const { generatorName, yeomanMethods, promptingPrompts = [] } = answers;
            const generatorTemplates = this.destinationPath(`generators/${generatorName}/templates`);
            if (!fs.existsSync(generatorTemplates)) {
                yield fs.mkdirSync(generatorTemplates, { recursive: true });
            }
            yield this.fs.copyTpl(this.templatePath('yeoman-generator.ts.ejs'), this.destinationPath(`generators/${generatorName}/index.ts`), { yeomanMethods, promptingPrompts });
        });
    }
}
exports.default = default_1;
;
//# sourceMappingURL=index.js.map