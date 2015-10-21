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

## Vorlon.JS Client advanced topics

If you want to get an unminified version of the plugins on your web page, you can use the following script tag:

    <script src="http://localhost:1337/vorlon.max.js"></script>

You can have more control on the moment the client side part is starting by using the autostartdisabled version:

    <script src="http://localhost:1337/vorlon.autostartdisabled.js"></script>
    
which also exist with the unminified version of the code:

    <script src="http://localhost:1337/vorlon.max.autostartdisabled.js"></script>
    
Once this is done, you can start the vorlon client and connect it to the dashbard of you choice using the session id you want:

    VORLON.Core.StartClientSide("http://localhost:1337", "default");
    
## Vorlon.JS Server advanced topics

If you do not want to use a specific plugin in your dashboard and disable it also on the client part, you can use the config.json file on the server.
To be able to do this, you need to use Vorlon.js downloaded and installed from the GitHub repository. You can also modify the package downloaded from npm but this is not recommended.

The file is located on the following folder :

    Server/config.json
    
By default, it looks like this :

    {
        "includeSocketIO": true,
        "useSSLAzure": false,
        "useSSL": true,
        "SSLkey": "cert/server.key",
        "SSLcert": "cert/server.crt",
        "plugins": [
            { "id": "CONSOLE", "name": "Interactive Console", "panel": "bottom", "foldername" : "interactiveConsole", "enabled": true},
            { "id": "DOM", "name": "Dom Explorer", "panel": "top", "foldername" : "domExplorer", "enabled": true },
            { "id": "MODERNIZR", "name": "Modernizr","panel": "bottom", "foldername" : "modernizrReport", "enabled": true },
            { "id" : "OBJEXPLORER", "name" : "Obj. Explorer","panel": "top", "foldername" : "objectExplorer", "enabled": true },
            { "id" : "XHRPANEL", "name" : "XHR","panel": "top", "foldername" : "xhrPanel", "enabled": true  },
            { "id" : "NGINSPECTOR", "name" : "ngInspector","panel": "top", "foldername" : "ngInspector", "enabled": false  }
        ]
    }
    
It is obviously using the JSON (JavaScript Simple Object Notation) format and is easy to understand: each line in the "plugins" array represents a plugin.

For instance, you can change the folder where the plugin is installed. This folder has to be located under:

    Server/public/vorlon/plugins
    
By convention, this name needs to be the same as the JavaScript file for the plugin for either the max file:

    {FOLDERNAME}.js
    
and the min version:

    {FOLDERNAME}.min.js
    
You can also choose in which panel the plugin should be displayed using the "panel" property. It can be either "bottom" or "top".

You can add and remove plugins here. 
It will impact the dashbard by not displaying a removed plugin and also the client JavaScript file which is sent to the client website.

We also added the option to NOT automatically include socket.io in the script returned to the client. You can disable socket.io embedding by setting:

    "includeSocketIO": false
    
If you want to support SSL and HTTPS, you just have to set "useSSL" to true and then define SSLKey and SSLcert files.

## Configure base URL

You can change the base URL path in config.json.

    "baseURL": "/your/directory"
    
## Configure authentication

You can activate a basic authentication on the Vorlon.js dashboard by adding 3 values to the config.json file.

    "activateAuth": true,
    "username": "CHANGEHERE",
    "password": "CHANGEHERE"
    
If the "activateAuth" is set to true, you will be redirected to the login page on the first navigation on the dashboard.
You then need to give the information set on the "username" et "password" settings value.

This allows you to configure a remote Vorlon.js dashboard without risking everyone to access it.

## SSL Support

If you want to run the server with SSL support proceed as follows:

 - 1.Install Vorlonjs following the steps in Easy Setup
 - 2.Navigate to the installation folder
 - 3.Modify JSON file to activate SSL support
 - 4.In JSON file set to true 
 - 5.If you want to replace our localhost certificate should only change the path of the files with the private key and certificate
 - 6.Exit and save JSON file
        
        {
            "useSSLAzure: false,
            "useSSL": true,
            "SSLkey": "server/cert/server.key",
            "SSLcert": "server/cert/server.crt",
            "includeSocketIO": true,
            "plugins": 
                ...
        }

## SSL Support on Azure

 - 1.Navigate to the installation folder
 - 2.Modify JSON file to activate SSLAzure support
 - 3.In JSON file set to true
 - 4.Exit and save JSON file
 - 5.Navigate with https protole on your Azure WebSite
       
        {
            "useSSLAzure: true,
            "useSSL": false,
            "SSLkey": "",
            "SSLcert": "",
            "includeSocketIO": true,
            "plugins": 
            ...
        }
    
## Configure Vorlon behind a Nginx proxy

Edit your nginx.conf, find **server {** and use this (don't forget to change the paths below to your own paths).

    server {

        server_name  vorlon;

        location ~ ^/(fonts/|images/|javascripts/|stylesheets/|vorlon/|vorlon.dashboardManager.js|robots.txt|humans.txt|favicon.ico) {
                 root /PATH/TO/Vorlonjs/Server/public;
                 access_log off;
                 expires 24h;
        }

        location /test {
                 proxy_set_header Upgrade $http_upgrade;
                 proxy_set_header Connection "upgrade";
                 proxy_http_version 1.1;
                 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                 proxy_set_header Host      $host;
                 proxy_pass http://localhost:1337;
        }

        location /socket.io {
                 proxy_set_header Upgrade $http_upgrade;
                 proxy_set_header Connection "upgrade";
                 proxy_http_version 1.1;
                 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                 proxy_set_header Host      $host;
                 proxy_pass http://localhost:1337;
        }

