# Metabase Embedding React SDK nextjs sample apps

This repository contains sample apps for nextjs 14 that uses Metabase embedding sdk react sdk.
It include an app using pages router and an app using the app router.

Note: the samples are using the sdk nextjs compatibility layer, which is available from version 0.51.11.

## Instructions

`cd` either `next-sample-app-router` or `next-sample-pages-router` and run `npm install`.

Copy `.env.sample` to `.env` and set the correct values.

Run the app with `npm run dev`.

The pages router sample will start on port 3001 and the app router sample will start on port 3002.

Both apps provide an endpoint for user authentication, replace the logic to match your authentication system.
