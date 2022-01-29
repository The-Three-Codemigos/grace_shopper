# The Smallest Starting Point

So, you want to build a full-stack JavaScript application with:

- An Express web server
- A PostgreSQL database
- A React front-end

And you want it to work locally as well as be easy to deploy? We've got your back!

--

# Local Development

## Setting Up

First, clone this repo locally, then remove the current `.git` folder. Follow this up with making it a new git repo.

```bash
# these commands reset your git history
rm -rf .git
git init
```

Then go to GitHub, create a new repository, and add that remote to this local repo.

Then, run `npm install` to install all node modules.

You should decide on a name for your local testing database, and edit `db/index.js` changing the value of `DB_NAME`.

Once you decide on that name, make sure to run `createdb` from your command line so it exists (and can be connected to).

Finally you can run `npm run server:dev` to start the web server.

In a second terminal navigate back to the local repo and run `npm run client:dev` to start the react server.

This is set up to run on a proxy, so that you can make calls back to your `api` without needing absolute paths. You can instead `axios.get('/api/posts')` or whatever without needing to know the root URL.

Once both dev commands are running, you can start developing... the server restarts thanks to `nodemon`, and the client restarts thanks to `react-scripts`.

## Project Structure

```bash
├── db
│   ├── models
│   │   ├── index.js
│   │   └── users.js
│   ├── index.js
│   └── init_db.js
│
├── public
│   └── index.html
│
├── routes
│   ├── apiRouter.test.js
│   └── index.js
│
├── src
│   ├── axios-services
│   │   └── index.js
│   ├── components
│   │   ├── App.js
│   │   └── index.js
│   └── index.js
│
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

`/db` contains your `index.js` which exports the client instance and your database adapter models, as well as `init_db.js` which should be run when you need to rebuild your tables and seed data.

`/public` and `/src` are the two puzzle pieces for your React front-end. `/public` contains any static files necessary for your front-end. This can include images, a favicon, and most importantly the `index.html` that is the root of your React application.

`src/axios-services` contains your axios network request adapters. `src/components` contains your React component files.

Inside `/routes` you have `index.js` which is responsible for building the `apiRouter` that you'll attach in the express server, and `apiRouter.test.js` which will give you direction on test-driven development for your api. You'll build all routes that your React application will use to send/receive data via JSON in this directory, for example, a `usersRouter.js`.

Rounding things out, we've got the top level `index.js` that creates your Express Server. This should be responsible for setting up your API, starting your server, and connecting to your database. We've also got our `.gitignore`, `package-lock.json`, and `package.json` where you'll find the scripts necessary to get your app off the ground, as well as this `README.md`.

## Command Line Tools

In addition to `client:dev` and `server:dev`, you have access to `db:build` which (you will write to) rebuilds the database, all the tables, and ensures that there is meaningful data present.

---

# Deployment

## Setting up Heroku (once)

```bash
# create your project
heroku create project-name-goes-here
# create your database instance
heroku addons:create heroku-postgresql:hobby-dev
```

This creates a heroku project which will live at https://project-name-goes-here.herokuapp.com (you'll want to replace `project-name-goes-here` with your selected project name). It will also create a postgres database for you, on the free tier.

## Configuring GitHub Actions Secrets for CI/CD

We're going to leverage continuous integration and continuous development methodologies, or CI/CD, to deploy your app. To enable CI/CD you'll need to add a few environment variables to your project repo.

Under Settings, choose the Secrets option under Security. You'll see the following dialog, and you'll be able to add a secret by selecting the `New repository secret` button. Once you create a GitHub secret you can never see it again, but you can modify it! We're going to add 3 secrets to our repo:

- `HEROKU_API_KEY`: you'll find this listed in your heroku account settings
- `HEROKU_APP_NAME`: this is the project name you chose above
- `HEROKU_EMAIL`: this is the email address associated with your heroku account

Each project group will elect one person to be the "owner" of the heroku account, and that person's api key and email address will be used to register the secrets above.

**After the bootcamp ends**, you might want to redeploy and make changes to your team's application. Once you've forked this repo to your personal GitHub Account, you can add your own HEROKU_ENV_VARs and redeploy under a different heroku app name!

## Deployment

In `.github/workflows` you'll find a YAML, an acronym for "YAML Ain't Markup Language", that triggers an automated deployment by watching your `main` branch: whenever a new pull request is merged to `main`, your app will automagically deploy itself on heroku.

Optionally, you can also trigger this deployment workflow by pushing to the `deploy` branch. Many companies use this pattern to enable hotfixes without going through the review process (creating a PR and merging it).

Note that this workflow does **not** re-seed your database. You'll need to perform some additional setup the first time you deploy your app:

1. `$ heroku login` to login to your app
2. `$ heroku config` to verify your heroku server's environment variable config
3. if you don't see `PGSSLMODE=no-verify` listed, run `$ heroku config:set PGSSLMODE=no-verify`
4. now, you can seed your database with `$ heroku run npm run db:build`

As you project grows you'll probably want to re-seed and refresh your database from time to time. Run step 4 whenever you want to re-seed.

Once that command runs, you can type `heroku open` to get a browser to open up locally with your full-stack application running remotely.
