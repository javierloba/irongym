# IronGym 



## Description

Search and collaborative data base platform for gym activities and personal trainer appointments. In this website, once you've registered yourself in our data base, you will be able to select your favourite activity among a list of them and as well you might be able to choose the personal trainer that most suits you for you personal session. As a user, you may want to modify your address, email or profile picture, that's another functionality a registered user will have. Also you will be able to delete an appointment with your personal trainer or any activity. 

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **Homepage** - As a user I want to be able to access the homepage and filter by activities and personal trainers, log in and sign up.
- **Sign up** - As a user I want to sign up on the web page so that I can book my favourite activities and personal trainer appointments. 
- **Login** - As a user I want to be able to log in on the web page so that I can get back to my account and interact with the different options of the website.
- **Logout** - As a user I want to be able to close the active session from the web page so that I can make sure no one will access my account. 
- **Edit profile** - As a user I want to be able to edit my personal data in my profile.
- **Profile** - As a user I want to be able to check my personal data, activities and trainers appointments. 

## Models

User model

```javascript
{
  image: {type: String, default: }
  name: {type: String, required: true, trim: true},
  email: {type: String, required: true, lowercase: true, trim: true},
  password: {type: String, required: true, trim: true},
  age: {type: Number, required: true}
  activityReserve: [],
  trainerReserve: []
}
```



Activity model

```javascript
{
  image: String, 
  name: {type: String, required: true},
  description: {type: String, required: true}, 
  date: {type: Date, default: Date.now},
  hour: {type: Date, default: Date.now}
}
```



Trainer model

```javascript
{
  image: String, 
  name: {type: String, required: true}, 
  age: {type: Number, required: true}, 
  certificate: String, 
  description: {type: String, required: true}
  sports: {type: String, required: true}  
}
```

## Server Routes (Back-end):

|            |                               |                                                              |                                       |
| ---------- | ----------------------------- | ------------------------------------------------------------ | ------------------------------------- |
| **Method** | **Route**                     | **Description**                                              | **Request - Body**                    |
| GET        | /                             | Main page route. Renders home index view.                    |                                       |
| GET        | /signup                       | Renders auth/signup form view.                               |                                       |
| POST       | /signup                       | Sends Sign Up info to the server and creates user in the DB. | { email, password }                   |
| GET        | /login                        | Renders auth/login form view.                                |                                       |
| POST       | /login                        | Sends Login form data to the server.                         | { email, password }                   |
| GET        | /logout                       | Logges user out and redirect to index view.                  |                                       |
| GET        | /private/edit-profile/:userId | Private route. Renders private/edit-profile form view.       |                                       |
| POST       | /private/edit-profile         | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, name, image, age } |
| GET        | /activities                   | Renders the activities view.                                 |                                       |
| POST       | /activities                   | Sends activity info to activityReserve in DB                 | { name, date, hour }                  |
| GET        | /trainers                     | Renders trainers view                                        |                                       |
| POST       | /trainers                     | Sends trainer info to trainerReserve in DB                   | { name, date, hour }                  |
| GET        | /private/profile/:userId      | Private route. Renders private/profile view.                 |                                       |
| POST       | /private/profile/:userId      | Executes delete button function for activityReserve in DB.                                      Redirects to /private/profile/${userId} |                                       |
| POST       | /private/profile/:userId      | Executes delete button function for trainerReserve in DB.                                      Redirects to /private/profile/${userId} |                                       |

**Backlog**

See Trello board



**Links**

**GitHub** 

https://github.com/javierloba/irongym

**Heroku**

http://irongymbcn.herokuapp.com/

**Trello**

https://trello.com/b/srS2PSvs/irongym-project-2

**Slides**

https://projects.invisionapp.com/share/RK10T5HEANM7#/screens/450311398
