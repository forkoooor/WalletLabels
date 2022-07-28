# Saas UI Pro

## Getting started

First of all, thanks a lot for signing up!

Come say hello at [Discord](https://discord.gg/4PmJGFcAjX), I'm always around to help and your feedback will really help move the project forward.

## Roadmap

https://github.com/saas-js/saas-ui-pro/projects/1

## Storybook

https://storybook.saas-ui.pro

## Installation

In case you use this repository as a reference or for testing purposes, go ahead and clone the repo.

If you're using the repository as a template for a new project, download the source as a ZIP file, or use the `Use this template` button to create a new fresh repository without Saas UI's history.

Once you have a copy of the source on your computer, run yarn to install all dependencies.

```bash
yarn install
```

And then run the generators to generate the React Query hooks.

```bash
yarn generate
```

## Install from NPM

Instructions for installing `@saas-ui/pro` from NPM can be found in the [Storybook documentation](https://storybook.saas-ui.pro/?path=/story/docs-getting-started--page).

## Configuration

All client side app configuration files can be found in `packages/app-config`.

## Running the apps

Saas UI Pro comes with 2 example apps, Next.js, Electron.

You can start the apps from their subfolder in `apps/`, or from the project root using one of these commands:

```
yarn dev:nextjs

yarn dev:electron
```

### Authentication

The apps mocks authentication by default. Follow these steps to configure Supabase for Next.js.

#### Supabase

1. Copy `apps/nextjs/.env.example` to `apps/nextjs/.env` and add your public Supabase URL and KEY.

```
NEXT_PUBLIC_SUPABASE_URL="https://x.supabase.co"
NEXT_PUBLIC_SUPABASE_KEY="x"
```

2. Edit `apps/nextjs/src/pages/_app.tsx` and update the authservice imports.

```js
import { authService } from '../lib/supabase'
// import { authService } from '../lib/magic'
//import { authService } from '@app/config/mock-auth-service'
```

Edit `packages/app-config/src/auth.ts` to change the authentication type (magiclink/password) and add your OAuth providers.

## Project structure

Saas UI Pro makes use of workspaces and uses the following folder structure.

| Path                            | Description                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| `saas-ui`                       | All Saas UI Pro packages and components live in here.                                |
| `apps`                          | Example apps are in this folder                                                      |
| `apps/nextjs`                   | The Next.js app                                                                      |
| `apps/electron`                 | The Electron app                                                                     |
| `packages`                      | This contains all shared application code, as well as your own custom packages.      |
| `packages/app-config`           | Contains all client side configuration files.                                        |
| `packages/app-grapqhl`          | This is the Graphql api client (`react-query`), generated by `graphql-codegen`.      |
| `packages/app-nextjs`           | Next.js specific code, shared between the nextjs-app and electron-app.               |
| `packages/app`                  | This contains all application code that is shared between the example apps.          |
| `packages/app/src/modules/core` | The app's core functionality, for example layouts, that is shared across modules.    |
| `packages/app/src/modules/*`    | All resource specific code is grouped within individual modules, more on this below. |
| `packages/mock-graphql`         | A Mock Graphql server.                                                               |
| `packages/ui-storybook`         | Your storybook.                                                                      |
| `packages/ui-theme`             | Your custom Chakra UI theme. This extends the Saas UI Pro theme by default.          |
| `tooling/test-utils`            | Helper functions for testing.                                                        |

### Package naming

Packages that are prefixed with `app` or `ui` are used client side.

Serverside code should be prefixed with `api`.

`mock-graphql` is an exception here, as it can run both in client and server (for testing purposes).

### Modules

Code in Saas UI Pro is grouped by responsibility instead of type. This means that all code for for example a `Contacts` resource is
located in `modules/contacts`, including, components, hooks, contexts, etc.

## License

See [LICENSE](./LICENSE).
