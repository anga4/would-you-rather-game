## Would You Rather Game

The would you rather game is a web app built with react and redux
The Game allows a logged in user to create answer a question from two, create his own question and view questions created by other users.

## Installing the app locally

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

-   First, Extract the project
-   cd into the project directory on your terminal
-   install dependencies by typing `npm install`
-   start the application by typoing `npm start`
-   a new browser window should automatically open and display the app. If it doesn't, navigate to `http://localhost:3000/`

## Communicating with the databse

The code communicates with the database via 4 methods:

-   `_getUsers()`
-   `_getQuestions()`
-   `_saveQuestion(question)`
-   `_saveQuestionAnswer(object)`
