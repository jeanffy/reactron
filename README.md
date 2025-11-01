# Ultimate repo

## Pre-requisites

- [Moon](https://moonrepo.dev/moon)
- VSCode (optional but better with it)

## Folder structure

**.devcontainer**

Contains definition for developing in a Docker dev container. Not working for now, to be continued.

**.moon**

Contains Moon global configuration.

**apps**

Contains the different apps that this monorepo handles. An app is an executable program (not a lib), for example a web server, a command line, a desktop app, a mobile app, etc.

**libs**

Contains all the necessary libraries that are used by the apps.

Libs are organized into sub-folders named after the technology used. This may not be ideal.

## Moon

Moon handles all repo tasks:

- installation of necessary tools (Node.js, Go, etc.)
  - tools are installed in `~/.proto` folder
- installation of projects dependencies
- handling of project dependencies
- compilation, lint, test running
- start of apps
- packaging, deploying

All these tasks are triggered through Moon command line. Of course these can be triggered manually using different scripts or commands but we choose to use Moon exclusively.

## Projects

### Apps

- a web server developed in Node.js (TypeScript)
- a worker developed in Go
- a frontend developed in React (TypeScript)

### Libs

- a shared library between web server and frontend, written in TypeScript
- a library usable by the web server (Node.js only)
- a library that contains a React component (frontend only)
- a library usable by the Go command line

## Choices

### For Typescript projects

Projects in Typescript share common dependencies and configs (tsconfig, eslint, prettier, vitest). For this to work, a root package.json exists (and so a root node_modules folder). PNPM is used in workspace mode.

If this behavior is not ideal, each TypeScript project could embed its own tsconfig, eslint, etc. files to remain independent of other projects. This is totally acceptable.

### For ESLint

ESLint functions better when a `eslint.config.mjs` file is present a root of workspace (especially with VScode integration). The `eslint.config.mjs` file is just a tiny wrapper file that references the rules defined in `etc/config/eslint.rules.mjs`.

For TypeScript files, ESLint needs access to the tsconfig.json file. A all-access tsconfig file is created at root of workspace for this purpose.

TODO: find how to store `eslint.config.mjs` in `etc/config` and be able to lint projects as well as other files in the repo, through ESLint command line and through VSCode.

To check that ESLint functions properly:

- open a .ts file in the apps/server project and add a console.log() somewhere in src then in tests
  - VSCode should report a warning
  - moon server:lint should report a warning
  - moon :lint should report a warning
- open a .ts file in the libs/lib-shared project and add a console.log() somewhere in src then in tests
  - VSCode should report a warning
  - moon lib-shared:lint should report a warning
  - moon :lint should report a warning
- open a .ts file etc/config folder and add a console.log() somewhere
  - VSCode should report a warning
  - moon :lint should report a warning
- open a .ts file etc/config folder and add a console.log() somewhere
  - VSCode should report a warning
  - moon :lint should report a warning
- open a .js file etc/config folder and add a console.log() somewhere
  - VSCode should report a warning
  - moon :lint should report a warning

## Commands

- install dependencies of all projects in the workspace: `moon :install`
  - the root project will trigger script in root `moon.yml` (as PNPM is used in workspace mode this is sufficient for Typescript projects)
  - each project triggers whatever command it needs by defining an "install" task in its `moon.yml` file
- build all projects: `moon :build`
  - build one particular project: `moon <project>:build`
- lint all projects: `moon :lint`
  - lint one particular project: `moon <project>:lint`
  - fix lint errors/warnings: `moon :lint-fix`/`moon <project>:lint-fix`
- test all projects: `moon :test`
  - test one particular project: `moon <project>:test`
