🐋 Milestone 6 : Docker Compose 🐋

[IMPORTANTE](https://jj-github-io.translate.goog/CC/documentos/proyecto/6.Compose.html?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=ar&_x_tr_pto=op): This is the 6th and final milestone regarding the development of [my project](composition of services)

For the composition of the cluster, it has been determined that at least 2 containers are needed:

    Node.js server and Mongo database

# In this milestone the most important file is [docker-compose.yml](https://github.com/khawla-k-banydomi/schedulerapiCE/blob/main/docker-compose.yml) which has been created and contains the following:


    version: '3.4'

    services:
    schedulerrestfulapi:
     image: schedulerrestfulapi
        build:
        context: .
        dockerfile: ./Dockerfile
    environment:
      NODE_ENV: production
    ports:
      - 8080:8080
    volumes:
      - .:/usr/src/app
    links:
      - mongodb
    mongodb:
      image: mongo:latest
      ports: 
      - 32110:32110
    volumes:
      - data:/data/db
volumes:
  data: 
  
As you can see, 2 services are included, which are the 2 containers that we are going to create. 
For the first, the container has been chosen mongodbas a NoSQL DB, since we needed a DB of this type because of how the project was configured from the beginning, and mongoit is one of the databases NoSQL more famous and with more documentation.
What has made me opt for its use has been above all the ease of importing data, 
since through a client it has allowed me to select the file  .json and quickly load all events, making it easy to use from the start.

The image we downloaded is the most recent of mongodb,and in the section portsports are specified from where the service provided by the
container will be accessed.
You need to specify 2 since the first one of them is the one you use mongodbin the container, and another is the one that is mapped to access from outside of the container (the one to be used). The default port is 27017 but we can choose a different one and in this case I choose 32110.

In order to be able to store the data and not be erased at each disconnection from the cluster, we mount a volume in /data/db that is specified 
in the creation of the container and also in the lower section volumeswhich indicates the volumes to use.

The other service created is the application developed in the subject: a task has been created in the task manager to be able to raise the server
and make it listen. The Dockerfile with which it has been built is very similar to that of milestone 3 except that the command to execute has been changed for the latter.

Once with all this, you can build the containers with [docker-compose up](https://docs.docker.com/engine/reference/commandline/compose_up/) and when we do it we see that are built successfully

# 🗒️ To sum-up:
I can provide the answers to the following Questions:
----------------------------
- ❔ What is the cluster structure?
- 📓 The cluster structure consists of two containers which are the Node.js server and Mongo database.


- ❓What is the configuration for each container?
- 📔 Node.js container is built on top of a Dockerfile I created which:

- defines the underlying Node.js image I use which is the 'node:12.2.0-alpine'
- install the server dependencies
- exposing the port:3000 for the external connection
- running the server

- 📔 MongoDB container is:
- built on top of the 'mongo' latest image
- defining the used volume to avoid losing data after restarting the container

- ❔ What is the composition file?
- 📓 The composition file is the docker-compose.yml file


- ❓ What are the main tests?
- 📔 Testing the CRUD operations for events and holidays


