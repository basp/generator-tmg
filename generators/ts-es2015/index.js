'use strict';

var Generator = require('yeoman-generator');
var path = require('path');

class TypeScriptES2015Generator extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    writing() {
        this._writeInfrastructure();
        this._writeSource();
    }

    install() {
        const devDependencies = [
            'babel-preset-es2015',
            'babelify',
            "browser-sync",
            'browserify',
            'gulp',
            'gulp-sourcemaps',
            'tsify',
            'typescript',
            'vinyl-buffer',
            'vinyl-source-stream',
        ];

        this.npmInstall(devDependencies, {
            'save-dev': true
        });
    }

    _writeInfrastructure() {
        this.fs.writeJSON('package.json', {
            name: this.appname,
            version: '0.1.0',
            private: true,
            scripts: {
                start: "cd dist && browser-sync start -server dist"
            }
        });

        this.fs.writeJSON(this.destinationPath('tsconfig.json'), {
            files: [
                'src/main.ts'
            ],
            compilerOptions: {
                noImplicitAny: true,
                target: 'es2015'
            }
        });

        this.fs.copyTpl(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js')
        );
    }

    _writeSource() {
        this.fs.copyTpl(
            this.templatePath('src/index.html'),
            this.destinationPath('src/index.html')
        );

        this.fs.copyTpl(
            this.templatePath('src/*.ts'),
            this.destinationPath('src')
        );
    }
}

module.exports = TypeScriptES2015Generator;