> [!IMPORTANT]
> **To use your own Metabase**, use the release branch that matches your Metabase Enterprise Edition's major version. For example, if you're using Metabase 1.53.x, use the `53-stable` branch. [More info](https://www.metabase.com/docs/latest/embedding/sdk/version).
>
> **To spin up a new Metabase**, you can use any version branch and run the sample app in the [Docker container](#run-both-apps--a-sample-metabase-proenterprise-instance-in-docker) with the corresponding version of Metabase. You'll need a Pro/Enterprise token, which you can get with a [free trial of Pro](https://www.metabase.com/pricing/)..

# Metabase Embedding React SDK nextjs sample apps

This repository contains sample apps for Next.js 14 that uses Metabase Embedding SDK.
It includes an app using pages router and an app using the app router.

Note: Please use Metabase version 57 or above to test these sample apps.

## Instructions

### Manual run with your existing Metabase Pro/Enterprise instance

This option should be used if you want to test Metabase Embedding SDK with your existing data.

`cd` either `next-sample-app-router` or `next-sample-pages-router`.

From this directory:
- Copy `.env.sample` to `.env` and set the correct values
- Run `npm install`
- Run the app with `npm run dev`

The app router sample will start on port 3001 and the app router sample will start on port 3002.

### Run both apps + a sample Metabase Pro/Enterprise instance in Docker

This option should be used if you don't want to test Metabase Embedding SDK with your existing Metabase Pro/Enterprise instance for some reason.

From the root directory:
- Copy `.env.docker.example` to `.env.docker` and replace `<your_enterprise_token>` with your premium embedding token
- Start all services in Docker with `yarn docker:up`

It will:
- Poll a Metabase image and run it
- Build and run containers with both `next-sample-app-router` and `next-sample-pages-router` apps and run it

The pages router sample will start on port 4401 and the app router sample will start on port 4400.

#### Local development (For Metabase developers)

- To run containers with a locally built `metabase.jar`, copy it to the `./local-dist` folder as `./local-dist/metabase.jar`.
- To run containers with a locally built Embedding SDK package, copy it to the `./local-dist` folder as `./local-dist/embedding-sdk`.
- Run `yarn docker:local-dist:up` to start containers and use locally built dist from the `./local-dist` folder.
- To remove containers and images completely run `yarn docker:rm`.

## Authentication

Both apps provide an endpoint for user authentication, replace the logic to match your authentication system.
