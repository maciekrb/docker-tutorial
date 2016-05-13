# Extending a base image
We now extend an official base image, in this case a minimalistic Linux distribution called Alpine Linux with an Nginx HTTP server.

The `FROM` directive references an existing image in the registry.
The `COPY` Directive copies the contents of the `./site` folder to `/usr/share/nginx/html` inside of the container.

In order to run this image, we must first build it : 

```sh
$ docker build -t quick-nginx .
```

Building an image, executes every statement inside of the `Dockerfile` and overlays the resulting file system on top of the previous one.

This time we run the container in the background :

```sh
$ docker run -d -p 3000:80 quick-nginx
```

The `-d` flag tells docker to run a "daemonized" container. 
The `-p 3000:80` flag maps the port 3000 on the host machine to the port 80 inside the container.

For native docker installs, you can access the HTTP server on localhost:3000. If you are using VirtualBox for running it, you should check the IP given by `docker-machine`. 
