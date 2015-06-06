---
section: creating-plugins
title: Creating Plugins
sequence: 04
---

Vorlon.JS has been designed so that you can extend the dashboard and client application easily by writing or installing additional plugins. These can add extra panes to the dashboard which can communicate bi-directionally with the client application. The console, dom inspector and modernizr panes that come bundled with Vorlon.JS are all plugins themselves.

## Writing Plugins

### Running Vorlon.JS from source

To write plugins, you currently need to clone and run Vorlon.JS from source.

These commands will clone the repo, install dependencies, and run the VorlonJS server from source:

```
git clone https://github.com/MicrosoftDX/Vorlonjs.git
cd Vorlonjs
npm install
npm start
```

For further documentation on developing on Vorlon.JS, check the [full readme](https://github.com/MicrosoftDX/Vorlonjs/blob/master/README.md) in the repo.

### Sample Plugin

A Vorlon.JS plugin is a single Typescript class, that will be loaded in both the client and dashboard. It should extend from the [Vorlon.Plugin class](https://github.com/MicrosoftDX/Vorlonjs/blob/master/microsoft/Plugins/Vorlon/vorlon.plugin.ts). It may also load `html` and `css` into the dashboard to define a panel. You can then write code for both the dashboard and client that can communicate bidirectionally to create whatever features you need.

To make it easy to get started, we’ve created a sample plugin. This adds an input field to the dashboard, that, when you type something and hit return, sends the message to your client browser, which will reverse the string and send it back, to be rendered in the dashboard. It’s just a simple example to show you how to create and communicate in a plugin. You should [check the sample plugin’s readme](https://github.com/MicrosoftDX/Vorlonjs/blob/master/Plugins/Vorlon/plugins/sample/README.md) for information about how to enable it, and then [read the sample plugin’s code](https://github.com/MicrosoftDX/Vorlonjs/blob/master/Plugins/Vorlon/plugins/sample/vorlon.sample.ts) to see how you might modify it for your own needs.


## Installing Plugins

We are still working on making it easy to install and run third-party plugins for Vorlon.JS. At the moment, you will need to write and compile plugins in a checked out version of vorlon as above, but we want to make it really easy for you to publish and use plugins with Vorlon.JS. If you have ideas on how we can improve this [file an issue on github](https://github.com/MicrosoftDX/Vorlonjs/issues).

In the meantime, if you've developed a plugin that you think could go in Vorlon.JS core, [submit a pull request](https://github.com/MicrosoftDX/Vorlonjs).


## Useful reading
 [How to create a plugin](http://blogs.msdn.com/b/emargraff/archive/2015/06/01/how-to-create-a-vorlon-js-plugin.aspx) by Etienne Margraff