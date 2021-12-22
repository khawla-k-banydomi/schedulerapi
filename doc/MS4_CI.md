

# Continuous Integration Systems(CIs) Justification

- To see How I configure my Github account Please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/Configuration.md). 🔧

- To see full descriptive document for the architecture and tools that I already and will use during the development check this [Document](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/Architecture.md) 📔
- To see the First Milestone (hito-0) and To Take a tour around the Application That I want to develop please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/MS0_Description.md). 🗓️

- To see the Second Milestone (hito-1) and To take a tour around milestones and issues regarding the application please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/MS1_Specifying%20and%20planning%20the%20project.md). 🗒️

- To see the Third Milestone (hito-2) and To take a tour around testing in the context of our application please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/MS2_Testing.md). 🗒️

- To see the Fourth Milestone (hito-3) and To take a tour around Docker in the context of our application please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/MS3_Docker-documentation.md). 🗒️

- To see the complete description of the user stories please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/User-Stories.md). 📓

> This milestone is responsible for what so called as a continuous integration which can be defined as the process of automating the integration of the code from several contributors into a unified project.[Read more Here](https://www.atlassian.com/continuous-delivery/continuous-integration).

- There are a huge number of automated tools that can be used to assert code’s correctness before integration; however in my case I am going to use two continuous integration systems in the first section which are:

- Travis CI . In which I basically test the language
- CircleCI .  In which I basically test the docker Image.

In the second section I will try several alternatives for Travis :
> There are several continuous integration systems and tools that can be used such as TeamCity , Jenkins and Appveyors I will concentrate on Appveyors 

Travis CI
Once we authorize Travis to access our repository, we have to select it to activate with each push as well we have to select the free plan at the beginning.

[First Version](https://github.com/khawla-k-banydomi/schedulerapi/blob/main/.travis.yml) of the .Travis.yml file which contains only the test for the language.

<img src="https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/Travis%20Access.png" width="1000" height="400">
<img src="https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/Travis%20build.png" width="1000" height="400">

<img src="https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/Travis%20after%20building.png" width="1000" height="500">

[Final Version]
I have to test several language versions so that I have to include the follwoing in the .travis file and see the results:

<img src="https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/Travis%20languages%20test.png" width="1000" height="200">

<img src="https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/Travis%20config%20file%20.png" width="400" height="600">



# Circle CI

[Authorize](https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/Circle%20Ci%20Authorization.png) the application into GitHub then test the repository using the available templates of the [.circleci/config.yml](https://github.com/khawla-k-banydomi/schedulerapi/blob/main/.circleci/config.yml)
in between I make [This PR](https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/Circle%20Ci%20PR.png) in order to accept the changes from the CircleCi account.

<img src="https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/Circle%20CI.png" width="1000" height="500">

<img src="https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/Circle%20Ci%20success.png" width="1000" height="500">

<img src="https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/Circle%20CI%20update%20build.png" width="1000" height="500">




- Additional tests:
# Appveyor 
- The following steps have be done :

- authorize the access to the Appveyor then Appveyor CI then start writing test scripts (I use this to test Ubuntu only)
```
- image: Ubuntu
stack:
 - node 14
 - node 10
build: off
test_script:
 - gulp test
```
<img src="https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/Appveyor%20Access.png" width="1000" height="500">

<img src="https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/Appveyor%20%20CI%20access.png" width="1000" height="500">

<img src="https://github.com/khawla-k-banydomi/schedulerapi/blob/main/doc/Appveyor.png" width="1000" height="500">

--- 

[Complete Continuous Integration milestone](https://github.com/khawla-k-banydomi/schedulerapi/milestone/7)
