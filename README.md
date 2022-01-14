
# Micro-services Justification

- To see How I configure my Github account Please Go [Here](https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/Configuration.md). 🔧

- To see full descriptive document for the architecture and tools that I already and will use during the development check this [Document](https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/Architecture.md) 📔
- To see the First Milestone (hito-0) and To Take a tour around the Application That I want to develop please Go [Here](https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/MS0_Description.md). 🗓️

- To see the Second Milestone (hito-1) and To take a tour around milestones and issues regarding the application please Go [Here](https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/MS1_Specifying%20and%20planning%20the%20project.md). 🗒️

- To see the Third Milestone (hito-2) and To take a tour around testing in the context of our application please Go [Here](https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/MS2_Testing.md). 🗒️

- To see the Fourth Milestone (hito-3) and To take a tour around Docker in the context of our application please Go [Here](https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/MS3_Docker-documentation.md). 🗒️

- To see the Fifth Milestone (hito-4) and To take a tour around CI in the context of our application please Go [Here](https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/MS4_CI.md)
- 
- To see the complete description of the user stories please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/User-Stories.md). 📓

> This milestone is responsible for what so called as a micro-services which can be defined as the small and a single service which comes from distributed computing architecture which in turns, connects many small services,it can be delivered via an (API) application programming interface..[Read more Here](https://www.bmc.com/blogs/microservice-vs-api/#:~:text=A%20microservice%20is%20a%20small,application%20programming%20interface%20(API)).

- There are a serveral frameworks for building an API and microservice in the context of nodejs language; however in my case I am going to mention these frameworks and try to concentrate and compare between two of them which might be considered as the most popular frameworks..Hapi,Restify,Expressjs,Sailsjs,Action Her,LoopBack,Feathersjs,Adonisjs,Totaljs,moleculer,Fastify, Polka and Koa can be considered are the most recent framework that can be used in building nodejs microservice API. 

On the one hand,Express is the most widely used and supported. In fact, the majority of other frameworks attempt to imitate their philosophy. On the other hand, because it is such a comprehensive framework, it is dependent on many modules and is somewhat heavy.

This is why I've decided to look into other types of frameworks, which are more "light" and minimalist (also known as microframeworks) and are likely to perform well. Also, because the only one I've tried so far is Express, and I'd like to try something new.

Polka and Koa are the two frameworks that have been tested. We implement the book controller paths for both to see their syntax and operation.

[Polka](https://npm.io/package/napim): which can be described as an extremely minimal, highly performant Express.js alternative. You can see how some routes of the book controller were implemented in the project status of this commit, specifically in index.js. This framework's documentation is available online.

[Koa js](https://koajs.com/#application): In comparison to the previous one, the same task was completed, as evidenced by the project status of this commit and, more specifically, its index.js. This framework's documentation can be found here.

Differences

Polka adheres to the Express syntax in terms of request and response format, with an object containing request information and another containing response information that we can modify (req, res). In the case of Koa, everything is contained within an object known as the "context" (ctx).
As we can see, there is no distinction in Polka between the router that manages the routes and the application or server (the routes hang directly from the application). In the case of Koa, if we have a module (which is not included in the framework's core) to create a router and manage the routes.
We have a method allowedMethods () in the router Koa that will allow the application to detect which methods and routes are defined in order to throw the corresponding error if the client departs from the established routes.
In general, Koa has more support (due to a larger community) and framework-specific plugins (body-parsers, json, loggers, etc.), whereas Polka does not.
In terms of performance, some small benchmarking tests were carried out using the tool wrk. In general, both performed quite similarly in the executions carried out.


Conclusions and options

Polka is a microframework with a minimalist design that allows us to develop applications quickly. In their documentation, they also compare it to other frameworks (such as Koa and Express) in Benchmarks, and it appears to be the most efficient.

However, I believe that the separation of the router from the application, the support via plugins, the larger community, and the overall operation of Koa make it a more complete and interesting option for implementing the API project.

Despite all of these I recommend to use express js since it can be considered as the optimized and best choice..When it comes to creating and exposing APIs (e.g. REST API) to communicate as a client with your server application, Express is an excellent choice for a server.[Read more Here](https://www.robinwieruch.de/node-express-server-rest-api/).



# [Best practices](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
- Accept and respond with JSON
- Use nouns instead of verbs in endpoint paths
- Use logical nesting on endpoints
- Handle errors gracefully and return standard error codes
- Allow filtering, sorting, and pagination
- Maintain good security practices
- Cache data to improve performance
- Versioning our APIs
- Setting up logs

The use of logs is essential in any microservice to have a history of what happens in our application. Many and varied names exist for our language, such as Winston, loglevel, Pino, and Morgan.

For our application, I try (Morgan) but I believe Pino can be considered as a good option because it has a version designed specifically for use with Koa ([koa-pino-logger](https://www.npmjs.com/package/koa-pino-logger)). but [here](https://www.npmtrends.com/express-pino-logger-vs-morgan-vs-pino) is a kind of comparison between morgan, pino and express-pino; there are [several logging tools](https://blog.logrocket.com/comparing-node-js-logging-tools/) in the context of nodejs.


Morgan is a Node. js HTTP request logger middleware. It makes the process of logging requests to your application easier. Morgan could be thought of as a helper who generates request logs.

in my application I use this:
var logger = require('morgan');
app.use(logger('dev'));

- Distributed configuration

 In case of failure, we read the information from an .env 
 Added config by using .env file ;
- process.env.PORT
- process.env.MONGOURI

# REST API design

Below I indicate which routes (method used, the route in parentheses and / or parameters, which are specified at the end of the route preceded by ':') have been developed:

- GET / index -> route to check if server is running
- GET  /event -> fetch all the events and return to user 
- GET /event/:id -> get the event id from user and return that event from the database
- POST /event -> get the event details from user and create the event in database
- PATCH /event/:id -> get the event id from user and details to modify and modify the event in database
- DELETE /event/:id -> get the event id from user and delete the event

# Structuring the tests for API

- We have three differentiated routs:
# - [api_event.js](https://github.com/khawla-k-banydomi/schedulerapi/blob/main/test/api_event.js):
which should test the GET,POST, return 200 if ok,return 404 if not

# - [api_index.js](https://github.com/khawla-k-banydomi/schedulerapi/blob/main/test/api_index.js):
which should test GET for the index, return 200 if ok, return 404 if not.

# - [api_user.js](https://github.com/khawla-k-banydomi/schedulerapi/blob/main/test/api_user.js):
which should test GET for the user, return 200 if ok, return 404 if not.



# Designed errors and exceptions

To manage and control the possible errors that arise in the application, I create a generic exception that includes the name to identify the "type" of exception which it might exist as well an informational message. The exception is defined as a function in exception.js :
```
function Exception(name, msg){
    this.name = name;
    this.msg = msg;
}
```

In this way, we can throw the exception in the controllers, it is caught in the routers (where the different routes are defined, in our case they are in the folder routes ) and thus we can throw a corresponding error code.

now I decided to set two types of exceptions:

   - NotFound . For when we are specifying an operation on a resource (for example, the identifier of an event) and that resource does not exist. In that case we will launch a 404.
  
   - Internal server Error: it is a very general HTTP status code that means something has gone wrong on the web site's server.In that case we will launch a 500.


## To sum up we have the following :

```
# Nodejs, ExpressJs and Mongodb is used to build the restful api;
-  Nodejs is used to build scalable network applications using its event driven approach which makes the API development fast and scalable.

# Following endpoints are implemented;

- GET / index -> route to check if server is running
- GET  /event -> fetch all the events and return to user
- GET /event/:id -> get the event id from user and return that event from the database
- POST /event -> get the event details from user and create the event in database
- PATCH /event/:id -> get the event id from user and details to modify and modify the event in database
- DELETE /event/:id -> get the event id from user and delete the event

# Following are the gulp tests;
- gulp test
- gulp task -> to run the tests
- gulp nodemon -> to start server
- gulp watch -> to watch the app
- gulp start -> to start the app

# morgan logger is used which is a middleware for nodejs

# Added config by using .env file ;
- process.env.PORT
- process.env.MONGOURI
>

```
# References:
- [Tutorial provided by Prof.Claudia](https://restfulapi.net/rest-api-design-tutorial-with-example/)
- [Tutorial related to the subject-'Temas'](http://jj.github.io/CC/documentos/temas/Microservicios.html)
- [Good practices must be followed when building an API](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
