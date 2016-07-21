# Using Google Flexible Environments to run instances
This example illustrates how to run our echo server from previous examples in [Google Cloud Flexible environments](https://cloud.google.com/appengine/docs/flexible/custom-runtimes/quickstart).

Google Flexible environments provides a convenient way of deploying containerized applications, taking care of many of the low level details such as:

  - Auto scaling the application
  - Creating a load balancer 
  - Creating firewall rules 
  - Recycling bad application instances
  - Container logs and monitoring

Flexible environments will deploy google cloud containers, taking care of all these things for us.  To get started we only require two basic adjustments to our application: 

  - Flexible environment expects our app to serve in port `8080` by default, so we need to adjust that in `echo.js`
  - We need to create an `app.yaml` with a few basic parameters


```yaml
runtime: custom
vm: true
service: testapp
```

The file states that this is a custom runtime (built from our `Dockerfile`), that will run on a virtual machine, and the service is called `testapp`.

Additionally you would need to follow the `gcloud` tools [install process](https://cloud.google.com/sdk/downloads) for your OS, to deploy from your command line.

With this in place, deploying an application is as simple as doing: 

```
$ gcloud app deploy
WARNING: Automatic app detection is currently in Beta
You are about to deploy the following services:
 - geek-hosting/testapp/20160721t160106 (from [/Users/maciekrb/Devel/Workshops/docker-1/docker-tutorial/07-google-flexible-env/app.yaml])
     Deployed URL: [https://20160721t160106-dot-testapp-dot-geek-hosting.appspot.com]
     (add --promote if you also want to make this service available from
     [https://testapp-dot-geek-hosting.appspot.com])

Do you want to continue (Y/n)?
```

After accepting, you will see in the output that Google takes care of building your container, storing the image in your private container repository, and then using it to deploy the image on one or more virtual instances.

