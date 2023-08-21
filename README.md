# Home Library Service
This is a service that emulates a home music library. Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/Boffin-ux/nodejs2023Q2-service.git

```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```
or start application in development/watch mode in docker container

```
npm run docker:up
```

Before starting the application you can create .env (see .env.example) file and set your preferred port (4000 as default) for the server.

After starting the app you can open in your browser OpenAPI documentation by http://localhost:4000/api/docs.

## Authentication and Authorization
User can login with personal login & password, server returns response with Access token and Refresh token

To use the POST auth/refresh route you must pass a refreshToken in the authorization header in format "Bearer refreshToken"

```
Bearer <refreshToken>
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

## Docker Scan for vulnerabilities
To scan docker image vulnerability execute:

```
npm run docker:scout
```


### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
