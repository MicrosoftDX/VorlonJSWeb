---
section: vorlonproxy
title: Vorlon proxy
sequence: 05
---

Sometimes you must audit, test, or debug a website in production and you don't have Vorlon script injected in your pages. 
For all such cases, you could now use Vorlon "proxy" feature to open your site.

## How does it work ?

The proxy is a tool built with node.js, running server side on a separate process (and therefore a separate port or domain if you must deploy it). When the proxy is called with a target url, it will forward this http call (and all subsequent calls) to the target. The proxy will injects Vorlon's client script in the page for you in the meantime. To manage subsequent calls for resources from the website (like css, scripts, images, ...), the proxy create a cookie on first call with the target url. The (necessary) use of a cookie means that it is unadvised to run multiple Vorlon inspection using proxy with the same browser instance (because this cookie will be shared among browser tabs).

## Running proxy locally

First you must check that the proxy has been enabled. Open config.json and verify that "enableWebproxy" is set to true, and start your Vorlon server (using "npm start" for example). That's the only thing you must have to do. If you run the proxy locally, you could go to http://localhost:1337/httpproxy to open a helper page. The proxy itself will listen on port 5050 (by default). In case of trouble, look at the console for your server. At the very beginning you must have a trace indicating that the server and the proxy have started, and which port they are running on.

## hosting the proxy

Vorlon server and proxy resides on different processes and could be deployed separately. To work properly, the proxy must be listening at the root of a http domain. The proxy cannot work if it's set on a path like "http://vorlonjs.com/documentation/". This is due to the fact that inspected web pages may have url relative to the httpdomain (url starting with "/"). If the proxy is not listening at the root, it won't be able to catch those calls.

If you want to host a Vorlon instance with the proxy feature, their are a few configurations that you may find usefull :
"vorlonServerURL" is used by the proxy to build the url of Vorlon client script
"vorlonProxyURL" is used by the Vorlon server to send requests to the proxy

if empty, "vorlonServerURL" and "vorlonProxyURL" default to localhost with the proper port.