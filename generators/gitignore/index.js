const Generator = require('yeoman-generator');
const inquirer = require('inquirer');
const fs = require('fs');
const curry = require('ramda').curry;

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
const into_single_string = (prev, curr) => `${prev}\n${curr}`;
const prepend_correct_folder_prefix = curry((sourceFiles, targetFiles, mapFn) =>
    sourceFiles
        .filter(_ => targetFiles.includes(_))
        .map(mapFn)
);

module.exports = class extends Generator {
    async prompting() {
        const os_folder = this.templatePath('os');
        const ide_folder = this.templatePath('ide');
        const language_folder = this.templatePath('language');

        const [ os_files, ide_files, language_files ] = await Promise.all(
            [os_folder, ide_folder, language_folder].map(directory_reader_promise)
        );

        // Using reduce instead of map so inquirer.Separator('section title') won't exist if no files are pulled from directory
        const which_git_ignores_to_include = ignore_inclusion_question_generator([
            ...os_files.reduce(into_array, [new inquirer.Separator(' = OS Specific = ')]),
            ...ide_files.reduce(into_array, [new inquirer.Separator(' = IDE Specific = ')]),
            ...language_files.reduce(into_array, [new inquirer.Separator(' = Language Specific = ')])
        ]);

        const questions = [ which_git_ignores_to_include ];

        this.files_read = { os_files, ide_files, language_files };
        this.answers = await this.prompt(questions);
    }

    async writing() {
        const { log, files_read: { os_files, ide_files, language_files }, answers: { included_git_ignore }} = this;

        const prepend_fn_loaded_with_response = prepend_correct_folder_prefix(included_git_ignore);
        const os_selections = prepend_fn_loaded_with_response(os_files, _ => this.templatePath(`os/${_}`));
        const ide_selections = prepend_fn_loaded_with_response(ide_files, _ => this.templatePath(`ide/${_}`));
        const language_selections = prepend_fn_loaded_with_response(language_files, _ => this.templatePath(`language/${_}`));

        const selection_paths = [
            ...os_selections,
            ...ide_selections,
            ...language_selections
        ];

        const all_file_contents = await Promise.all(selection_paths.map(file_reader_promise));
        const single_ignore_file_content = all_file_contents.reduce(into_single_string, "");

        fs.writeFile(this.destinationPath('.gitignore'), single_ignore_file_content, (err) => {
            if (err) log('file write error...');
            log('file write successful!');
        });
    }
};
