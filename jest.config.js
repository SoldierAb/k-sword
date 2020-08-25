const path = require('path');

module.exports = {
  "verbose": true,
  "rootDir": path.resolve(__dirname, './'),
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testMatch": [
    "**/*.(test|spec).(ts|tsx)"
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/"
  ],
  "coverageReporters": [
    "json",
    "lcov",
    "text",
    "text-summary"
  ],
};
