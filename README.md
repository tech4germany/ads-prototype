## Wegweiser Antidiskiminierungstelle des Bundes

This repo contains the code for a decision support tool designed to advise people
in taking next steps when approaching the German Antidiscrimination agency.

The tool comes as standard react app implemented in typescript and built by default
with the parcel bundler. In its current form, it does not require a backend and is
meant to be published serverless.

Currently, the project is hosted with Netlify and can be accessed [here](https://epic-fermat-07e38c.netlify.app/).

#### Installation and Setup

1. Using ssh, clone repo to local enviroment

`git clone git@github.com:tech4germany/ads-prototype.git`

2. Navigate to repo directory and install require node modules

`cd ads-prototype && npm install`

3. Running of app
  * a) For development start with shipped create-react script

    `npm start`
  * b) Build process for production

    `npm run build:alternative`
