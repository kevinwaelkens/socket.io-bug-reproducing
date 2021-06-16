# Purpose

This PR is just in order to reproduce the issue being tackled in https://github.com/socketio/socket.io/issues/3191.

# Running this project

## API
- Navigate to `api`
- `npm i`
- `npm start` (`DEBUG=* npm start` for more logging)

Make sure you have `nodemon` globally installed, or install it locally and add it to the package.json. 

## Client
- Navigate to `mobile-app`
- `npm i`
- `npm run ios`

Make sure you have Xcode downloaded with simulators installed to run one. The app should get installed on the simulator and the bundler will automatically run.

Now open the freshly installed application and notice there's connections being created in the terminal. However, sending a text message in the client doesn't work.


## Notes
- As far as I can see, Android emulator can't even connect to the socket. Only iOS simulator can.
