# Using ENTRYPOINTS for running scripts
This example adds the `ENTRYPOINT` directive. By using ENTRYPOINT we can for example, pass the contents of CMD to a script that preps our environment before actually running CMD. 

The interesting part of this example is the docker-entrypoint.sh script.

We first build the container :  
```sh
$ docker build -t echo-server .
```

And we run
```sh
$ docker run -ti --rm -p 3000:80 echo-server
```

We now should be able to access the ping server locally at port 3000.

So this is pretty much the same than the previous example, you may ask what is the advantage of  running a script to then run a command ? 

So now the neat thing is that we can actually pre-configure something before running the actual application, for example, pulling a production / development version of a configuration file.

By now running 
```sh
$ docker run -ti --rm -p 3000:80 -e APPENV=devel echo-server
$ docker run -ti --rm -p 3000:80 -e APPENV=production echo-server
```

Of course if we just want a shell inside the container we can still execute 
```sh
$ docker run -ti --rm -p 3000:80 echo-server sh
```
