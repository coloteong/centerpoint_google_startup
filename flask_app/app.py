from flask import Flask, request, flash, send_file, render_template, Response, jsonify
from werkzeug.utils import secure_filename
from datetime import datetime
import json
import os
from flask_cors import CORS

#algorithm packages
import requests
import json
import pandas as pd
import geopy.distance

app = Flask(__name__)
CORS(app)

uploadBackendFolder = './uploads/backend/'
uploadFrontendFolder = './uploads/frontend/'
ALLOWED_EXTENSIONS = {'json'}
SECRET_KEY = 'NUdOUiBTdGFuZGFsb25lIEFjY2Vzcw=='

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = SECRET_KEY

#We should remove all these routing before submission of code


@app.route('/testing' , methods = ["GET","POST"])
def test2():
	data = request.get_json()
	return Response(json.dumps(data), mimetype='application/json')
	return{"x": 4}


@app.route('/test' , methods = ["GET","POST"])
def test():
	
	# ADD ALGO HERE :-)
	def check_opening_hours(candidate_location_dict):
		candidate_location_dict['opening_hours'] = candidate_location_dict['opening_hours'].astype(str)
		candidate_location_dict = candidate_location_dict[candidate_location_dict["opening_hours"].str.contains('True') == True]
		return candidate_location_dict

	# function to convert address to (lat, long) format
	def get_coordinates_from_address(address_string):
		formatted_dict = json.loads(address_string)
		# this part so hardcoded .. TODO: try to fix if possible
		formatted_dict = formatted_dict['candidates'][0]
		formatted_dict = formatted_dict['geometry']
		location_coordinates = formatted_dict['location']
		latitude = location_coordinates['lat']
		longitude = location_coordinates['lng']
		return (latitude,longitude)

	# function to get raw (x,y) value of initial centre point
	def find_central_point(location_list):
		# location_list is a list of tuples (x,y) of coordinates
		total_x = 0
		total_y = 0
		count = 0
		for point in location_list[0]:
			total_x += point[0]
			total_y += point[1]
			count += 1
		# return a tuple of (x,y) coordinates 
		return (total_x/count, total_y/count)

	# function to use google API to get possible locations in json dictionary format
	def find_candidate_google_locations(central_point, purpose):
		# first, make the url string from the given central_point
		radius = 50
		no_of_locations = 0
		# list of search phrases for each purpose
		searches = purpose
		# if purpose == "Activities":
		# 	searches = ["amusement_park",
		# 				"aquarium",
		# 				"art_gallery",
		# 				"bowling_alley",
		# 				"cafe",
		# 				"movie_theater",
		# 				"museum",
		# 				"night_club",
		# 				"tourist_attraction"]	
		# elif purpose == "Food":
		# 	searches = ["cafe", "restaurant"]
		# elif purpose == "Hotels & Staycations":
		# 	searches =  ["lodging"]
		# else:
		# 	searches = ["gym", "park"]
		while radius < 1000 and no_of_locations < 5:
			# take into account the purpose of the meetup
			location_data = []
			for i in searches:
				url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + str(central_point[0]) + "%2C" + str(central_point[1]) + "&radius=" + str(radius) + "&type=" + str(i) + "&key=AIzaSyDPRi8jxCGzccPR34SkCjnEOh8F6ZKK_q0"
				print(url)
				payload={}
				headers = {}
				response = requests.request("GET", url, headers=headers, data=payload)
				candidate_locations = response.text
				formatted_candidate_locations = json.loads(candidate_locations)
				print("Formatted location", formatted_candidate_locations)
				location_data.append(formatted_candidate_locations)
			
			final_loc_df = pd.DataFrame.from_dict(location_data[0])
			location_data.pop(0)
			for i in location_data:
				current_df = pd.DataFrame.from_dict(i)
				print("current df:", current_df)
				final_loc_df.append(current_df)

			# for reference: https://stackoverflow.com/questions/13784192/creating-an-empty-pandas-dataframe-then-filling-it
			# result_df = pd.DataFrame.from_dict(formatted_candidate_locations['results'])
			# final_loc_df = pd.DataFrame(location_data)
			# add checking for whether location is open
			print("Result df: ", list(final_loc_df))
			# CLAUDIA LOOK AT THIS!!! OI!!!!! teehee
			# result_df = check_opening_hours(result_df)
			no_of_locations = final_loc_df.shape[0]
			print("no of locations =", no_of_locations)
			radius += 50
		return final_loc_df

    # function to add distance from central column to dataframe with all locations
    # returns the same dataframe with extra column
	def get_distances_from_central(locations_sorted_rating, central_point):
		geometry_list = locations_sorted_rating['geometry'].tolist()
		coordinate_list = []
		for i in range(len(geometry_list)):
			coordinates = geometry_list[i]['location']
			latitude = coordinates['lat']
			longitude = coordinates['lng']
			coordinate_list.append((latitude, longitude))
		distance_list = []
		for item in coordinate_list:
			distance_list.append(distance_between_two_points(item, central_point))
		locations_sorted_rating['Distance from centre'] = distance_list
		return locations_sorted_rating

	# function to parse multiple coordinates from a json containing multiple locations
	# returns list of tuples of (lang, long) type
	def get_multiple_coordinates_from_json(data):
		#f = open(json_file_path)
		#trial = json.load(f)
		coordinate_list = []
		location_data = data['locations']
		purpose = data['purpose']
		for i in range(len(location_data)):
			print(location_data[i]['geometry']['location'])
			coordinates = location_data[i]['geometry']['location']
			latitude = coordinates['lat']
			longitude = coordinates['lng']
			coordinate_list.append((latitude, longitude))
		return coordinate_list, purpose

	def distance_between_two_points(loc1, loc2):
		return geopy.distance.geodesic(loc1, loc2).km

	def convert_dict_to_json(input_dict):
		json_locations = input_dict.to_json(orient = "records")
		return json_locations

	# function to rank locations, get top 5, and return the locations in dict format
	# candidate_location_dict is a dictionary from a json file
	def determine_final_google_location(candidate_location_dict, central_point):
		# clean the dictionary to get a nice list of all locations
		# dataframe includes name, rating, operating hrs, address, image
		result_df = pd.DataFrame.from_dict(candidate_location_dict)
		print(result_df)
		dataframe_locations = result_df[['name', 'rating', 'opening_hours', 'vicinity', 'geometry', 'photos']]
		locations_sorted_rating = dataframe_locations.sort_values(by = 'rating', ascending = False)
		locations_sorted_rating = locations_sorted_rating.head(5)
		locations_sorted_rating = get_distances_from_central(locations_sorted_rating, central_point)
		print(locations_sorted_rating)
		json_formatted_locations = convert_dict_to_json(locations_sorted_rating)
		return json_formatted_locations


	#for location in data:
		#Each location is a dictionary
		#print(type(location))
		#for key,value in location.items():
			#print('these are the keys:' + key)
			#pass
	
	# Returns the request back to client

	# Flask cannot return lists; converts the list into a JSON string

	data = request.get_json()
	output_coord = get_multiple_coordinates_from_json(data)
	print(output_coord)
	init_center_point = find_central_point(output_coord)
	print(init_center_point)
	init_goog_locs = find_candidate_google_locations(init_center_point, 'restaurant')
	print(init_goog_locs)
	final_goog_locs = determine_final_google_location (init_goog_locs, init_center_point)
	print(final_goog_locs)

	#json_data = convert_dict_to_json(final_goog_locs)
	#print(json_data)

	return Response(json.dumps(final_goog_locs), mimetype='application/json')
	#return json_data


#Keep the codes below
def allowed_file(filename):
	return '.' in filename and \
		filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def uploadHandler (jsonFile, mode):
	#Check if file exist
	if jsonFile.filename == '':
		flash('No file uploaded')
		return ''
	#If the uploaded file is in json format
	if jsonFile and allowed_file(jsonFile.filename):
		filename = secure_filename(jsonFile.filename)
		if (mode == 'toBackend'):
			path = uploadBackendFolder + filename
		elif (mode == 'toFrontend'):
			path = uploadFrontendFolder + filename
		jsonFile.save(os.path.join(path))
		return filename
	else:
		return ''

def downloadHandler (filename, mode):
	if(mode == 'toBackend'):
		path = uploadBackendFolder + filename
	elif(mode == 'toFrontend'):
		path = uploadFrontendFolder + filename
	return send_file(path, as_attachment = True)

def renderResult(result):
	if (result == ''):
		str = 'Upload failed'
	else:
		str = 'Upload completed'
	flash (str)
	return str

@app.route('/upload', methods = ["GET"])
def uploadhome():
	return render_template("index.html")

@app.route('/upload', methods = ["POST"])
def uploadBackendHTML():
	result = ""
	result = uploadToBackend()
	str = renderResult(result)
	#Note: Current code display result on /upload/backend, not here
	return render_template("index.html", prompt = str)
def uploadFrontendHTML():
	result = ""
	result = uploadToFrontend()
	str = renderResult(result)
	#Note: Current code display result on /upload/frontend, not here
	return render_template("index.html", prompt = str)

@app.route('/upload/backend', methods = ["POST"])
def uploadToBackend():
	if 'file' not in request.files:
		flash('No file part')
		return
	jsonFile = request.files['file']
	filename = uploadHandler(jsonFile, 'toBackend')
	if (filename == ''):
		str = 'ERROR'
	else:
		str = 'SUCCESS'
	return str

@app.route('/upload/frontend', methods = ["POST"])
def uploadToFrontend():
	if 'file' not in request.files:
		flash('No file part')
		return
	jsonFile = request.files['file']
	filename = uploadHandler(jsonFile, 'toFrontend')
	if(filename == ''):
		str = 'ERROR'
	else:
		str = 'SUCCESS'
	return str

@app.route('/download/backend', methods = ["GET"])
def downloadFromBackend():
	#Note: Please replace 'test1.json' with relevant filename
	filename = 'test1.json'
	file = downloadHandler(filename, 'toBackend')
	return file

@app.route('/download/frontend', methods = ["GET"])
def downloadFromFrontend():
	#Note: Please replace 'test2.json' with relevant filename
	filename = 'test2.json'
	file = downloadHandler(filename, 'toFrontend')
	return file


if(__name__ == "__main__"):
	app.run(debug = True, host = '0.0.0.0', port = 8000)

