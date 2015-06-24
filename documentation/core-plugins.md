---
section: core-plugins
title: Core Plugins
sequence: 03
---

## Console

### Logging

The console tab will stream console messages from the client to the dashboard that you can use for debugging. Anything logged with `console.log()`, `console.warn()` or `console.error()` will appear in the dashboard.

### Interactivity

You can also interact with the remote webpage by typing code into the input. Code entered will be evaluated in the context of the page.

## DOM Explorer

The DOM explorer shows you the dom of the remote webpage. You can inspect the DOM, clicking on nodes will highlight them in the host webpage, and if you select one you can also view and modify its css properties.

## Modernizr

The Modernizr tab will show you the supported browser features as reported by [Modernizr](http://modernizr.com/). You can use this to determine what features are actually available. This might be particularly useful on unusual mobile devices, or things like games consoles. You can use the search filter to select only specific features.

## Object Explorer

The Object explorer tab will show you all JavaScript variable living on the remote page. You can click on object to see inner properties.

## XHR panel

The XHR panel will help you analyze XHR calls sent by your devices. You can track status code and others useful information.

## ngInspector

The ngInspector tab is a tool that will display your Angular.js scopes. You can see inner scopes and even ngRepeat constructs.

## Network Monitor

The Network Monitor brings the ability to see all network exchanges done between the browser and the web server. It provides the resource name, the server domain, the type of request, the duration in milliseconds and a nice visual timeline.

## Resources Explorer

The Resources Explorer provides information about what is locally stored on the client instance such as sessions, cookies, and local storage. This can be really useful when you want to debug local cache or login / persistent user data issues.
