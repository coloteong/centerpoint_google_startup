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
7. Please enable ``port: 3000`` and ``port: 8000`` for both inbound and outbound traffic in your network firewall.
</br> 

## Run the Project
1. Open two terminal windows and change the directory to the appropriate disk location.
2. In one terminal window, change the directory to the ``frontend`` folder and compile all frontend scripts, by executing these commands:
```
$ cd frontend
$ npm run dev
```
3. In another terminal window, execute these commands to start the Flask Server:
```
$ cd flask_app
$ python3 app.py
```
4. Copy the URL generated by the npm into a web browser in your machine, the application should be working. Some examples of the URL:
```
http://localhost:3000
http://127.0.0.1:3000
http://192.168.1.2:3000
```

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
- flask
- 


## Collaborators:
1. Candy Salome Lim
2. Chew Loh Seng
3. Claudia Beth Ong
4. Darryl Tan Kah Heng
5. Teo Jia Sheng
