from flask import Flask, request, flash, send_file, render_template, Response
from werkzeug.utils import secure_filename
from datetime import datetime
import json
import os
from flask_cors import CORS

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
	return{"x": 4}


@app.route('/test' , methods = ["GET","POST"])
def test():
    	
	data = request.get_json()
	# ADD ALGO HERE :-)
	for location in data:
		#Each location is a dictionary
		#print(type(location))
		for key,value in location.items():
			#print('these are the keys:' + key)
			pass
	
	# Returns the request back to client
	# Flask cannot return lists; converts the list into a JSON string
	return Response(json.dumps(data), mimetype='application/json')



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

