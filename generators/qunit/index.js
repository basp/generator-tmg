var Generator = require('yeoman-generator');
var _ = require('lodash');

class QUnitGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('testdir', {
            type: String,
            required: false
        });

        this.testdir = this.options.testdir || 'src';
    }

    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'testdir',
            message: 'test directory',
            default: this.testdir,
        }]).then(answers => {
            this.testdir = answers.testdir;
        });
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('src/_tests.html'),
            this.destinationPath(`${this.testdir}/tests.html`),
            { appname: _.capitalize(this.appname) }
        );

        this.fs.copyTpl(
            this.templatePath('src/tests.js'),
            this.destinationPath(`${this.testdir}/tests.js`)
        );
    }

    install() {
        this.npmInstall('qunit', {
            'save-dev': true
        });
    }
}

module.exports = QUnitGenerator;