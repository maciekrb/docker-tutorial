# Using docker-compose
This example shows a simple way of running the same exact container we were running in the previous example, but we will just use a new shorter command to to this. 

```sh
$ docker-compose build
$ docker-compose run --service-ports echo
```

The above commands, will build the container and run the container (exposing the service ports) with a pre-set configuration. 

The configuration used to build and run the container can be found in `docker-compose.yml`.

Notice how we are basically mapping the flags from the command line to sections inside a [YAML](http://www.yaml.org/start.html) file.

