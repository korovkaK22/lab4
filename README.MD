# How to run "for the prod"

Just execute docker-compose up

It will run all services in containers (nodejs-sample, db).
Once db is running, nodejs-sample will be started.

# Setup
Run npm install in the terminal

# How to run for the prod

When mongoDB container is running
npm run start

If everything is fine, you will see:
"Example app listening on port localhost:8888"

# How to develop

npm run devel

# How to build

npm run build

# How to run tests

npm run test

If everything is fine, you should see the list of passed tests

# How to check coverage

npm run coverage
If everything is fine, you should see the table with coverage after passed tests