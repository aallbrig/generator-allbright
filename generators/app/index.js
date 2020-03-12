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
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require('yeoman-generator');
const { stripIndents } = require('common-tags');
class default_1 extends Generator {
    default() {
        return __awaiter(this, void 0, void 0, function* () {
            const { log } = this;
            log();
            log(stripIndents `
        Available Commands
        ---
        yo allbright:gitignore
        yo allbright:bash-basic-script
        yo allbright:node-yeoman-generator
        yo allbright:typescript-yeoman-generator
      `);
            log();
        });
    }
}
exports.default = default_1;
;
//# sourceMappingURL=index.js.map