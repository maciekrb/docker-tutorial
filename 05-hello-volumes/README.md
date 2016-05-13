# Using volumes for developing inside containers
This example uses the exact same code than the previous example. We are just going to mount our local file system inside of the container, so we can basically keep editing using our local machine tools, while we execute inside the container. This is accomplished by using the `-v` (volume) flag.

```sh
$ docker run -ti --rm -p 3000:80 -v ~/Devel/Workshops/docker-1/05-hello-volumes:/code echo-server
module.js:440
    throw err;
    ^

Error: Cannot find module 'body-parser'
    at Function.Module._resolveFilename (module.js:438:15)
    at Function.Module._load (module.js:386:25)
    at Module.require (module.js:466:17)
    at require (internal/module.js:20:19)
    at Object.<anonymous> (/code/echo.js:1:80)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:456:32)
    at tryModuleLoad (module.js:415:12)
    at Function.Module._load (module.js:407:3)
```
Ooops, what happened there ? 

Well, remember we did `npm install` inside of the container ? What is happening is that we are actually overwriting the `/code` path with our local directory, thus replacing all the content, which in short means that `node_modules` isn't there. So we basically need to `npm install`  again, but how we do this ? 

```sh
$ docker run -ti --rm -p 3000:80 -v ~/Devel/Workshops/docker-1/05-hello-volumes:/code echo-server sh
/code # npm install
...
```
Now, if you look your local OS file system, you should have `node_modules` already there, you can now safely exit and exec again, `node_modules` will be there from now on.

