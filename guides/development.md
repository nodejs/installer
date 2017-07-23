# To Develop

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/nodejs/installer
# Go into the repository
cd installer
# Install dependencies and run the app
npm install && npm start
```

> :warning: Depending on your platform, you might see warnings about native dependencies failing to compile. Read npm's output carefully, as many native dependencies are only required on the platforms they were respectively created for - as an example, as long as you're on Windows or Linux, `macos-alias` failing to compile and install is perfectly fine.

This project is using Electron to built a cross-platform desktop app using Node.js, Chromium, and native code. It runs on Windows (7 and up), macOS, and Linux. Learn more about Electron and its API in the [documentation](http://electron.atom.io/docs/latest).

## To build

This installer can be built for Windows, macOS, and Linux. Calling `npm run make` will create packages for the current platform. On Windows, it will create a `zip` file and self-contained Squirrel installer. On macOS, it will create a `dmg` and `zip` file. On Linux, it will create both a `deb` and a `rpm` package. The configuration for those packages can be found in `package.json`.

## Tests and Linting

This project uses [StandardJS](http://standardjs.com/) as its style guide.

Tests are on the way!

```bash
# Run the linter and tests
npm test
```
