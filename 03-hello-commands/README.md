# Using commands to run applications
We now add an application to that runs on top of a container image.

The `WORKDIR /code` directive is just the docker way of doing `cd /code`.
The `RUN` directive adds a new layer to the overlay FS with the results of the `npm install` command.
The `CMD` directive provides defaults for executing a container.

We first build the container :  
```sh
$ docker build -t echo-server .
```

And we run
```sh
$ docker run -ti --rm -p 3000:80 echo-server
```

We now should be able to access the ping server locally at port 3000.
