const path = require('path');
console.log('-----',path.join(__dirname, 'build/'));
module.exports = function () {
    return {
        devServer: {
            stats: 'errors-only',
            port: 9000,
            contentBase: path.join(__dirname, 'build/'),
        }
    }
};



