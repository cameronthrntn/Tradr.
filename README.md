# Tradr.

A full stack app built using HTML, CSS and React for the frontend, as well as Google Maps API and Geo Location. The backend API/Database was built using Node.js, Express, Postgress and Knex.

Tradr allows for the posting of large and small scale building/home improvement projects, and the ability to search for locally registred tradespeople to undertake the work.

Users are either able to create an account as a 'user', allowing them to post jobs to the site, or as a 'trader', allowing them to receive job offers.

When a user posts a job, they are taken to a project page that shows the location on a Google map, along with any local traders that are registered in the area. The search defaults to a 20km radius, but can be altered accordingly.

If a tradesperson receives a job offer, they are able to accept or reject the offer. If they accept, they are added to a project page, along with any other traders that have also accepted a job offer. Here, they are able to converse via a multi-way inbox system, discussing any issues the job may entail.

Traders have a more details profile page which is available to users, and contains information about their chosen trade, along with their average review score, and any corresponding reviews.

## The app was created within a team of three, working to a strict deadline of 8 working days, as a final major project for the Northcoders Developer Pathway.

## The project was undertaken with a strict TDD approach, as well as completed within an Agile environment.

## Hosted @

Hosted version of the React App: https://nc-tradr.netlify.com/

## Getting Started

1. #### In order to successfully run this app on a local machine, please install all necessary dependencies with the following:

```
npm i

```

2. ## Running the app locally requires two steps within the terminal:

```
1. Within the api directory, enter: npm run mon. This will start the local server for the back end.

2. Within the front-end directory, enter: npm start. This will start a local server for the front end.
```

3. ## When you arrive at the landing page, you will be invited to either sign in or create a new account:

```
Please note that if you are creating a user account to post a job, the current dummy data only has traders available in the Leeds area. When posting a job, please keep this in mind, as posting a job in a different part of the country will result in no traders being available. However, if you were to also register a trader account in that same area, they would then be presented in the project page for the job you originally created.
```
