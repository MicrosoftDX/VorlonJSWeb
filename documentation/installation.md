---
section: installation
title: Installing Vorlon.JS
sequence: 01
---

## Vorlon.JS Server

To get started using Vorlon.JS you will need to install it from npm:

    $ npm i -g vorlon

Once Vorlon.JS is done installing, you can now run the server:

    $ vorlon
    The Vorlon server is running

With the server running, open [http://localhost:1337](http://localhost:1337) in your browser to see the Vorlon.JS dashboard.

## Vorlon.JS Client

Before you can start debugging your app you have to enable it to communicate to the Vorlon.JS Server by adding this script tag to your application’s html:

    <script src="http://localhost:1337/vorlon.js"></script>

You can also open the [sample page](http://cdn.rawgit.com/MicrosoftDX/Vorlonjs/master/Plugins/samples/index.html) to test that your dashboard is working. You should see the client appear in your dashboard when you open that page.

## Vorlon.JS Client advanced notions

If you want to get an unminified version of the plugins on your web page, you can use the following script tag:

    <script src="http://localhost:1337/vorlon.max.js"></script>

You can have more control on the moment the client side part is starting by using the autostartdisabled version:

    <script src="http://localhost:1337/vorlon.autostartdisabled.js"></script>
    
which also exist with the unminified version of the code:

    <script src="http://localhost:1337/vorlon.max.autostartdisabled.js"></script>
    
Once this is done, you can start the vorlon client and connect it to the dashbard of you choice using the session id you want:

    VORLON.Core.Start("http://localhost:1337", "default");