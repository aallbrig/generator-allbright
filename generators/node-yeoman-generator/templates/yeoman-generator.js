const YeomanGenerator = require('yeoman-generator');

module.exports = class extends YeomanGenerator {
<% if (yeomanMethods.includes('constructor')) { -%>
  constructor(args, opts) {
    // Constructor for specifying yeoman arguments and options
    super(args, opts);
  }

<% } -%>
<% if (yeomanMethods.includes('initializing')) { -%>
  async initializing() {
    // Your initialization methods
    // (checking current project state, getting configs, etc)
    const { log } = this;
    log('initializing fn executed');
  }

<% } -%>
<% if (yeomanMethods.includes('prompting')) { -%>
  async prompting() {
    // Where you prompt users for options (where you’d call this.prompt())
    const { log } = this;
    const prompts = <%- JSON.stringify(inquirerPrompts) %>;
    this.answers = await this.prompt(prompts);
    log('prompting fn executed');
  }

<% } -%>
<% if (yeomanMethods.includes('configuring')) { -%>
  async configuring() {
    // Saving configurations and configure the project
    // (creating .editorconfig files and other metadata files)
    const { log } = this;
    log('configuring fn executed');
  }

<% } -%>
<% if (yeomanMethods.includes('default')) { -%>
  async default() {
    // If the method name doesn’t match a priority, it will be pushed to this group.
    const fs = require('fs');
    const { log } = this;
    log('default fn executed');
  }

<% } -%>
<% if (yeomanMethods.includes('writing')) { -%>
  async writing() {
    // Where you write the generator specific files (routes, controllers, etc)
    const fs = require('fs');
    const { log } = this;
    log('writing fn executed');
  }

<% } -%>
<% if (yeomanMethods.includes('conflicts')) { -%>
  async conflicts() {
    // Where conflicts are handled (used internally)
    const { log } = this;
    log('conflicts fn executed');
  }

<% } -%>
<% if (yeomanMethods.includes('install')) { -%>
  async install() {
    // Where installations are run (npm, bower)
    const { log } = this;
    log('install fn executed');
  }

<% } -%>
<% if (yeomanMethods.includes('end')) { -%>
  async end() {
    // Called last, cleanup, say good bye, etc
    const { log } = this;
    log('end fn executed');
  }

<% } -%>
};
