# Group 29 - SoloExplorer

- Your title can change over time.

# Project Description:

SoloExplorer is a travel site specifically designed for solo travelers, particularly those in their 20s and 30s, seeking a streamlined and engaging way to plan their individual adventures. The platform supports users in creating, managing, and sharing detailed travel itineraries for multi-country, long-term trips. SoloExplorer will store user profiles, trip itineraries, travel journals, reviews, and multimedia content such as photos and videos. Users will be able to create and manage detailed itineraries, document and share their travel experiences, access personalized travel recommendations, and review places and activities. Additional functionalities that can be added based on time constraints include integrating social media sharing options, providing real-time travel alerts, offering AI-driven travel recommendations, and developing a community forum for solo travelers.

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

#### User Authentication and Profile Management:

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

## Minimal Requirement 2: User Authentication and Profile Management

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

### Develop User Profile Page:

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

{Add your stuff here}

## Team Members

- Person 1: Daniel Shmidov - 6th year BUCS student avid Backcountry explorer
- Person 2: Bhag Cheema - [TODO]
- Person 3: Andrew Joji - [TODO]

## Images

{You should use this area to add a screenshot of your app or website }

<img src ="images/test.png" width="100px">

## References

{Add your stuff here}
