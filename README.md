# CenterPoint: Set up your next meeting with ease
This is our project submission for the Google Startups Hackathon in Singapore. 
Our project aims to help users find the closest central location for meetups for people located in different places.

## Setup Procedure
Our website is currently hosted on http://www.lohseng.com/centerpoint. If you would like to try our application, just click on the link! </br>

If you would like to reproduce our application locally and make any edits, please do the following steps: 
#### Note: Please input your own Google API key. For documentation on how to get your own Google API key: https://developers.google.com/maps/documentation/javascript/get-api-key
1. Clone the repository or download the project code to your preferred disk location.
2. Open two terminal windows and change the directory to the appropriate disk location.
3. Make a virtual environment for the project through conda or venv. 
4. To install all packages needed, execute the command:
```
$ pip install -r requirements.txt
```
6. In one terminal window, change the directory to the ``frontend`` folder and download all the dependencies required by executing these commands:
```
$ cd frontend
$ npm install
```
7. To compile all frontend scripts and run the , execute this command:
```
$ npm run dev
```
8. In another terminal window, exectue these commands to start the Flask Server:
```
$ cd flask_app
$ python3 app.py
```
9. If either server could not be connected, please disable your network firewall and/or enable port 3000 and 8000 for both inbound and outbound traffic.
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
