# Docker Crash Course

In order to follow this crash course you need to make sure you complete the Docker Engine install for your [operating system](https://docs.docker.com/engine/installation/).

## Survival Docker commands

### Obtaining a list of currently running containers
```sh
$ docker ps
``` 

### Obtaining a list of all containers running / stopped
```sh
$ docker ps -a
```

### Stopping a container
```sh
$ docker stop <container name>
```

### Removing a container (has to be stopped)
```sh
$ docker rm <container name>
```

### Removing all containers with exited status
```sh
$ docker rm -v $(docker ps -a -q -f status=exited)
```

### Inspecting a container
```sh
$ docker inspect <container name>
```

### Listing docker images locally available
```sh
$ docker images
```

### Pulling an image from the docker hub
```sh
$ docker pull redis
```

### Removing docker images
```sh
$ docker rmi <image name>
```

### Removing dangling images
```sh
$ docker images -f "dangling=true" -q | xargs docker rmi
```

## Resources
[Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
[docker-compose reference](https://docs.docker.com/compose/compose-file/)
