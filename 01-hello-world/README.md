# The absolute basic Docker Hello World
So the most basic way of running a docker container is running an image already build by someone else. Community docker images can be found in the [Docker Hub](https://hub.docker.com/).

You can find pretty much anything running inside of a container, but keep in mind that there are two kinds of images: 

  * Official: Curated and promoted repositories, you can trust this most of the time.
  * Non-Official: Built by a community member, you should check what are you running most of
    the time.

Examples of official repositories that do useful things : 

Run a Redis server in interactive mode (`-ti`) and delete on exit (`--rm`).
```sh
$ docker run -ti --rm --name quick-redis redis
```

Now we can easily connect to this server by "linking" the container or connect to any external Redis server instance. 

```sh
$ docker run -it --rm --link quick-redis:redis redis redis-cli -h redis -p 6379
redis:6379> PING
```

Run an ephemeral MySQL server
```sh
$ docker run -ti --rm --name quick-mysql -e MYSQL_ROOT_PASSWORD=not-secret mysql:5.6
```

The `-e` argument allows to set environment variables that will be available inside the container. 

Now we can easily connect to this server by "linking" the container or connect to any external MySQL server instance. 

```sh
$ docker run -it --rm --link quick-mysql:mysql mysql:5.6 sh -c 'exec mysql -h mysql -uroot -p'
```
