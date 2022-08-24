# Git & Github Setup:octocat:
## :atom: Introduction
> Git is a well-known version control system which help the developer to keep track of their projects that should *monitor changes, go back to the 
> previous versions or stages and create several branches for the files and directories).* GitHub can be considered as an important platform and cloud-based service 
> which deal with the git repositories and manage them in a proper way.
> This file contains guidelines for installing and configuring Git and GitHub so that it becomes ready to use for the development of our :cloud: cloud-computing
>  project. It is important to notice that the current commands will be used under the linux environment.


### :feet: Configuration Steps

 ##### 1️⃣    _Create github account_  
 The user can Go to the official website [GitHub ](https://github.com/) then sign up with his email address and his preference password
 ![](https://user-images.githubusercontent.com/91540484/135821573-bf860089-f8ea-4647-9479-4e282552fcde.png)

 
 ##### 2️⃣    _Install Git packages_
 Open up your terminal and just write down the following command :
 - sudo apt install git.
![]( https://user-images.githubusercontent.com/91540484/135821580-452ab335-fb87-4813-95e6-c80853cda32d.png)

 
 ##### 3️⃣    _Make sure that Git has been installed_
 Open up your terminal and write down the following command :
 - git --version.
 
 ![](https://user-images.githubusercontent.com/91540484/135821582-2bf00eee-1734-4f3a-8871-1dbe87e83f6e.png)
 
 
 
 
 ### 4️⃣   _Configuring GitHub profile_
 - user can change several settings like the following mention in this picture: 
 ![](https://user-images.githubusercontent.com/91540484/135826342-bc7a03e1-3893-4f1b-b437-41dec7ad19b5.png)
 
 + # Make the prober configuration by adding email , user-name ,
![](https://user-images.githubusercontent.com/91540484/135887825-faf47efc-d5e5-4776-add6-bbef080bcfb7.png)
+ # by chooseing the git config --list on your terminal you can get the whole configuration of your github account.
![](https://user-images.githubusercontent.com/91540484/135887825-faf47efc-d5e5-4776-add6-bbef080bcfb7.png)

[This page](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration) can provide further configuration:

 

 
 ### 5️⃣   _Keep Your Account Secure_
 All the Authentication steps can be found in [this page](https://docs.github.com/en/authentication)
 - [SSH Key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh): 
 + It is important since you can connect to a GitHub account without providing your personal access for each visit.
 In order to add SSh key for my account I already hit these command in my terminal:
 + ssh-keygen -t ed25519 -C "cloudcomputing1989@outlook.com"
 + choose enter
 + type a passphrase & retype the same passphrase for the confirmation
 + eval "$(ssh-agent -s)"
 + ssh-add ~/.ssh/id_ed25519
 + cat ~/.ssh/id_ed25519.pub #This will display the generated SSH key
 + select the provided key and copy it.
 + open up your GitHub account then from the setting choose (ssh and GPG).
 + select - new ssh key.
 + paste what have been copied and hit-add ssh key.

![](https://user-images.githubusercontent.com/91540484/135828892-33d348d1-af00-46eb-9c45-088ba56487af.png)
![](https://user-images.githubusercontent.com/91540484/135821586-1ab23b57-f4ec-4ad5-84e0-995ad4220a8c.png)
 
 
 
 ##### [GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification):
  + It is important since you can sign your commit locally using GPG; GitHub will verify these public keys and the source of the commits will be trusted.   
 In order to add GPG key for my account I already hit these command in my terminal:
 + gpg --full-generate-key
 + Choose the type of the key you want or simply choose enter to choose the default
 + Choose the size of the key
 + choose enter to choose the default time length of the key(this time mean that the key will be valid all the time ) or you can choose the expiry date for the time.
 + Make sure that your selections are okay. 
 + Enter your ID
 + choose your passphrase and make sure your passphrase is secured.
 + gpg --list-secret-keys --keyid-format=long
 + Select the GPG key ID which will be located between the / and the white space, and make a copy.
 + gpg --armor --export (GPG key ID).
 + select the generated GPG key and copy it.
 +  + open up your GitHub account then from the setting choose (ssh and GPG).
 + paste what has been copied and hit-new the GPG key.
   In order to add GPG key for your account do the following :
   
   ![](https://user-images.githubusercontent.com/91540484/135828118-771ce71e-c66f-470a-b35c-17d9e4d8fe62.png)
   
 ##### [2FA](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa): 
   In order to add 2FA key for your account do the following :
   enabling this property is important since it can be used as a second layer of security; so besides that the user has to provide his username and passcode ; he has to provide another way of authentication that he only knows about.
   from your account setting just choose account security and choose Two-Factor-Authentication and follow the procedure by choosing the proper means for doing this; in my situation I choose SMS for enabling this property.
   At the end you have to get the following.
   ![](https://user-images.githubusercontent.com/91540484/135826333-68f0af0c-dd8a-48a4-8a8a-f4d828ae33fa.png)
 
 
 
### 6️⃣ Repository
##### +  The user can save his project in repository in this context he has two options:
###### +  Create repository from scratch 
+ In order to create a new repository  so the following:
+ ![](https://user-images.githubusercontent.com/91540484/135880689-e5555042-af82-4dcf-af39-2c4203d6a5ef.png)
+ ![](https://user-images.githubusercontent.com/91540484/135880684-ba17cb6e-dcaf-4b8c-b1e5-0a101bf192ed.png)
+ + Then simply choose on (Create repository)
###### +  Fork an existing repository and edit it
+ ![](https://user-images.githubusercontent.com/91540484/135889326-f4bf51e4-f8ca-43ca-ab6d-56b7a14217e5.png)



+ ## The main repositories regardingProfile regarding CC course:

###### [Fork from the main repository of the cloud computing course](https://github.com/khawla-k-banydomi/CC-21-22)

###### [Cloud computing project](https://github.com/khawla-k-banydomi/cloudcomputingrepo)

### 7️⃣ Branch 
+ The branch can be defined as a moveable pointer with the commit; it is actually a stand-alone bulk of code that varies with stand-alone names.
+ The main and the default branch is called -master- however the user can make several branches where each branch carry a copy of files and directories.[main](https://github.com/khawla-k-banydomi/cloudcomputingrepo/branches).

### 8️⃣ Configure Remotes for the Forked Repo
I follow these steps:
-download the forked repository in my local machine.
+ go to the directory where I download the repo into and open up my terminal and write down (git remote -v)
+ go the original repo that I already forked from and I copy the url then open up my terminal and hit the following command:
+ git remote add upstream "the url for the original repo you already forked from"
 I just do the following:
![](https://github.com/khawla-k-banydomi/cloudcomputingrepo/blob/main/doc/remote-configuration.png)

### 9️⃣ Further Details
+ Project: it is a good practice to start this subject by creating your own project with breif description about it.[Here](https://github.com/khawla-k-banydomi/cloudcomputingrepo/projects) I create my first Project.
+ Issue: issue helps me to keep track of my tasks. I create my first issue which I drag and drop my screenshots.[Here](https://github.com/khawla-k-banydomi/cloudcomputingexercises/issues/1).
You can check further issues [Here](https://github.com/khawla-k-banydomi/cloudcomputingrepo/issues)
+ MileStone:it helps the user to keep track of a group of issues. [Here](https://github.com/khawla-k-banydomi/cloudcomputingrepo/milestones) I created my first MileStone related to my project.


# Additional objectives:
learn markdown scripting language and how to use it in a proper way; in my situation I learn it from [Here](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).


### 🔚️ The end of the first Milestone.
   [Close-milestone-0](https://github.com/khawla-k-banydomi/cloudcomputingrepo/milestones).
   [Complete-milestone-0](https://github.com/khawla-k-banydomi/cloudcomputingrepo/milestones?state=closed)
   
### ℹ️ Further Resources:
+ 🕸️ [1](https://git-scm.com/book/en/v2)
+ 🕸️ [2](https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-config)

   
   
   

 
 





