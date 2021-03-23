# Project Management Framework Frontend

This repository contains code for the frontend part of the application. The frontend is written in
JavaScript and JSX using React.

## Building the Project

### Prerequisites

First, you'll need to install the dependency management tool:

- [`npm`](https://docs.npmjs.com/)

### Building and Running

In the project directory, run `npm install` to install the necessary packages and then `npm start`
to run the application. Running this command on your computer will run the application on port 3000
access it via http://localhost:3000

> Note: Running `npm run build` is not necessary.

### Testing

For the React frontend tests, make sure you have already run `npm install` and then `npm test` in
the project directory and press <kbd>a</kbd> to run all tests.

### Deployment

The application is currently deployed on Heroku via https://project-management-001.herokuapp.com
. This is the url and domain was provided by Heroku.

The application is connected to the backend API via https://project-management-001-api.herokuapp.com
which was also provided by Heroku when creating a new app. You will be required to provide the
backend url provided by Heroku or provided by another cloud server to your frontend application. You need to change this in your
root directory of this application in `/shared/utility.js` to the url provided by Heroku or by
another cloud server of your choice for your app.

`utility.js`

```javascript
export const backendUrl = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'your-backend-api-url';
};
```

You can also add your own domain, follow their official documentation provided in https://devcenter.heroku.com/articles/custom-domains.
