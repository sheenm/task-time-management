[![Greenkeeper badge](https://badges.greenkeeper.io/sheenm/task-time-management.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/sheenm/task-time-management.svg?branch=dev)](https://travis-ci.org/sheenm/task-time-management)

## Simple time tracker (Todo app name 😉)

Does 1 thing and does it well. Helps you to track your time you spent on projects. Currently in alpha.

While building this project I aim to maintain as much of accessebility as I can. The project can be navigated with keyboard only. Also, all dialogs has its own routes so you can safely reload your page or open it in a new tab and you will not lose your dialogs 😎

Now this project doesn't have any server so it simply saves data to browser's local storage (temporary, and the code may not be optimized in services)

## Getting started

1. Clone the repository
2. Install packages with `yarn` command

Congragulations! Now you can

- Check storybook components with `yarn storybook` command
- Launch project  with `yarn start` command
- Launch tests with `yarn test` command
- Build for production with `yarn build` command

## Technologies/Libraries used in the project

- [React](https://reactjs.org/) - amazing Javascript library for building user interfaces
- [Reach Router](https://reach.tech/router) - Router for React built with accessibility in mind
- [Typescript](http://www.typescriptlang.org/) - Typed superset of Javasript
- [Storybook](https://storybook.js.org/) - development environment for UI components
- [Jest](https://jestjs.io/) - Javascript testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) - simple and complete React DOM testing utilities that encourage good testing practices
- [ESLint](https://github.com/eslint/eslint) - Javascript/Typescript linter
- [BlueprintJs](https://blueprintjs.com/) - React-based UI toolkit for the web.

## Project navigator

- `components` - React components
- `pages` - React components used in page navigation.
- `hooks` - reusable React hooks
- `services` - services which helps to access data
- `stories` - stories for storybook
- `typings` - d.ts modules for typing app
- `utils` - utility functions

## Documentation

- [Glossary](https://github.com/sheenm/task-time-management/blob/dev/Glossary.md)
- [Code conventions](https://github.com/sheenm/task-time-management/blob/dev/Conventions.md)
