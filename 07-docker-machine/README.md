# Deploying using docker-machine
So now that we are good running things locally, let's see a few ways to deploy our applications in the cloud. 

`docker-machine` is one of the docker native mechanisms for doing such thing. The first step is making sure that the `docker-machine` command is installed in our system, if it is not, you can install it as follows : 

```
$ curl -L https://github.com/docker/machine/releases/download/v0.7.0/docker-machine-`uname -s`-`uname -m` > /usr/local/bin/docker-machine && \
$ chmod +x /usr/local/bin/docker-machine
```

Once installed, we will need to set a few things on our environment. `docker-machine` uses "drivers" to deploy virtual instances in popular cloud providers. Every driver depends on a few configurations to work.

## Amazon EC2 driver
To create an EC2 instance in AWS running Docker that we will later command from our local computer, we need the following variables set up : 

```
export AWS_ACCESS_KEY_ID=<your aws iam key>
export AWS_SECRET_ACCESS_KEY=<your aws iam key>

# According to when your AWS account was created, you may also need the following
export AWS_VPC_ID=vpc-951xxxx
export AWS_SUBNET_ID=subnet-5fxxxxx
```

Once this variables are in place, creating a docker machine is very easy : 

```
$ docker-machine create -d amazonec2 aws01
Running pre-create checks...
Creating machine...
(aws01) Launching instance...
Waiting for machine to be running, this may take a few minutes...
Detecting operating system of created instance...
Waiting for SSH to be available...
Detecting the provisioner...
Provisioning with ubuntu(systemd)...
Installing Docker...
Copying certs to the local machine directory...
Copying certs to the remote machine...
Setting Docker configuration on the remote daemon...
Checking connection to Docker...
Docker is up and running!
To see how to connect your Docker Client to the Docker Engine running on this virtual machine, run: docker-machine env aws01
```

The above will start provisioning an instance running docker, to which you can send commands with your local docker client. The provisioning should take about 2 minutes, once completed, you can run the following command to list your docker machines: 

```
$ docker-machine ls
NAME     ACTIVE   DRIVER      STATE     URL                      SWARM   DOCKER    ERRORS
aws01    -        amazonec2   Running   tcp://52.90.222.0:2376           v1.11.2
``` 

To set an active machine, we follow the advice provided when the docker-machine was provisioned:

```
$ docker-machine env aws01
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://52.90.222.0:2376"
export DOCKER_CERT_PATH="/Users/maciekrb/.docker/machine/machines/aws01"
export DOCKER_MACHINE_NAME="aws01"
# Run this command to configure your shell:
# eval $(docker-machine env aws01)
```

That just sets a bunch of variables that signal which docker host should the local client to be speaking to, so we can just go ahead and `eval` that.

```
$ eval $(docker-machine env aws01)
$ env | grep DOCKER
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://52.90.222.0:2376"
export DOCKER_CERT_PATH="/Users/maciekrb/.docker/machine/machines/aws01"
export DOCKER_MACHINE_NAME="aws01"
```

Now we are ready to go, we can now run our apps in the cloud server, just as we did before:

```
$ docker build -t echo-server .
$ docker run -ti --rm -p 80:80 echo-server
```

Please make sure you enable traffic to port `80` in the security group associated with the AWS instance. 

For running this in Google Cloud, you would need to follow the `gcloud` tools [install process](https://cloud.google.com/sdk/downloads) for your OS, to deploy from your command line.

```
$ gcloud auth login
$ docker-machine create -d google --google-project my-project goog01
```

If running on Google Cloud, make sure you create a Firewall rule according, so you can accept incoming TCP traffic to port 80.
