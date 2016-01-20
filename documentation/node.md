---
section: node
title: Debugging Node.js applications
sequence: 06
---

Vorlon.js is versatile enough to be used with Node.js applications as well.

But because node.js does not provide DOM elements, all plugins can not be used when debugging Node.js applications.
This is why some plugins are flagged with ```nodeCompliant=true``` in the catalog file:

`{ "id" : "XHRPANEL", "name" : "XHR","panel": "top", "foldername" : "xhrPanel", "enabled": true, "nodeCompliant": true }`
 
## Referencing Vorlon.js in your Node.js application
To do so, you have to ```npm install vorlon-node-wrapper```. Once done, you can add this code to your application:
 
 ```
var vorlonWrapper = require("vorlon-node-wrapper");
var serverUrl = "http://localhost:1337";
var dashboardSession = "default";

//This will connect to your Vorlon.js instance (serverUrl) and download the Vorlon.node.js client file (Vorlon for node).
vorlonWrapper.start(serverUrl, dashboardSession, false);

// Your code
// ...
 ```
 
You can also use the asynchronous version of the `start` function:
```
var vorlonWrapper = require("vorlon-node-wrapper");
var serverUrl = "http://localhost:1337";
var dashboardSession = "default";

//This will connect to your Vorlon.js instance (serverUrl) and download the Vorlon.node.js client file (Vorlon for node).
vorlonWrapper.start(serverUrl, dashboardSession, true, function (result, errorMessage) {
  
    // Your code
    // ...
});
 ```

## Developping a Node.js compliant plugin
If you plan to create a plugin that could work with Node.js, the only think you have to do is to mark it as compliant in the catalog.json file.
 
Regarding the code itself, you can use `Vorlon.Tools.IsWindowAvailable` to determine if you are running in a browser context (where `window` object is available) or in a node.js context (where `global` object is available).
 