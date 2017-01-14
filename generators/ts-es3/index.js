const Generator = require('yeoman-generator');
const _ = require('lodash');

class TypeScriptES3Generator extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    writing() {
        this._writePackageConfig();
        this._writeTypeScriptConfig();
    }

    _writePackageConfig() {
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            { appname: _.kebabCase(this.appname) }
        );
    }

    _writeTypeScriptConfig() {
        this.fs.copyTpl(
            this.templatePath('_tsconfig.json'),
            this.destinationPath('tsconfig.json')
        );
    }
}

module.exports = TypeScriptES3Generator;