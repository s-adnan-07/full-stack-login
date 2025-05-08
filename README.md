# Full Stack Login Assignment

If running in docker comtainer ensure you replace 'localhost' with service name in backend

e.g. `mongodb://localhost:27017` will become `mongodb://mongo_db_dev:27017`

Due to localhost not working in docker containers, `app.enableCors()` in the main.ts file is passed no value, which means anyone can access the server, this is okay for demo purposes but in production we must specify list of allowed hosts.

Additionally set port in `frontend/constants.ts` to 3001 to run in dev mode

To run in dev mode do

- `docker-compose -f docker-compose.yml up --build`
- App will run on `http://localhost:5174`

To run in prod mode do

- `docker-compose -f docker-compose.prod.yml up --build`
- App will run on `http://localhost:8080`

If you wish to run this app on your local machine ensure you have `node 18` or above and run the following commands

- **Backend:** `yarn start:dev`
- **Frontend:** `yarn dev`

> Note: Without docker front end can only be run in development mode

## Features

### Frontend

- User sign up
- Password validation messages
- Required field messages
- User already exists message
- Redirection to sign in page after successful user creation
- Invalid credentials message on sign in if wrong password or no user exists
- Redirection to home page on successful sign in
- Protected home page route

### Backend

- Encrypted password store
- Data validation in the backend (for redundancy)
- Logging messages
- Guarded Routes
- Duplicate key (user already exists) error handling

## Issues [:arrow_up:](#full-stack-login-assignment)

- .env files not implemented due to time constraints
