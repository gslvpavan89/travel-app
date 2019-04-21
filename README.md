This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Steps to run:
run below commands
npm install --to install required ui packages
npm run build -- to build the code
npm start -- to start the server

Design:

1)I designed frontend app in Reactjs and created 4 pages
2) As the boot app is secured by oauth2 
  for all api calls i am checking whetehr a valid token exists and verifying is it valid  else
 i am fetching a new token and attaching it to http request
3)I created page Fares which will give 2 dropdowns for source and destination.
Both of them are searchable. After selecting values in both dropdowns click on fetch fares button
Then you can see the fare for the source and destination
4)I created a page Metrics which will show 
total no of requests
total no of OK requests
total no of requests with 4xx status
total no of requests with 5xx
For this i used spring-boot-starter-actuator ,
due to version dependency  of actuator timetaken value is not coming in trace response.

5)I created a page Airports which shows airports in pages,
you can change page size, use next,previous pages button.
I am using server side pagination (fetching page data on each subsequent request)
6)I didnt worked on search by keyword
7) I also added code such that all api uri's are configurable
I am fetching uis from model.js in which the properties are being set from .env


