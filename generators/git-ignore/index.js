const Generator = require('yeoman-generator');
const inquirer = require('inquirer');
const fs = require('fs');

const directory_reader_promise = (target_folder) => new Promise((res, rej) => {
    fs.readdir(target_folder, (err, files) => {
        if (err) rej(err);

        res(files);
    });
});
const file_reader_promise = (target_path) => new Promise((res, rej) => {
    fs.readFile(target_path, (err, contentBuffer) => {
        if (err) rej(err);

        res(contentBuffer.toString('utf8'));
    })
});
const ignore_inclusion_question_generator = (choices = []) => ({
    type: 'checkbox',
    message: 'Git ignore info to include (space to toggle)',
    name: 'included_git_ignore',
    choices
});

const into_array = (prev, current) => ([...prev, current]);

module.exports = class extends Generator {

    async prompting() {
        const { log } = this;

        const os_folder = this.templatePath('os');
        const ide_folder = this.templatePath('ide');
        const language_folder = this.templatePath('language');

        const [os_files, ide_files, language_files] = await Promise.all(
            [os_folder, ide_folder, language_folder].map(directory_reader_promise)
        );

        const which_git_ignores_to_include = ignore_inclusion_question_generator([
            ...os_files.reduce(into_array, [new inquirer.Separator(' = OS Specific = ')]),
            ...ide_files.reduce(into_array, [new inquirer.Separator(' = IDE Specific = ')]),
            ...language_files.reduce(into_array, [new inquirer.Separator(' = Language Specific = ')])
        ]);

        const questions = [which_git_ignores_to_include];
        const { included_git_ignore } = await this.prompt(questions);

        // TODO: below "filter/map" chain looks like it could be abstracted
        const os_selections = included_git_ignore
            .filter(_ => os_files.includes(_))
            .map(_ => this.templatePath(`os/${_}`));
        const ide_selections = included_git_ignore
            .filter(_ => ide_files.includes(_))
            .map(_ => this.templatePath(`ide/${_}`));
        const language_selections = included_git_ignore
            .filter(_ => language_files.includes(_))
            .map(_ => this.templatePath(`language/${_}`));
        // /TODO

        const selection_paths = [
            ...os_selections,
            ...ide_selections,
            ...language_selections
        ];

        const all_file_contents = await Promise.all(selection_paths.map(file_reader_promise));
        const single_ignore_file_content = all_file_contents.reduce((prev, curr) => `${prev}\n${curr}`, "");

        fs.writeFile(this.destinationPath('.gitignore'), single_ignore_file_content, (err) => {
            if (err) log('file write error...');
            log('file write successful!');
        });
    }
};
