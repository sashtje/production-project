# 🚀 production-project

## Launch the project

```
npm ci - to install dependencies
npm run start:dev or npm run start:dev:vite - to launch client and backend part of the project
```
----

## Scripts

- `npm run start` - Running a client part on webpack dev server
- `npm run start:vite` - Running a client part on vite
- `npm run start:dev` - Running a client part on webpack and a backend part
- `npm run start:dev:vite` - Running a client part on vite and a backend part
- `npm run start:dev:server` - Running a backend server
- `npm run build:prod` - Build in prod mode
- `npm run build:dev` - Build in dev mode (without minimization)
- `npm run prettier` - Running prettier on .ts and .tsx files
- `npm run lint:ts` - Running eslint on .ts and .tsx files
- `npm run lint:ts:fix` - Running eslint fix on .ts and .tsx files
- `npm run lint:scss` - Running stylelint on style files
- `npm run lint:scss:fix` - Running stylelint fix on style files
- `npm run test:unit` - Running unit tests with jest
- `npm run test:e2e` - Running e2e tests with Cypress
- `npm run test:ui` - Running screenshots tests with loki
- `npm run test:ui:ok` - Confirmation of new screenshots
- `npm run test:ui:ci` - Running screenshots tests in CI
- `npm run test:ui:json` - Generating a json report for screenshot tests
- `npm run test:ui:html` - Generating HTML report for screenshot tests
- `npm run test:ui:report` - Generating a full report for screenshot tests
- `npm run storybook` - Running storybook
- `npm run storybook:build` - Build storybook
- `npm run prepare` - Pre-commit hooks
- `npm run postinstall` - Deleting cache in node_modules
- `npm run remove-feature` - Remove feature from code

----

## Project architecture

The project is written in accordance with [FSD (Feature sliced design)](https://feature-sliced.design/ru/docs/get-started/overview)

----

## Working with translations

The project uses the [i18next](https://www.i18next.com/) library to work with translations.
Translation files are stored in public/locales.

For comfortable work, we recommend installing the plugin for webstorm/vscode **I18nSupport**.

----

## Tests

The project uses 4 types of tests:
1) Regular unit tests on jest - `npm run test:unit`
2) Component tests with React testing library -`npm run test:unit`
3) Screenshot testing with loki `npm run test:ui`
4) e2e testing with Cypress `npm run test:e2e`

[Read more about tests](/docs/tests.md)

----

## Linting

The project uses eslint to check typescript code and stylelint to check style files.

Also for strict control of the main architectural principles it uses own eslint plugin [**eslint-plugin-fsd-checker**](https://github.com/sashtje/eslint-plugin-fsd-checker),
which consists 3 rules:
1) **path-checker** - prohibits the use of absolute imports within one module;
2) **public-api-imports** - allows import from other modules only from public api. Has auto fix;
3) **layer-imports** - checks the correct use of layers in terms of FSD (import from overlying layers cannot be used in underlying layers);

----

## Running linters

- `npm run lint:ts` - Running eslint on .ts and .tsx files
- `npm run lint:ts:fix` - Running eslint fix on .ts and .tsx files
- `npm run lint:scss` - Running stylelint on style files
- `npm run lint:scss:fix` - Running stylelint fix on style files линтером

----

## Storybook

The project describes story cases for each component.
Requests to the server are mocked using storybook-addon-mock.

A file with story cases is created next to the component with the extension .stories.tsx

The storybook can be running with the command:
- `npm run storybook`

[Read more about Storybook](/docs/storybook.md)

----

## Project configuration

For development, the project contains 2 configs:
1. `Webpack` - ./config/build
2. `vite` - vite.config.ts

Both builders are adapted to the main features of the application.

All configuration of webpack is stored in /config
- /config/babel - babel
- /config/build - configuration of webpack
- /config/jest - configuration of tests
- /config/storybook - configuration of storybook

The folder `scripts` contains various scripts for refactoring and report generation.

----

## CI pipeline and pre commit hooks

The Github actions configuration is in /.github/workflows.
All types of tests, project building and storybook assembly, and linting are run in ci.

In precommit hooks we check the project with linters, config is located in /.husky

----

## Working with data

Interaction with data is carried out using the **Redux Toolkit**.
If possible, reused entities should be normalized using EntityAdapter

Requests to the server are sent using [**RTK query**](/src/shared/api/rtkApi.ts)

For asynchronous connection of reducers (so as not to pull them into a common bundle) it is used
[**DynamicModuleLoader**](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

----

## Working with data

Use of features is allowed only with the helper "toggleFeatures". It accepts an object with options:

```javascript
{
  name: string; // feature flag name
    on: () => T; // a function that will work after enabling the feature
    off: () => T; // a function that will work after disabling the feature
}
```

To automatically remove a feature, use  `scripts/remove-feature.ts` in the following format:
`ts-node scripts/remove-feature.ts feature-name feature-state`

Feature state can take only one of two values: **on** or **off**.

----

## Entities

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Counter](/src/entities/Counter)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

----

## Features

- [addCommentForm](/src/features/addCommentForm)
- [articlePageGreeting](/src/features/articlePageGreeting)
- [articleRating](/src/features/articleRating)
- [articleRecommendationsList](/src/features/articleRecommendationsList)
- [articleSortSelector](/src/features/articleSortSelector)
- [articleTypeTabs](/src/features/articleTypeTabs)
- [articleViewSelector](/src/features/articleViewSelector)
- [authByUsername](/src/features/authByUsername)
- [avatarDropdown](/src/features/avatarDropdown)
- [editableProfileCard](/src/features/editableProfileCard)
- [LangSwitcher](/src/features/LangSwitcher)
- [notificationButton](/src/features/notificationButton)
- [ThemeSwitcher](/src/features/ThemeSwitcher)
- [UI](/src/features/UI)
- [uiDesignSwitcher](/src/features/uiDesignSwitcher)

----
