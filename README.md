This is a performance review app that allows the user to manage their employees, their reviews and their feedback.

Check out the [screenshots](https://github.com/paulsalinas/PerformanceReview/tree/master/readme_images)

## How do you use this?
* git clone this repo
* npm install
* npm run server
* npm start

NOTE: must have mongo db installed

## Tools
This app was made with the following:
* create-react-app
* react-router
* react-bootstrap
* express
* parse-server
* storybook

## Architecture Description
* express and parse-server on the backend

* the app maintains 3 routes using react-router:
  * /admin - for admin view
  * /login - to allow the user to navigate to a particular user's feedback page by entering 'firstName' and 'lastName'
  * /feedback/:employeeId - the feedback view for the particular employee id

* for each route we have a container component which 'injects' remote datasource behaviours to the inner presentational components
  * they also maintain the state for each route

## TODO
*  need to add the ability to add other employees to participate in a review
  * Possible solution: show dialog or panel to be able to add employees from an employee table
* loading indicators during api calls
* form validation
* there's some refactoring that needs to be done.
  * ie. AdminBody component is pretty bloated
* move to a redux architecture
* move URL CONSTANTS to one location and in a separate file

## Assumptions
* no auth for now
* no error handling

## Data Model Design
* Maintain two 'parse' classes or lists
  * Employees
    * firstName
    * lastName
  * Reviews
    * grade
    * notes
    * feedback
    * employeeId
