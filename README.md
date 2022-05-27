# CenterPoint: Set up your next meeting with ease
This is our project submission for the Google Startups Hackathon in Singapore. 
Our project aims to help users find the closest location for meetups for people located in different places.

## Setup Procedure
Our website is currently hosted on http://www.lohseng.com/centerpoint. If you would like to try our application, just click on the link! </br>

If you would like to reproduce our application locally and make any edits, please do the following steps: 
#### Note: Please input your own Google API key. For documentation on how to get your own Google API key: https://developers.google.com/maps/documentation/javascript/get-api-key
1. Make a virtual environment for the project, either conda or venv, and then run `pip install -r requirements.txt` to install all packages needed.
2. `cd frontend/` and then `npm install` to download all dependencies for the frontend.
3. While in the `frontend` dir, run `npm run dev` to compile all frontend scripts.
4. In another terminal window, `cd flask_app` and then `python3 app.py` to start the Flask server.
</br> 
After that, the URL should be listed in the terminal and clicking on the URL should lead you to the working application.

## Tools Used
APIs:
- Google Places API - Mainly used to get location coordinates and attributes of user-chosen locations and generate final chosen location by our application
- Google Directions API - Used to list directions to suggested locations from user-chosen starting locations

## Languages Used
Python - Backend algorithm to obtain locations, calculate best meetup location


## Packages Used
Algorithm:
- requests
- pandas
- json
- 


## Collaborators:
1. Candy Salome Lim
2. Chew Loh Seng
3. Claudia Beth Ong
4. Darryl Tan Kah Heng
5. Teo Jia Sheng
