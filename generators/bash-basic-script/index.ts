const Generator = require('yeoman-generator');
import fs from 'fs';

module.exports = class extends Generator {
    async writing() {
        const { log } = this;
        await fs.mkdir('scripts', { recursive: true }, (err) => {
            if (err) log('create directory error...');
            if (!err) log('create directory successful!');
        });
        return fs.copyFile(
          this.templatePath('bash.sh'),
          this.destinationPath('scripts/bash.sh'),
          (err) => {
            if (err) log('file write error...');
            if (!err) log('file write successful!');
          }
        );
    }
};
