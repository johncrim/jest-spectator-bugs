module.exports = {
  preset: 'jest-preset-angular',
  globals: {
  },
  testMatch: [
    "**/__tests__/**/*.+(ts|js)?(x)",
    "**/+(*.)+(spec|test).+(ts|js)?(x)"
  ],
  cacheDirectory: './.jest-cache',
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  reporters: [
    'default',
    // ['jest-junit', {
    //   outputDirectory: 'dist/test/junit/jest',
    //   outputName: 'jest-junit.xml',
    // }]
  ],
  // transform: {
  //   '^.+\\.(ts|js|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js'
  // },
  //transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es/.*)'],
  //collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: 'dist/test/coverage/jest',
  collectCoverageFrom: [
    '**/*.ts',
    '!**/node_modules/**',
    '!**/environments/**',
    '!**/test.ts',
    '!**/karma-spec.ts',
    '!**/index.ts',
    '!**/public-api.ts',
    '!**/polyfills.ts',
    '!**/main.ts',
    '!**/setup-jest.ts',
    '!**/*.module.ts'
  ],
  moduleNameMapper: {
    '^@this/([a-z\\-\/]+)': '<rootDir>/libs/$1/src/public-api.ts'
  },
  setupFilesAfterEnv: ['./test/setup-jest.ts']
};
