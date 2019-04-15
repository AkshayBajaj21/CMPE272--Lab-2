const {defaults} = require('jest-config');

module.exports = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    verbose: true,
    setupFiles: ['<rootDir>/tests/shim.js','<rootDir>/tests/setup.js'],
    
}
