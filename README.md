# Wanderlog - Travel Diary 

## Conception
**Problem:** People love traveling and creating memories of these new exotic places. However as time goes bad, these memories fade and soon, you will forget about the crazy stories that you had traveling. The only mementos are souvenirs or a few photographs.

**Solution:** “Wanderlog - Travel Diary” is an online web application that will keep a record of your travels. It will include user login authentication and sign up, even comes with an avatar profile pic. A user is able to list all their past and upcoming trips. During one of their trips, the user is able to write a post or upload pictures of what they did or experience that day. The post will include a section where the user can rate how great of a day it was. Through an all post summary page, the user is able to see and reminisce about their past trips. It comes with a search and filtering capability. Users are also able to share and collaborate their trip posts with other users.

**Technology** This is a full stack application, with React in the front-end and Flask/Python in the back-end. Cloudinary, a cloud-based media management services is also used to incorporate uploaded images into the application.

## Models Relationship
There are a total of 5 models in the project (user, trip, attendance, offer and post). The relationships between the models are fairly simple and complex at the same time. 

![model](./server/travel%20diary%202%20(1).png)

There are a total of 3 many-to-many relationships between user and trip with a different association objects. Each of these relationships are independent from one another. For example, a user's attendance to a trip does not necessarily mean the user will write a post about that trip, nor does it indicate that an offer/invitation to collaborate will be made for the trip.

## Get Started
Install the require packages (client-side):
```
cd client
npm install
```
Install the require packages (server-side):
```
cd server
pipenv install
```

To run the react server: `npm run dev` 
It will be running on the default port 5173.

Check to see if you are in virtual environment. If not, enter the virtual environment by `pipenv shell`. To run the backend server `python app.py` which will be running on port 5555.

To prepopulate the database with seed data, run `python seed.py` in the server folder.

## Future Plans
Currently, this project is not deployment ready as I feel like there are still many improvements to work on. I want to organize my code a little better, see if there any ways to reduce code repetition and work on styling. 

Another future plan I had was to have a map, that will indicate where the user has already travel too, possibly through the use of geocoding/google maps api. 


