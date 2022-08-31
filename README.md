
# Main Repository For The Subject
- To see How I configure my Github account Please Go [Here](https://github.com/khawla-k-banydomi/schedulerapiCE/blob/main/doc/Configuration.md). 🔧
- To see the First Milestone (hito-0) and To Take a tour around the Application That I want to develop please Go [Here](https://github.com/khawla-k-banydomi/schedulerapiCE/blob/main/doc/Description.md). 🗓️
- To see full descriptive document for the architecture and tools that I already and will use during the development check this [Document](https://github.com/khawla-k-banydomi/schedulerapiCE/blob/main/doc/Architecture.md) 📔
- To see the Second Milestone (hito-1) and To take a tour around milestones and issues regarding the application please Go [Here](https://github.com/khawla-k-banydomi/schedulerapiCE/blob/main/doc/MS1_Specifying%20and%20planning%20the%20project.md). 🗒️
- To see the complete description of the user stories please Go [Here](https://github.com/khawla-k-banydomi/schedulerapiCE/blob/main/doc/User-Stories.md). 📓
- There are several unwanted [issues](https://github.com/khawla-k-banydomi/schedulerapiCE/issues?q=is%3Aissue+is%3Aclosed) regarding testing milestone.
---
### This is the Document for the Second-milestone which is the [test](https://jj.github.io/CC/documentos/proyecto/2021/2.Tests) milestone.
- To sum up I have to add the following features:<br>
- Testing-Framework and Assertion-Library, and configure the [cc.yaml](https://github.com/khawla-k-banydomi/schedulerapiCE/blob/main/cc.yaml) file correctly.
- In this case I’ll be using Mocha which allows asynchronous testing using any assertion library, Chai as well is a Javascript Assertion Library; It performs functions and methods to test the code.
> How to run the test:<br>
>  gulp test 

# TaskManager
- For task management, I've gone back and forth between npm, grunt, and gulp. All three tools are well-known in the Javascript community, and any of them could be useful for the purposes of this project.We are already using npm as a dependency manager in our project. Since we already use it for that, I'd like to have a separate task management tool (which leaves us between grunt and gulp).Grunt and Gulp are two tools that do the same thing: they automate tasks. Although the performance benchmarks that I've been observing place gulp above, it is not a factor that we will consider.Where we see a significant difference is in the notation of these tools: whereas grunt is more focused on configuration files (JSON type), gulp is focused on code (Javascript), which in my opinion makes it easier to use.
comprehend and apply.

- I ultimately chose Gulp because of what I previously mentioned; However there are several alternatives such as Grunt.
There are several differences between Grunt and Gulp. To see more information about this you can visit this [source](https://www.keycdn.com/blog/gulp-vs-grunt).
You can look at [gulp.js](https://github.com/khawla-k-banydomi/schedulerapiCE/blob/main/gulpfile.js), There are several tasks inside this file.
*One is to ensure that Gulp is working properly (Gulp Tasks are working) which can be considered as a test task.
*The other one for the server which is (start and restart the server).

# Assertion Library:
- There are numerous assertion libraries for Javascript, and the language itself has an assertion library (assert).
There are two approaches: [BDD](https://www.agilealliance.org/glossary/bdd/) and [TDD](https://www.agilealliance.org/glossary/tdd/). and there are several differences between the two mentioned approaches [inside this link](https://www.pluralsight.com/blog/software-development/tdd-vs-bdd).
Because we are using domain-driven design in conjunction with user stories, and the client is guiding the project's development, I believe the BDD approach is more appropriate.
- BDD-like assertion libraries are intended to be close to natural language. In this way, they are easier to understand and adapt to the user's needs. The library that I have finally chosen is [Chai.js](https://www.chaijs.com/) , which has expressions of the type expect (). To.be.a () or expect (). To.equal () . we can see the different styles of Chai's assertions [inside this blog](https://www.chaijs.com/guide/styles/).


# Testing-Framework:


- Since we've chosen BDD(Behavior Driven Development), some benchmarks that align with this philosophy are Mocha, Cucumber, and Jest.
Any of them can be used in conjunction with Chai, but the Chai + Mocha combination appears to be quite popular in the community ([inside this link](https://www.chaijs.com/guide/installation/),it is obvious that Chai recommends Mocha, but keep in mind that it is compatible with anyone), so we chose that combination. 

<br>

---
## [Importante]()
##Sometimes it is a must to clean the (npm) cache on you computer before running the test to avoid any sudden error, you can force clear the cache by running: [npm cache clear --force](https://coder-coder.com/npm-clear-cache/#:~:text=Run%3A%20%E2%80%9Cnpm%20cache%20clean%20%E2%80%93force%E2%80%9D&text=are%20both%20not%20working%20and,npm%20cache%20on%20your%20computer.), this will force delete the npm cache on your computer.

## To run the test we can write down the following command:

### [gulp test]()

- There are several tasks in the [test folder](https://github.com/khawla-k-banydomi/schedulerapiCE/blob/main/test) that could be tested which are the following:

# [Event Entity](https://github.com/khawla-k-banydomi/schedulerapiCE/blob/main/test/api_event.js)

[Events Service Tests]()

    [List Events]()
      ✓ return all events
    Single Event
      ✓ return an event by id
      ✓ throw an not found error if id does not match


    [Create an Event]()
    
      ✓ create an event
      ✓ not authenticated user can not create a new event
      ✓ start time must be before end time
      ✓ start time must be in the future
      ✓ reminder time must be prior start time
      
    [Update an Event]()
    
      ✓ update an event
      ✓ throw error if event does not exist
      ✓ start time must be before end time
      ✓ start time must be in the future
      ✓ reminder time must be prior start time
      
    [Delete an Event]()
    
      ✓ delete an event
      ✓ throw error if event does not exist
    Restore an Event
      ✓ restore an event
      ✓ throw error if event does not exist

  [Events Controller Tests]()
  
    ✓ return a list of events
    ✓ return a single event by exact id
    ✓ create a new event
    ✓ update an event
    ✓ delete an event
    ✓ reset an event

  # [Holiday Entity](https://github.com/khawla-k-banydomi/schedulerapiCE/blob/main/test/api_holiday.js)

  [Holidays Service Tests]()
  
    List Holidays
      ✓ return all holidays
    Single Holiday
      ✓ return an holiday by id
      ✓ throw an not found error if id does not match
    Create an Holiday
      ✓ create an holiday
      ✓ not authenticated user can not create a new holiday
    Update an Holiday
      ✓ update an holiday
      ✓ throw error if holiday does not exist
    Delete an Holiday
      ✓ delete an holiday
      ✓ throw error if holiday does not exist

  [Holidays Controller Tests]()
  
    ✓ return a list of holidays
    ✓ return a single holiday by exact id
    ✓ create a new fixed-day holiday
    ✓ create a new ranged-days holiday
    ✓ update an holiday
    ✓ delete an holiday

 # [User Entity](https://github.com/khawla-k-banydomi/schedulerapiCE/blob/main/test/api_user.js)
  
  [Users Service Tests]()
  
    ✓ return single user
    ✓ create a new user

  [Users Controller Tests]()
  
    ✓ return the user profile
    ✓ register a new user


- The following screen-shot shows the whole result after run :[gulp test]()

<img src="https://github.com/khawla-k-banydomi/schedulerapiCE/blob/main/doc/unit%20test%201.png" width="1000" height="700">

<img src="https://github.com/khawla-k-banydomi/schedulerapiCE/blob/main/doc/unit%20test%202.png" width="1000" height="700">

---
# [Test-milestone:Completed](https://github.com/khawla-k-banydomi/schedulerapiCE/milestone/5)





