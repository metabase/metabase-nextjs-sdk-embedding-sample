> [!IMPORTANT]  
> **To use your own Metabase**, use the release branch that matches your Metabase Enterprise Edition's major version. For example, if you're using Metabase 1.53.x, use the `53-stable` branch. [More info](https://www.metabase.com/docs/latest/embedding/sdk/version).
> 
> **To spin up a new Metabase**, you can use any version branch and run the sample app in the [Docker container](#run-both-apps--a-sample-metabase-proenterprise-instance-in-docker) with the corresponding version of Metabase. You'll need a Pro/Enterprise token, which you can get with a [free trial of Pro](https://www.metabase.com/pricing/)..

# Metabase Embedding React SDK nextjs sample apps

This repository contains sample apps for Next.js 14 that uses Metabase Embedding SDK.
It includes an app using pages router and an app using the app router.

Note: the samples are using the sdk Next.js compatibility layer, which is available from version 0.51.11.

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
- Start all services in Docker with `yarn start`

It will:
- poll a Metabase image and run it
- build and run both `next-sample-app-router` and `next-sample-pages-router` apps

The pages router sample will start on port 4401 and the app router sample will start on port 4400.

## Authentication

Both apps provide an endpoint for user authentication, replace the logic to match your authentication system.
