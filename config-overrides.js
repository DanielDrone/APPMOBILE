const path = require('path');

module.exports = function override(config, env) {
    // Fix for paths with special characters like #
    config.output.path = path.resolve(__dirname, 'build');

    return config;
};
