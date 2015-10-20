# ParksOfSanFrancisco

### Features

- See all the parks in SF and get their locations on the map
- Filter by park type
- Get itinerary from one park to another

### Technologies used

- Front-end
  - The map/markers/itineraries are done using LeafletJS
  - All user interactions / animations on the Front-end are made with JQuery (I used JQuery rather than Angular, considering the size of the project)
  - Communication with back-end (fetching data from back-end API) is made with Ajax calls
  
- Back-end
  - The app is written in Node.js
  - The routing is written using Express.js
  - Database : I used MongoDB as database, and MongooseJS as an ODM, to create models and manipulate data from the node application
  
### How to run the app on a local machine (MacOSX 10.9/10.10 machine)

- Install node on your local machine (see well-made article: http://blog.teamtreehouse.com/install-node-js-npm-mac)
- Install mongoDB (see article: https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/) and run 'mongod' in your terminal
- Fork this repo in your terminal, go to the path to the directory and type 'npm install'
- To run the app, type 'npm start' and open 'http://localhost:3000/' in your browser

### Challenges / Overall Feedback

- It was a lot of fun playing around with LeafletJS, and the different functionalities it offers (i.e. routing)
- What I found the most challenging was architecturing the JavaScript code on the front-end (public/index.js), to be able to have clean and modular code, while having functions calling each other. I am pretty happy with the structure and modularity of this code
- Also, performance-wise, I thought it was an interesting challenge to try to balance well between calling the back-end to fetch data and storing location info directly on in the index.js file, for the UX to be more reactive (i.e. when the user picks points to define the itinerary). Therefore, I am pretty satisfied the performance of the app (except for the delay sometimes for the leaflet itinerary box to load)
- No major difficulty building the back-end, as the back-end is pretty basic (routes in express, one model for parkLocation, parsing the data to JSON and setting it to the db)
- If I had more time, I would like to modularize the dabatase model architecture (separate the ParkLocation into different models)
