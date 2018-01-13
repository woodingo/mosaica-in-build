# mosaica-in-build 

A dashboard application for building print pages.

# Based on
* [Dva][dva-repo] - React and redux based, lightweight and elm-style framework. 
* [Ant Design][antd-repo] - A UI Design Language
* [Firebase][firebase-url] - Firebase helps you build better mobile apps and grow your business.

## Getting Started
Install dependencies
```bash
$ yarn
```

Start dev server
```bash
$ yarn start
```

Build
```bash
$ yarn build
```

## Debugging in the Editor

Need to have the latest version of VS Code and VS Code Chrome [Debugger Extension][extension] installed.  
Then add the block below to your launch.json file and put it inside the .vscode folder in your app’s root directory.
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:8000",
      "sourceMaps": true,
      "webRoot": "${workspaceRoot}/src",
      "smartStep": true,
      "internalConsoleOptions": "openOnSessionStart",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```
Start your app by running `yarn start`, and start debugging in VS Code by pressing F5 or by clicking the green debug icon. You can now write code, set breakpoints, make changes to the code, and debug your newly modified code—all from your editor.