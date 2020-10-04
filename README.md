# REST Hub 

The `api` uri preceed all API endpoints and the following endpoints are currently available
* GET `/api/contacts`
* POST `/api/contacts`
* GET `/api/contacts/:id`
* PUT `/api/contacts/:id`
* PATCH `/api/contacts/:id`
* DELETE `/api/contacts/:id`

# Local Setup

First time setup:
1. ```npm install```
2. Create a `.env` file:
   1. ```db_connection_string=mongodb://localhost/resthub```


To run the application:
```
npm start
```

# AWS Lambda endpoint
https://s6lo9wpqmg.execute-api.ap-southeast-1.amazonaws.com/dev/api/contacts

# Live Application
The live app is available on heroku here https://cs3219-otot-b.herokuapp.com/
