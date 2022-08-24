### The first and most important step in the software development is to select the Architecture; in this context I choose Layered architecture.

Layered architecture is implemented strictly following MVC approach. Moreover business logic is 
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

**This Pattern is Ideal for:**

- Line-of-business apps that perform more than just CRUD operations
- New applications that must be developed quickly
- Teams comprised of inexperienced developers who are unfamiliar with other architectures, but whose applications necessitate strict maintainability and testability standards


<br />

---
### Full Description for the *architercture/tools* used for the development of this application 

<table border="10">
<tr><td><th>  Architecture of Restful API  </th></td></tr>
<tr>
    <td>NodeJs</td>
    <td>It's used to create a backend service and choose node js due to its non-blocking nature to build event driven server</td>
 </tr>
    <tr>
    <td>ExpressJS</td>
    <td>Expressjs is used as a middleware in nodejs to design and build API’s.</td>
 </tr>
 <tr>
    <td>Mongoose</td>
    <td>Mongodb is a database while mongoose is an ODM( Object Data Modeling) which manages relationships between data.</td>
 </tr>
    <tr>
    <td>Chai/ Mocha</td>
    <td>Mocha allows asynchronous testing using any assertion library. In this case I’ll be using Chai which is a Javascript Assertion Library. It performs functions and methods to test the code.</td>
 </tr>
   <tr>
    <td>Docker</td>
    <td>Docker is used for Containerization, it packages an application and its dependencies together in a container. It allows our application to run smoothly irrespective of the changes in environment.</td>
 </tr>
 <tr>
    <td>Github-Actions </td>
    <td>For Continuous Integration, it allows us to create workflows, to compile, deploy and test our code.</td>
 </tr>
</table>


<!-- 
There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the 
raw Markdown line up prettily. You can also use inline Markdown. -->

