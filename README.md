# Node.js Installer

This is an Electron application for installing, updating and managing versions of Node.js.

The goal is to be far more humane and user friendly than traditional methods of installation. The focus is primarily new users to Node, who are just looking for the easiest way to get started.

## To Develop

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/nodejs/installer
# Go into the repository
cd installer
# Install dependencies and run the app
npm install && npm start
```

Learn more about Electron and its API in the [documentation](http://electron.atom.io/docs/latest).

## To build

This installer can be built for Windows, macOS, and Linux. Calling `npm run make` will create packages for the current platform. On Windows, it will create a `zip` file and self-contained Squirrel installer. On macOS, it will create a `dmg` and `zip` file. On Linux, it will create both a `deb` and a `rpm` package. The configuration for those packages can be found in `package.json`.

## Tests and Linting

This project uses [StandardJS](http://standardjs.com/) as its style guide.

Tests are on the way!

```bash
# Run the linter and tests
npm test
```
