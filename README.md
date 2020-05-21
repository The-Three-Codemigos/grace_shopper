# The Smallest Starting Point

So, you want to build a full-stack JavaScript application with:

- An Express web server
- A PostgreSQL database
- A React front-end

And you want it to work locally as well as be easy to deploy?

We've got your back:

## Local Development

### Setting Up

First, clone this repo locally, then remove the current `.git` folder. Follow this up with making it a new git repo.

```bash
rm -rf .git

git init
```

Then go to GitHub, create a new repository, and add that remote to this local repo.

Then, run `npm init` to install all node modules.

You should decide on a name for your local testing database, and edit `db/index.js` changing the value of `DB_NAME`.

Once you decide on that name, make sure to run `createdb` from your command line so it exists (and can be connected to).

Finally you can run `npm run server:dev` to start the web server.

In a second terminal navigate back to the local repo and run `npm run client:dev` to start the react server. 

This is set up to run on a proxy, so that you can make calls back to your `api` without needing absolute paths. You can instead `axois.get('/api/posts')` or whatever without needing to know the root URL.

Once both dev commands are running, you can start developing... the server restarts thanks to `nodemon`, and the client restarts thanks to `react-scripts`.

### Project Structure

```bash
├── db
│   ├── index.js
│   └── init_db.js
├── index.js
├── package.json
├── public
│   └── index.html
├── routes
│   └── index.js
└── src
    ├── api
    │   └── index.js
    ├── components
    │   ├── App.js
    │   └── index.js
    └── index.js
```

Top level `index.js` is your Express Server. This should be responsible for setting up your API, starting your server, and connecting to your database.

Inside `/db` you have `index.js` which is responsible for creating all of your database connection functions, and `init_db.js` which should be run when you need to rebuild your tables and seed data.

Inside `/routes` you have `index.js` which is responsible for building the `apiRouter`, which is attached in the express server. This will build all routes that your react app will use to send/receive data.

### Command Line Tools

## Deployment

### Getting Ready to Deploy

### Deploying

### Post-Deployment
