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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require('yeoman-generator');
const fs_1 = __importDefault(require("fs"));
module.exports = class extends Generator {
    writing() {
        return __awaiter(this, void 0, void 0, function* () {
            const { log } = this;
            yield fs_1.default.mkdir('scripts', { recursive: true }, (err) => {
                if (err)
                    log('create directory error...');
                if (!err)
                    log('create directory successful!');
            });
            return fs_1.default.copyFile(this.templatePath('bash.sh'), this.destinationPath('scripts/bash.sh'), (err) => {
                if (err)
                    log('file write error...');
                if (!err)
                    log('file write successful!');
            });
        });
    }
};
//# sourceMappingURL=index.js.map