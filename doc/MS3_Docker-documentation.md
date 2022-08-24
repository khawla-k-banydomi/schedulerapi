
# Docker Justification

- To see How I configure my Github account Please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/Configuration.md). 🔧
- To see full descriptive document for the architecture and tools that I already and will use during the development check this [Document](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/Architecture.md) 📔
- To see the First Milestone (hito-0) and To Take a tour around the Application That I want to develop please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/MS0_Description.md). 🗓️

- To see the Second Milestone (hito-1) and To take a tour around milestones and issues regarding the application please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/MS1_Specifying%20and%20planning%20the%20project.md). 🗒️
- To see the Third Milestone (hito-2) and To take a tour around testing in the context of our application please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/MS2_Testing.md). 🗒️
- To see the complete description of the user stories please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/User-Stories.md). 📓
- There are several unwanted issues that will be colsed and taged as removed.
---

## [Why Docker?](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/Docker.md)

### This is the Document for the Third-milestone which is the [Docker](https://jj.github.io/CC/documentos/proyecto/2021/3.Docker) milestone.
- To sum up I have to add the following features:<br>
- docker-compose.yml
- docker-compose.debug.yml
- docker.yml
- Dockerfile

### In this section I want to justify the image I have already chosen to carry out the Docker of our project. 
I will also show the different Dockerfiles that have been tested and their structures.

# Images:
on the one hand There are several variations and possibilities to choose an image in our Dockerfile . All distributions contains images for Docker (Fedora, CentOS, Ubuntu ..)
as well, each of them have different versions. side by side, we also find official images of the different programming languages(python,java) and especially for node js that are already 
installed and can be used.

 At the end I have found the following options:

   - I will use distribution with a "complete" installation, especially Ubuntu, since it can be considered as one of the most used and supported OSs
   in the current era. there are several versions that Ubuntu might provides us with but at then I choose Focal .
   - It is important to try a "light" image that brings enough to work and it necessary for our project to work properly.
   This will give us an optimized and light docker. in this context I try to use Alpine since it seems to be the most standardized.
   - In regard to the language , I think it might be more convenient to try an official image of the language so that I have to use the official image for the ( Node.js )
   - As I said I am trying to optimize the container, so that I will use Alpine's version; there are several versions for Alpine the are also several versions for the language 
   
Next we test the different Dockerfiles that I have carried out for these images, Tests with the different images:

In general, the steps that I have followed in the different Dockerfiles are very similar. This could be the structure:

    Creation of a user with basic permissions (if necessary).
    Creation of the directory structure.
    Language installation (if necessary).
    Installation of dependencies.
    Launch the tests.

Each image, although it follows the previous scheme, has its peculiarities that we will see below.

# 1. Ubuntu Official image:

In Ubuntu we will need to create a basic user and install the language. 
-  We create a user with basic permissions and the directory structure we need
-  We indicate that the owner of these directories is the new user that we have created
-  We install the version we are using of Node (the latest LTS) and for this we need curl
-  Once we have installed it, we can remove curl as we will not need it
-  We change to the directory that we have created
-  We copy the dependency files and set the user that we have created as the owner
-  We install the gulp client (globally) to be able to launch tasks, including installation and test
-  With npm link we create a symbolic link so that it detects it in node_modules and so we can use it
-  Finally we install the gulp run module (locally) since we use it in our task manager to launch tasks
-  We change the node user to have no privileges
-  We install the dependencies
> RUN GULP INSTALL
-  We launch the tests.
# 2. Alpine official Image:

 The structure of our Dockerfile in Alpine is very similar to Ubuntu, it only changes the way we install the language:
-  We create a basic user without superuser permissions
-  We create the directory structure and indicate that the owner is the new user that we have created
-  We install nodejs (by default it installs the last LTS, which would be 14) and npm.
-  We change to our working directory that we just created
> WORKDIR / app / test
-  We copy the dependency files and set the user that we have created as the owner
> COPY * .json package gulpfile.js ./
-  We install the gulp client (globally) to be able to launch tasks, including installation and test
-  With npm link we create a symbolic link so that it detects it in node_modules and so we can use it
-  Finally we install the gulp run module (locally) since we use it in our task manager
> RUN npm install -g gulp-cli && npm link gulp && npm install gulp-run
-  We change the node user to have no privileges
> USER user
-  We install the dependencies
> RUN gulp install
-  We launch the tests
> CMD ["gulp", "test"]

# 3.Node js official image:
   The last image we have to shed the light over it is the official image for the language which is node js:
- We use the latest LTS version of the language.
- We create the directories that we are going to need and we set the node user as the owner
> RUN mkdir -p / app / test / node_modules && chown -R node / app
- We change to our working directory that we just created
> WORKDIR / app / test
- We copy the dependency files and set the node user as owner
> COPY --chown = node package * .json gulpfile.js ./
- We install the gulp client (globally) to be able to launch tasks, including installation and test
- With npm link we create a symbolic link so that it detects it in node_modules and so we can use it
- Finally we install the gulp run module (locally) since we use it in our task manager
> RUN npm install -g gulp-cli && npm link gulp && npm install gulp-run
- We change the node user to have no privileges
> USER node
- We launch the task that installs the dependencies
> RUN gulp install.
- We call the task that launches the tests
> CMD ["gulp", "test"]


Finally I decide to stay with Node-Alpine for the following reasons:
- The resulting Dockerfile is simpler.
- The image is developed and maintained by the Node.js Docker Team , who optimize and adapt the images so that the language works as well as possible.

# FOR THE COMPARISON PURPOSE WE USE THE FOLLOWING SCREEN SHOT:

<img src="https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/Docker-images.png" width="1000" height="700">





# Best practices:
- A concerted effort has been made to unify the instructions as much as possible RUN, side by side, with the goal of reducing the number of layers in the container.
- At all times, the appropriate permissions were used, culminating in the installation and testing with users with no privileges. We used the node user, which was created for this purpose.
- Labels are used to identify the project, and they are all placed on the same line.
- We only copy what is fair and necessary: the dependencies and tasks files.
- We also make an effort to install only what is required for the test to run (gulp and a module of it).
- It is also a good practice to separate the installation of dependencies from the rest of the actions that have been completed.
- It is good to see further information inside [This link](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) .

---
# [Test-milestone:Completed](https://github.com/khawla-k-banydomi/ActivityScheduler/milestone/5)



