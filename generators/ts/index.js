'use strict';

var Generator = require('yeoman-generator');
var path = require('path');

class TypeScriptGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('appname', {
            type: String,
            required: false
        });

        this.appname = this.options.appname || path.basename(process.cwd());
    }

    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'appname',
            message: 'Application name',
            default: this.appname
        }
        ]).then(answers => {
            this.appname = answers.appname;
        });
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

module.exports = TypeScriptGenerator;

/*
module.exports = Generator.extend({
    writing: {
        'html': function () {
            this.fs.copyTpl(
                this.templatePath('src/index.html'),
                this.destinationPath('src/index.html')
            );
        },

        'script': function () {
            this.fs.copyTpl(
                this.templatePath('src/*.ts'),
                this.destinationPath('src')
            );
        },

        'tsconfig.json': function () {
            this.fs.writeJSON(this.destinationPath('tsconfig.json'), {
                files: [
                    'src/main.ts'
                ],
                compilerOptions: {
                    noImplicitAny: true,
                    target: 'es2015'
                }
            });
        },

        'karma.conf.js': function () {
            this.fs.copyTpl(
                this.templatePath('_karma.conf.js'),
                this.destinationPath('karma.conf.js')
            );
        },

        'gulpfile.js': function () {
            this.fs.copyTpl(
                this.templatePath('gulpfile.js'),
                this.destinationPath('gulpfile.js')
            );
        }
    },

    install: function () {
        const devDependencies = [
            '@types/jasmine',
            '@types/jquery',
            'babel-preset-es2015',
            'babelify',
            'browserify',
            'gulp',
            'gulp-sourcemaps',
            'gulp-uglify',
            'gulp-util',
            'jasmine-core',
            'karma',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-typescript',
            'tsify',
            'typescript',
            'vinyl-buffer',
            'vinyl-source-stream',
            'watchify'
        ];

        this.npmInstall(devDependencies, { 'save-dev': true });
    }
});
*/