# REST Hub 

The `api` uri preceed all API endpoints and the following endpoints are currently available
* GET `/api/contacts`
* POST `/api/contacts`
* GET `/api/contacts/:id`
* PUT `/api/contacts/:id`
* DELETE `/api/contacts/:id`

# Local Setup

First time setup:
1. ```npm install```
2. Create a `.env` file:
   1. ```MONGO_URI=mongodb://localhost/resthub```
3. Create a `client/.env` file:
   1. ```VUE_APP_API_URL=http://localhost:4000/api```
4. ```npm start```
5. Application is ready at ```http://localhost:4000```

# AWS Lambda endpoint
The lambda function is available at: https://s6lo9wpqmg.execute-api.ap-southeast-1.amazonaws.com/dev/api/contacts

# Live Application
The live app is available on heroku at: https://cs3219-otot-b.herokuapp.com/
The live api is available at: https://cs3219-otot-b.herokuapp.com/api/contacts