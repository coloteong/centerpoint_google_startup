# import required packages
import requests
import json
import pandas as pd
# API key: AIzaSyDPRi8jxCGzccPR34SkCjnEOh8F6ZKK_q0

# function to get pure json data from url
def get_response_from_API(url):
    payload={}
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    print(response.text)
    return(response.text)

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
    for point in location_list:
        total_x += point[0]
        total_y += point[1]
        count += 1
    # return a tuple of (x,y) coordinates 
    return (total_x/count, total_y/count)

# function to use google API to get possible locations in json dictionary format
def find_candidate_google_locations(central_point, purpose):
    # first, make the url string from the given central_point
    # TODO: make radius a variable to include in for loop later
    radius = 50
    no_of_locations = 0
    while radius < 1000 and no_of_locations < 5:
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + str(central_point[0]) + "%2C" + str(central_point[1]) + "&radius=" + str(radius) + "&type=" + str(purpose) + "&key=AIzaSyDPRi8jxCGzccPR34SkCjnEOh8F6ZKK_q0"
        print(url)
        payload={}
        headers = {}
        response = requests.request("GET", url, headers=headers, data=payload)
        candidate_locations = response.text
        formatted_candidate_locations = json.loads(candidate_locations)
        result_df = pd.DataFrame.from_dict(formatted_candidate_locations['results'])
        no_of_locations = result_df.shape[0]
        print("no of locations =", no_of_locations)
        radius += 50
    return formatted_candidate_locations

def determine_final_google_location(candidate_location_dict):
    # clean the dictionary to get a nice list of all locations
    # dataframe includes name, rating, operating hrs, address, image
    result_df = pd.DataFrame.from_dict(candidate_location_dict['results'])
    dataframe_locations = result_df[['name', 'rating', 'opening_hours', 'vicinity', 'geometry', 'photos']]
    locations_sorted_rating = dataframe_locations.sort_values(by = 'rating', ascending = False)
    locations_sorted_rating = locations_sorted_rating.head(5)
    json_locations = locations_sorted_rating.to_json(orient = "index")
    return json_locations  

