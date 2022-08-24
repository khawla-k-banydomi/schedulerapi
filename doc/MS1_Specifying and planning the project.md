


# Main Repository For The Subject
- To Take a tour around the Application That I want to develop please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/Description.md). 🗓️
- To see How I configure my Github account Please Go [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/blob/main/doc/Configuration.md). 🔧
- This application was created to allow me to keep track of my personal work agenda online, rather than having to keep track of it on paper or in a notebook, in order to write down tasks to be completed or meetings at work to which they must contribute; thus, this application will be very useful in the future.



# Milestones ⏲️
Different milestones have been established [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/milestones).
# Issues: ❗
There are several issues I have already created. [Here](https://github.com/khawla-k-banydomi/ActivityScheduler/issues?q=is%3Aissue+is%3Aclosed).
# User Stories : 📚 (historia de usuario) 
- I have created several user stories which are the following:<br>
- [US1](https://github.com/khawla-k-banydomi/ActivityScheduler/issues/4)<br>
- [US2](https://github.com/khawla-k-banydomi/ActivityScheduler/issues/5)<br>
- [US3](https://github.com/khawla-k-banydomi/ActivityScheduler/issues/6)<br>
- [US4](https://github.com/khawla-k-banydomi/ActivityScheduler/issues/7)<br>
- [US5](https://github.com/khawla-k-banydomi/ActivityScheduler/issues/8)<br>
- [US6](https://github.com/khawla-k-banydomi/ActivityScheduler/issues/9)<br>
- [US7](https://github.com/khawla-k-banydomi/ActivityScheduler/issues/10)<br>
- [US8](https://github.com/khawla-k-banydomi/ActivityScheduler/issues/11)<br>
- [US9](https://github.com/khawla-k-banydomi/ActivityScheduler/issues/12)<br>
- [US10](https://github.com/khawla-k-banydomi/ActivityScheduler/issues/13).

It is important to notice that user story shouldn't be closed untill it is well-implemented in the context of the application functionality.
[Here](https://gist.github.com/seanh/8a5b7b36d5c4fdfcfbd3b42506296968) there are several important things regarding the uer-stories.


# Main classes and methods :
The main [Classes](https://github.com/khawla-k-banydomi/ActivityScheduler/tree/main/src/models) as well as [CRUD operations](https://github.com/khawla-k-banydomi/ActivityScheduler/tree/main/src/Controllers)

It shows the interface of the class (functions with arguments that will have the appropriate type and number, but without any business logic or functionality).


# Cloud Deployment ☁️
#### *Using cloud provide us with several advantages such as the following:* 📦
- Faster. Builds that deploy code, databases, and application releases, including resource provisioning, can be automated.
- Cost savings. Control costs with consumption-based pricing and eliminate capital-intensive on-premises environments.
- Growth platform Utilize the global infrastructure provided by cloud service providers to seamlessly expand the business into new geographies.
- Scalability and agility. To meet peak business demands without provisioning for excess capacity, use auto-scaling and scalability.
- Geographic coverage. users can access applications from any location and on any device.
- Efficiency in operations. Use the cloud's inherent automation to improve operational efficiency and reduce human effort.
- A competitive advantage. Reduce the time to market for new features by leveraging infrastructure as code and development, security, and operations.
- Empowered users. Increase productivity by providing cloud-based self-service options for users, such as portals, executive and operational dashboards.


#### Entities to be deployed:
- Events .
- A set of Holidays.

#### Client:
- myself(It is developed to manage my personal timeline)


 
 # Application Architecture 🏗️
### The first and most important step in the software development is to select the Architecture; in this context I choose Layered architecture.

Layered architecture is implemented strictly following MVC approach. Moreover, business logic is 
completely separated from controllers while implementing to make sure that code is reusable, 
easy to refactor and a better way to structure project overall.

The separation of concerns among components is a powerful feature of the layered architecture pattern.
Components within a specific layer only deal with logic specific to that layer.


#### I choose it since it has the following *advantages*:
- High degree of testability Because components are associated with specific layers of the architecture,other layers can be mocked or stubbed, making this pattern relatively simple to test.
- This pattern is so well known and is not overly complex to implement, it is a natural choice for most business-application development.
- Additionally, because most companies develop applications by separating skill sets by layers, this pattern becomes a natural choice for most business-application development.
- Maintainable
- Separate "roles" are simple to assign.
- It is simple to update and improve layers separately.

### This Pattern is Ideal for:    🎬

- Line-of-business apps that perform more than just CRUD operations.
- New applications that must be developed quickly.
- Teams comprised of inexperienced developers who are unfamiliar with other architectures, but whose applications necessitate strict maintainability and testability standards

 
 
 
