# Group 29 - SoloExplorer

# Project Description:

SoloExplorer is a travel site specifically designed for travallers in their 20s and 30s, seeking a streamlined and engaging way to plan their adventures. The platform supports users in creating, managing, and sharing detailed travel itineraries for multi-country, long-term trips. SoloExplorer stores user profiles, trip itineraries. Users can create and manage detailed itineraries, document and share their travel experiences.

# GOALS: 

## Minimal Requirements

#### User Authentication and Dashboard Management: (Done) 

- user sign-up, login, and logout functionalities using JWT. (Done) 
- Develop a user profile page where users can view and edit their profile information and travel statistics. (Done) 

#### Create a user-friendly interface for creating and managing detailed travel itineraries. (Done) 

- Implement CRUD operations for itineraries (Create, Read, Update, Delete). (Done) 

#### Mapping and Route Planning: (Done) 

- Integrate Google Maps API or Mapbox API to facilitate route planning. (Working on) 
- Allow users to visualize their travel routes and add locations to their itineraries. (Done)


## Standard Requirements 

#### Travel Dashboard: (Done) 

- Implement functionality for users to document their travel plans and view them in a dashboard once clicked. (Done) 
- Allow users to view and manage their trips in an interface. (Done) 

#### Responsive Design: (Working on complete mobile) 

- Ensure the web application is fully responsive and optimized for use on both desktop and mobile devices.

#### Itinerary Sharing and Downloading: (Done) 

- Enable users to share their itineraries with others via a link where other can change and modify. (Not complete) 
- Implement functionality to download itineraries in a simple format (e.g., PDF). (Done) 

#### Basic User Interface (UI) Enhancements: (Done) 

- Improve the overall look and feel of the application by implementing a clean and intuitive UI design. (Done) 

## Stretch Requirements 

#### Community-Based Planning: (done)

- having multiple users able to access and modify trip. (Not Complete) 
- Optional to make it possible to view other people's trip plan (private vs public). (Done) 

#### Personalized Travel Recommendations: (not complete) 

- Develop a basic system to provide personalized travel recommendations based on user preferences and past trips. (Done)

# Tech used 

### Setting Up the Development Environment
Our project initiated by configuring a robust development environment. We utilized Git for version control, enabling efficient collaboration and tracking changes across our codebase. Command-line tools were essential for managing project dependencies and running scripts, ensuring our setup aligned with best practices from the initial workshops and labs.
### Building a Dynamic UI with React
We leveraged React to build the front-end of our trip management application. React’s component-based architecture allowed us to create reusable and maintainable UI components. We utilized `useState` and `useEffect` hooks for state management and side effects, respectively. React Router facilitated seamless navigation between different views, providing a dynamic user experience. This approach mirrors the techniques and principles covered in the React workshops and assignments.
### Developing the Back-End with NodeJS and Express
The server-side logic of our application is powered by NodeJS, with Express as the web application framework. We developed a RESTful API to handle CRUD operations for trips and day cards. Middleware functions were implemented for authentication, request validation, and error handling, ensuring a robust and secure back-end. Asynchronous programming with `async/await` enabled efficient handling of I/O operations, as emphasized in the NodeJS workshops.
### Utilizing MongoDB for Data Management
MongoDB was chosen as our database due to its flexible schema and scalability. We used Mongoose to define schemas, enforce data validation, and manage relationships between documents. Collections were created for users, trips, and day cards, with appropriate indexing to optimize query performance. This setup aligns with the MongoDB workshops, which highlight the advantages of NoSQL databases for managing hierarchical and dynamic data.
### Streamlined Deployment with Render
Our application is deployed on Render, a cloud platform that automates the CI/CD pipeline. We configured Render to handle automatic builds and deployments for both the front-end and back-end. Environment variables are securely managed within Render’s dashboard, ensuring sensitive information is protected. This deployment strategy reflects the best practices discussed in the release engineering workshop, ensuring our application remains up-to-date and scalable.
### Ensuring Security with Networking Practices
We implemented secure user authentication and authorization mechanisms using JSON Web Tokens (JWT). Middleware functions were added to verify tokens and protect routes, ensuring only authenticated users can access certain endpoints. This approach aligns with the networking workshop’s guidelines on securing APIs and managing user sessions, providing a secure and reliable application.
### Conclusion
Our project integrates the full MERN stack, adhering to best practices and utilizing each technology to its full potential. From configuring a solid development environment and building a dynamic front-end with React, to developing a robust back-end with NodeJS and Express, managing data with MongoDB, and deploying seamlessly on Render, our application showcases a comprehensive understanding of modern web development techniques. This technical depth ensures our application is performant, secure, and scalable.


# Above and Beyond 

- Integrated google maps API which was a new technology to our entire team. This required a lot of research and team coversations on how the implementation would be handeled and done. 


# Next Steps 
- Moving forward, we would like to complete our last stretch requirnment which is to create personlised travel reccomendations for each user. These would be based on user prefernces that the user would set up in their profile. We would furhter like to develope this and create a general AI bot which would suggest places to travel to any user in certain countries.
- The step after this would be to make sure the application is completely mobile friendly, allowing travallers to access the trip itinerary on their phone. This is important to us as it will allow users to access the app when they are on the go.


# List of Contributions 

## Andrew 
- Implemented Google maps API
- Working on Front end set up
- Designed and integrated restful API's specifically for the login and sign up components 

## Bhag 
- From the begining of the project, I helped out with the design of the front end in order to allow for seamless integration for our components
- Worked on routing for each page and refactoring code to allow for this
- Designed and Integrated Restful API's specifically for the login and sign up components
- Integrated JWT to allow for user login and token storage across pages, allowing the user to have access to their trips on their profile
- Debugged application for deploymnet

## Daniel 

- Implemented State Management with Redux: I set up and configured Redux for global state management, allowing for efficient state handling and synchronization across various components of the application. This included creating actions, reducers, and using middleware for asynchronous operations.

- Designed and Integrated RESTful APIs: I designed and developed RESTful APIs using Express and Node.js to handle CRUD operations for trips and day cards. This involved creating route handlers, middleware for authentication and validation, and ensuring secure communication between the front-end and back-end.

- Optimized Data Fetching and Performance: I implemented efficient data fetching techniques using useEffect and async/await to manage asynchronous calls to the back-end. I also optimized performance by implementing memoization techniques and leveraging React's built-in hooks to prevent unnecessary re-renders.




## EVERYTHING BELOW WAS FOR PROGRESS 1 

## Who is it for?

SoloExplorer is designed for solo travelers, particularly those in their 20s and 30s, who seek an efficient and enjoyable way to plan their individual trips.

## What will it do?

The platform will facilitate various aspects of solo travel planning, with a primary focus on itinerary creation. It will support users in documenting their trips, accessing travel tips, and connecting with other solo travelers.

## What type of data will it store?

SoloExplorer will store user profiles, trip itineraries, travel journals, reviews, and multimedia content such as photos and videos.

## What will users be able to do with this data?

Users will be able to:

- Create and manage detailed travel itineraries.
- Document and share their travel experiences.
- Access personalized travel recommendations based on their preferences and past trips.
- Review places and activities.
- Share or download their itineraries with various levels of information tailored to different travel styles.

Additional functionalities could include:

- Integrating social media sharing options for users to share their travel plans and experiences with friends.
- Providing real-time travel alerts and updates about weather, flight changes, and local events.
- Offering AI-driven travel recommendations based on user preferences and past trips.
- Developing a community forum for solo travelers to ask questions, share tips, and interact with each other.

# Task Requirements

## Minimal Requirements (Will Definitely Complete)

#### User Authentication and Dashboard Management:

- user sign-up, login, and logout functionalities using JWT.
- Develop a user profile page where users can view and edit their profile information and travel statistics.
  Itinerary Creation and Management:

#### Create a user-friendly interface for creating and managing detailed travel itineraries.

- Implement CRUD operations for itineraries (Create, Read, Update, Delete).

#### Mapping and Route Planning:

- Integrate Google Maps API or Mapbox API to facilitate route planning.
- Allow users to visualize their travel routes and add locations to their itineraries.

## Standard Requirements (Will Most Likely Complete)

#### Travel Dashboard:

- Implement functionality for users to document their travel plans and view them in a dashboard once clicked.
- Allow users to view and manage their trips in an interface.

#### Responsive Design:

- Ensure the web application is fully responsive and optimized for use on both desktop and mobile devices.

#### Itinerary Sharing and Downloading:

- Enable users to share their itineraries with others via a link where other can change and modify.
- Implement functionality to download itineraries in a simple format (e.g., PDF).

#### Basic User Interface (UI) Enhancements:

- Improve the overall look and feel of the application by implementing a clean and intuitive UI design.

## Stretch Requirements (Plan to Complete at Least 1)

#### Community-Based Planning:

- having multiple users able to access and modify trip.
- Optional to make it possible to view other people's trip plan (private vs public).

#### Personalized Travel Recommendations:

- Develop a basic system to provide personalized travel recommendations based on user preferences and past trips.

# Task Breakdown

## Minimal Requirement 1: Itinerary Creation and Management

### Create Itinerary Interface:

##### Design the itinerary creation form layout using React (3 Story Points)

- Design a responsive form layout with fields for trip name, dates, destinations, and activities.
- Ensure mobile-friendly design.

##### Implement state management for the form using Redux (5 Story Points)

- Set up Redux actions and reducers to handle form state.
- Integrate the form with Redux to manage user input and state changes.

##### Connect the form to the backend for data submission (3 Story Points)

- Use axios or fetch for API calls to submit form data.
- Handle form submission and ensure data is sent to the backend.

##### Implement validation and error handling (3 Story Points)

- Add form validation to ensure all required fields are filled.
- Display error messages for invalid inputs or submission failures.

### Develop Itinerary Management Features:

##### Implement the itinerary viewing component using React (3 Story Points)

- Create a component to display a list of existing itineraries.
- Fetch itinerary data from the backend and display it in a list or card format.

##### Implement state management for itinerary data using Redux (5 Story Points)

- Set up Redux actions and reducers to manage the fetched itinerary data.
- Integrate the itinerary viewing component with Redux.

##### Implement itinerary detail view (3 Story Points)

- Create a detailed view component for individual itineraries.
- Display all itinerary details including trip segments, activities, and notes.
- Integrate with Redux to manage the state of the selected itinerary.

## Minimal Requirement 2: User Authentication and Dashboard Management

### Set Up User Authentication:

##### Implement the user registration form using React (3 Story Points)

- Create a form for user sign-up with fields for email, password, and confirmation.
- Style the form to be responsive and user-friendly.

##### Implement state management for the registration form using Redux (5 Story Points)

- Set up Redux actions and reducers to handle form state.
- Integrate the form with Redux to manage user input and state changes.

##### Connect the registration form to the backend for user sign-up (3 Story Points)

- Use axios or fetch for API calls to submit registration data.
- Handle form submission and ensure data is sent to the backend.

##### Implement validation and error handling (3 Story Points)

- Add form validation to ensure all required fields are filled.
- Display error messages for invalid inputs or submission failures.

### Develop User Dashboard Page:

##### Implement the user profile page layout using React (3 Story Points)

- Create a responsive layout to display user information and travel statistics.

##### Implement state management for the profile page using Redux (5 Story Points)

- Set up Redux actions and reducers to manage user profile data.
- Integrate the profile page with Redux to manage state and display data.

##### Implement profile update functionality (3 Story Points)

- Create a form for updating user profile information.
- Connect the form to the backend for data submission.
- Handle form submission and ensure updated data is sent to the backend.

##### Implement validation and error handling for profile updates (3 Story Points)

- Add form validation to ensure all required fields are filled.
- Display error messages for invalid inputs or submission failures.

## Describe your topic/interest in about 150-200 words

Are you dreaming of a multi-country adventure but are overwhelmed by planning? SoloExplorer empowers travelers to ditch the chaos and craft unforgettable solo journeys.

Ditch the spreadsheets and endless travel blog rabbit holes! SoloExplorer empowers you, the intrepid solo traveler, to conquer the burdens of planning and craft unforgettable adventures.

Our platform streamlines the process, letting you build detailed itineraries for your multi-country dream escapes. Imagine having everything in one place: meticulously crafted routes, travel journals overflowing with stories, photos capturing memories, and reviews to guide you, the most efficient ways to get from A to B - stretching your budget. Plus, SoloExplorer goes beyond planning – it fosters connection. Share your itinerary with fellow explorers or keep it private.

Join a thriving solo travel community where you can swap stories, ask questions, and glean valuable insider tips – the kind that unlocks hidden gems and transforms your trip. Plan smarter, travel bolder. SoloExplorer: Your adventure awaits.

## Team Members

- Person 1: Daniel Shmidov - 6th year BUCS student avid Backcountry explorer
- Person 2: Bhag Cheema - 6th year BUCS student!
- Person 3: Andrew Joji - 4th Year CS Major, love trying new things and bringing ideas to reality.

## Images

<img width="348" alt="Screen Shot 2024-06-02 at 7 20 35 PM" src="https://github.com/ubc-cpsc455-2024S/project-29_abd/assets/83879383/a954b1be-8d61-4f89-9fb6-13d713f8267e">
