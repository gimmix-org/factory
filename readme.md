# Factory

> This repo has the main UI for the service.

To run in development mode:

```
yarn install
yarn dev
```

To build and run in production mode:

```
yarn install
yarn build
yarn start
```

Code structure

```
src
 ┣ app
 ┃ ┣ components
 ┃ ┃ ┣ create
 ┃ ┃ ┃ ┗ (Generator Forms)
 ┃ ┃ ┣ forms
 ┃ ┃ ┃ ┗ (Building blocks for Forms (inputs, buttons, etc))
 ┃ ┃ ┗ wallet
 ┃ ┃ ┃ ┗ (Wallet-related components)
 ┃ ┣ features
 ┃ ┃ ┗ (Application logic, hooks, utilities)
 ┃ ┣ layouts
 ┃ ┗ ┗ (Reusable container layouts)
 ┗ pages
 ┃ ┣ create
 ┃ ┃ ┗ (Pages for Generator Forms)
 ┃ ┗ (Home page and other pages)
```
