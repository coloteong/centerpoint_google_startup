from flask import Flask, request, flash, send_file, render_template
from werkzeug.utils import secure_filename
from datetime import datetime
import os

app = Flask(__name__)

uploadBackendFolder = './uploads/backend/'
uploadFrontendFolder = './uploads/frontend/'
ALLOWED_EXTENSIONS = {'json'}


@app.route('/')
def start():
	return "test"


@app.route('/tired')
def tired():
	return "test2"


def allowed_file(filename):
	return '.' in filename and \
		filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def uploadHandler (jsonFile, mode):
	#Check if file exist
	if jsonFile.filename == '':
		flash('No file uploaded')
	#If the uploaded file is in json format
	if jsonFile and allowed_file(jsonFile.filename):
		filename = secure_filename(jsonFile.filename)
		if (mode == 'toBackend'):
			path = uploadBackendFolder + filename
		elif (mode == 'toFrontend'):
			path = uploadFrontendFolder + filename
		jsonFile.save(os.path.join(path))
	return filename

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
	result = ''
	result = uploadToBackend()
	str = renderResult(result)
	return render_template("index.html", prompt = str)
def uploadFrontendHTML():
	result = ''
	result = uploadToFrontend()
	str = renderResult(result)
	return render_template("index.html", prompt = str)


@app.route('/upload/backend', methods = ["POST"])
def uploadToBackend():
	if 'file' not in request.files:
		flash('No file part')
	jsonFile = request.files['file']
	filename = uploadHandler(jsonFile, 'toBackend')

@app.route('/upload/frontend', methods = ["POST"])
def uploadToFrontend():
	if 'file' not in request.files:
		flash('No file part')
	jsonFile = request.files['file']
	filename = uploadHandler(jsonFile, 'toFrontend')

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
