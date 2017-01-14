var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        
        this.argument('appname', {
            type: String,
            required: false
        });

        this.appname = this.options.appname || path.basename(process.cwd());
    }
};