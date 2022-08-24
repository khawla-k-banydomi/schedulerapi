
# Main Repository For The Subject
- To see How I configure my Github account Please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/Configuration.md). 🔧
- To see the First Milestone (hito-0) and To Take a tour around the Application That I want to develop please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/Description.md). 🗓️
- To see full descriptive document for the architecture and tools that I already and will use during the development check this [Document](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/Architecture.md) 📔
- To see the Second Milestone (hito-1) and To take a tour around milestones and issues regarding the application please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/MS1_Specifying%20and%20planning%20the%20project.md). 🗒️
- To see the complete description of the user stories please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/User-Stories.md). 📓
- There are several unwanted issues that will be colsed and taged as removed.
---
### This is the Document for the Second-milestone which is the [test](https://jj.github.io/CC/documentos/proyecto/2021/2.Tests) milestone.
- To sum up I have to add the following features:<br>
- Testing-Framework and Assertion-Library, and configure the [cc.yaml](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/cc.yaml) file correctly.
- In this case I’ll be using Mocha which allows asynchronous testing using any assertion library, Chai as well is a Javascript Assertion Library; It performs functions and methods to test the code.
> How to run the test:<br>
>  gulp test 

# TaskManager
- For task management, I've gone back and forth between npm, grunt, and gulp. All three tools are well-known in the Javascript community, and any of them could be useful for the purposes of this project.We are already using npm as a dependency manager in our project. Since we already use it for that, I'd like to have a separate task management tool (which leaves us between grunt and gulp).Grunt and Gulp are two tools that do the same thing: they automate tasks. Although the performance benchmarks that I've been observing place gulp above, it is not a factor that we will consider.Where we see a significant difference is in the notation of these tools: whereas grunt is more focused on configuration files (JSON type), gulp is focused on code (Javascript), which in my opinion makes it easier to use.
comprehend and apply.

- I ultimately chose Gulp because of what I previously mentioned; However there are several alternatives such as Grunt.
There are several differences between Grunt and Gulp to see more information about this you can visit this [source](https://www.keycdn.com/blog/gulp-vs-grunt).
You can look at [gulp.js](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/gulpfile.js), There are several tasks inside this file.
*One is to ensure that Gulp working properly (Gulp Tasks are working) which can be considered as test task.
*The other one for the server which is (start and restart the server).

# Assertion Library:
- There are numerous assertion libraries for Javascript, and the language itself has an assertion library (assert).
There are two approaches: [BDD](https://www.agilealliance.org/glossary/bdd/) and [TDD](https://www.agilealliance.org/glossary/tdd/). and there are several differences between the two mentioned approaches [inside this link](https://www.pluralsight.com/blog/software-development/tdd-vs-bdd).
Because we are using domain-driven design in conjunction with user stories, and the client is guiding the project's development, I believe the BDD approach is more appropriate.
- BDD-like assertion libraries are intended to be close to natural language. In this way, they are easier to understand and adapt to the user's needs. The library that I have finally chosen is [Chai.js](https://www.chaijs.com/) , which has expressions of the type expect (). To.be.a () or expect (). To.equal () . we can see the different styles of Chai's assertions [inside this blog](https://www.chaijs.com/guide/styles/).


# Testing-Framework:


- Since we've chosen BDD(Behaviour Driven Development), some benchmarks that align with this philosophy are Mocha, Cucumber, and Jest.
Any of them can be used in conjunction with Chai, but the Chai + Mocha combination appears to be quite popular in the community ([inside this link](https://www.chaijs.com/guide/installation/),it is obvious that Chai recommends Mocha, but keep in mind that it is compatible with anyone), so we chose that combination. 

<br>

---
### To run the test we can write down the following command:
### gulp test
- There are several tasks in the [eventsTest.js file](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/test/eventsTest.js) that could be tested which are the following:
- Testing GET event 
- Testing POST event
- Testing modify(PATCH) event
- Testing DELETE event

- The following screen-shot shows the whole result after run :gulp test

<img src="https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/complete-test-MS2.png" width="1000" height="700">

---
# [Test-milestone:Completed](https://github.com/khawla-k-banydomi/ActivityScheduler/milestone/5)



