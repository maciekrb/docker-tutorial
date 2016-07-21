# Using Google Compute engine instances with container-vm
This example illustrates how to run our echo server from previous examples in [Google Cloud](http://console.cloud.google.com)

We already tried Google Flexible environments in the previous tutorial, which is a convenient way of running containerized applications, but what happens when we need to run applications that could benefit from container composition ? We can't really do that in flexible environments without deploying separate applications. 

This example illustrates how to run such a scenario in the Google Cloud, as always, with just a few updates to our working app. 

## Instance Groups and Templates
Google Cloud provides a few strategies for us to deploy scalable applications in a predictable and automated manner. **Instance Templates** allow us to define a sort of cookie cutter that would allow us to create tenths of instances automatically and reliably. Instance templates can be created directly from the web console or from the command line. The instance template we will create for this example looks like this : 

```sh
gcloud compute instance-templates create echo-server \
--machine-type "f1-micro" \
--image "container-vm" \
--boot-disk-size "10GB" \
--boot-disk-type pd-standard \
--restart-on-failure \
--tags "echo-server" \
--metadata-from-file "google-container-manifest=pod.yml" \
--maintenance-policy "MIGRATE" --scopes \
"https://www.googleapis.com/auth/cloud.useraccounts.readonly",\
"https://www.googleapis.com/auth/devstorage.read_only",\
"https://www.googleapis.com/auth/logging.write",\
"https://www.googleapis.com/auth/monitoring.write"
```

You can lookup all the parameters we are defining here, but the most important flags of this template are the `--image` and `--metadata-from-file`. `--image` defines which OS image should be used to start our virtual machine. As we will be running docker containers, we need an image that actually can do so, and so it happens that the `container-vm` image does the trick.

`--metadata-from-file` basically sets some metadata that will be available to the instance at runtime. In this case the metadata defines a `google-container-manifest` which corresponds to the same spec that [Kubernetes Pods](http://kubernetes.io/docs/user-guide/pods/) use. [Kubernetes](http://kubernetes.io) is a sophisticated system for scheduling containers that we will cover in later tutorials. In this case we will just use the same "Pod spec" (as in pea pod) for defining our containers. 

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: echo-server
spec:
  containers:
    - name: echo-server
      image: gcr.io/<project-id>/echo-server
      ports:
        - containerPort: 8080
          hostPort: 80
      env:        
        - name: PORT
          value: "8080"  
        - name: APPENV
          value: production
  restartPolicy: Always
```


Please make sure you replace `<project-id>` by your Google Project ID, you can find the details in the [console dashboard](http://console.cloud.google.com). 

You could say that this file kind of resembles the `docker-compose.yml` file. It defines what to run, maps ports and sets environment variables. It servers pretty much the same purpose but a different system will be interpreting the file: the [Kubelet](http://kubernetes.io/docs/admin/kubelet/). 

The [Kubelet](https://get.slack.help/hc/en-us/articles/202288908-Formatting-your-messages) is a node agent that will work in terms of the Pod spec to run our application. 

Before we can start generating instances for our application, we need to build the container and upload the image to the container registry. As you may have guessed already, our image will be "tagged" as `gcr.io/<project-id>/echo-server` that way we can easily push it to the registry.

We can use any container registry we may find convenient, for this demo we will use the [Docker container registry](https://cloud.google.com/container-registry/) offered by Google. We build and upload our image by running :

```sh
$ docker build -t gcr.io/<project-id>/echo-server
$ docker login -u oauth2accesstoken -p "$(gcloud auth print-access-token)"
$ gcloud docker push gcr.io/<project-id>/echo-server
```

Once the image has been uploaded to the registry, we are ready to start creating instances 
. The instances can be created from either the web console or the command line. From the web console, browse to [instance templates](https://console.cloud.google.com/compute/instanceTemplates/list), you can then choose the newly created template and then click on "Create instance group". Feel free to choose the auto-scaling options and health checks. 


