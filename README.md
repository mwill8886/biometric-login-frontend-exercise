# Badge Frontend Development Exercise

This repository contains source code for Badge's frontend development exercise. The
purpose of this exercise is to evaluate your ability to use React and Typescript to create
a UI that's representative of the kind of frontend work we often do at Badge.

Your submission will be evaluated based on how well it implements the specification of the
exercise, as well as on the styling of the UI. See the **Detailed UI specification** and
**Styling** sections below for more details.

## Development setup

This repository was created using [Create React App](https://create-react-app.dev/).

To run the exercise, you will need nodejs >= 14.15.0. You can install a recent version
nodejs by following the instructions on the [nodejs download
page](https://nodejs.org/en/download/), or via [nvm](https://github.com/nvm-sh/nvm). You
may also be able to install using your system package manager (e.g., `apt-get` or `brew`)
but be sure to check the version supplied. Ubuntu's LTS release ship fairly old versions
of node.

Once you have nodejs installed, you can run the exercise development server by running:

```
$ npm install
$ npm start
```

`npm install` will install the exercise dependencies into `node_modules`.  `npm start`
will compile the exercise and start a development server on `localhost:3000`. The
development server implements live reloading, so you can make changes to exercise files
and see your changes automatically appear in the browser without needing to restart the
server.

For more details on working with the Create React App scaffold, see the Create React App
documentation.

## Main task

The main task for this exercise is to implement a React component named
`FingerprintLogin`, which provides a UI for a hypothetical "Login with Fingerprint"
system. Your UI will prompt the user for a username, retrieve information about the user,
prompt the user to scan one or more fingers, and finally submit the scanned fingerprints
to a login service and display the result.

The UI you create will interact with two hypothetical external services:

1. A "Login Service", which provides APIs for fetching information about enrolled users
   and for logging users in via fingerprint scan.

2. A "Fingerprint Scanner" service, which provides an API for subscribing and
   unsubscribing to a stream of fingerprint scan events.

In a real world implementation of this system, your UI would communicate with the scanner
and login service over a network. For this exercise, we've provided in-memory mock
implementations of the external services. The mocks can be found in
`src/FingerprintScanner.ts` and `src/LoginService.ts`. **You should not need to modify the
mocks to complete the exercise**, but you are encouraged to read them to understand the
APIs provided by the mock services.

### Detailed UI specification

Your fingerprint login UI component should implement the following specification:

- On initial page load, your UI should prompt the user to enter a username.

- Upon submission of a username, your UI should make an API call to
  `LoginService.lookupUser` with the submitted username. If the response indicates that
  the requested user does not exist, you should display an error message. Otherwise,
  proceed to the next step.

- If the user exists, the response from `lookupUser` will return a list indicating one or
  more fingers that the user must scan. At this point, your UI should prompt the user to
  scan the required finger(s) and open a subscription using
  `FingerprintScanner.subscribe`.

- The scanner service will emit events simulating scanned fingerprints. Your UI should
  update as progress is made toward scanning all required fingerprints.

- Once all fingerprints have been scanned, your UI should `unsubscribe` from the
  fingerprint scanner and submit the scanned fingerprints to the login service using
  `LoginService.login`.

- When `submitLogin` completes, it will return a response indicating whether the login
  attempt was successful and any error that may have occurred. Your UI should display the
  result.

### Styling

Your submission will be evaluated in part by how it looks when displayed in the
browser. We want to see that you're comfortable working with CSS in a React application
and that you can create an effective UI for the task at hand.

You can make styling changes in `src/index.css`, or in any other `.css` file as
long as its imported appropriately (see [Adding a
Stylesheet](https://create-react-app.dev/docs/adding-a-stylesheet) for more
info on css imports in the toolchain used by this project).

To ensure a consistent evaluation environment, we will view your project using
the "iPhone 12 Pro" setting in [Chrome Developer
Tools](https://developer.chrome.com/docs/devtools/device-mode/#viewport).

You are free to add any third-party CSS or styling libraries to the project.

### Mock service details

For testing purposes, `LoginService` will return responses for three predefined users:

- `"user1"` is enrolled with a single finger, and all login attempts with this user will
  succeed.

- `"user2"` is enrolled with two fingers, and all login attempts with this user will fail
  with a randomly-selected error message.

- `"user3"` is enrolled with three fingers, and all login attempts with this user will
  succeed.

You are free to add additional users to `LoginService` should you feel the need do so.

`FingerprintScanner` will always emit a successful scan every two seconds.

### Code organization

The entrypoint to your solution should be the `FingerprintLogin` component in
`FingerprintLogin.tsx`. You are welcome to create other components and files as you need.
You should not need to modify files outside of `FingerprintLogin.tsx` to complete the
exercise, but you are free to modify and reorganize files as long as you don't
fundamentally change the behavior of the mock backend services.

You are welcome to add new third-party dependencies from npm to the exercise as
long as you update `package-lock.json` accordingly.

## Extra tasks

If you finish the main exercise quickly and want to add an additional challenge, you may
implement any of the following additional tasks. You are **not** required to implement any
of these tasks.

- Show a loading spinner while waiting for the call to `LoginService.login` to
  complete.

- Add a button to the UI during scanning that allows the user to re-scan the
  previous scanned finger.

- Add responsive styling to support different screen sizes and devices.

This exercise and its code is confidential - do not distribute, subject to NDA.
