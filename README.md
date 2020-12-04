# Bug Repro for jest-preset-angular

This repo is a bug repro for https://github.com/thymikee/jest-preset-angular/issues/622 .

Repo created from https://github.com/johncrim/ng-jest-starter .

This starter project contains a single library (`ui-lib`), and no angular apps. It contains both Karma tests (`*.karma-spec.ts`) and Jest tests (`*.spec.ts`), but no
Protractor or other e2e tests.

## Debugging Jest tests in Visual Studio Code

1. In VS Code, set breakpoints in a test file or in Angular code.
2. Type `Ctrl+Shift+D` to view the Debug pane, then ensure that "Jest All" or "Jest Current File" is selected in the launch configuration.
3. Hit the F5 key to start debugging.
4. Wait for your breakpoint(s) to be hit.
