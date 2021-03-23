# Project Management Framework Backend

This repository contains code for the frontend part of the application. The frontend is written in
JavaScript and JSX using React.

## Building the Project

### Prerequisites

First, you'll need to install the dependency management tool:

- [`npm`](https://docs.npmjs.com/)

### Building and Running

In the project directory, run `npm install` to install the necessary packages and then `npm run start:dev`
to run the application. Running this command on your computer will run the application on port 8080
which is the port the frontend application will be listening for.

> Note: Running `npm run build` is not necessary.

#### More configurations

If running on your local computer you will need to ensure you have MYSQL installed if not already
and create the database and give it a name e.g. project_management and then change it in the
varaiables. This is shown in the next step.

You will need to change the `nodemon.json` variables if you want to run the application locally.
Assuming you have created a database change the following in `nodemon.json`.

```json
{
  "env": {
    "RDS_DB_NAME": "your-local-db-name",
    "RDS_USERNAME": "your-localhost-db-username",
    "RDS_PASSWORD": "your-localhost-db-password",
    "RDS_URL": "localhost",
    "RDS_PORT": 3306,
    "FRONT_END_URL": "http://localhost:3000",
    "PORT": 8080
  }
}
```

### Testing

> Note: You will need to have the .env file in the application source.

For the Node.js backend tests, make sure you have already run `npm install` and then `npm test` in
the project directory and press <kbd>a</kbd> to run all tests.

#### More configurations

You will be required to change the testing database to your cloud test database. Currently the
application is using an Amazon RDS test database solely for testing. The following things would
require changing in the `.env` file found in the source of the application.

```javascript
RDS_USERNAME = your_cloud_test_db_username;
RDS_PASSWORD = your_cloud_test_db_password;
RDS_URL = your_cloud_test_url_url;
RDS_DB_NAME = your_cloud_test_url_db_name;
RDS_PORT = 3306;
```

### Deployment

The application is currently deployed on Heroku via https://project-management-001-api.herokuapp.com
. This is the url and domain was provided by Heroku.

The application is connected to the frontend API via https://project-management-001.herokuapp.com
which was also provided by Heroku when creating a new app. You will be required to provide the
frontend url provided by Heroku or provided by another cloud server to your backend application so
it allows your frontend application to connect to this backend appplication while also changing the
databse variables to connect to your cloud database. To do this you need to
change the root directory of this application in `dockerfile` to the url provided by Heroku or by
another cloud server of your choice for your app.

`dockerfile`

```dockerfile
ENV RDS_USERNAME=your_cloud_db_username
ENV RDS_PASSWORD=your_cloud_db_password
ENV RDS_URL=your_cloud_db_name
ENV RDS_DB_NAME=your_cloud_db_name
ENV RDS_PORT=3306
ENV FRONT_END_URL='your_cloud_front_end_url'
ENV PORT=8080
```
