from flask import Flask, request, send_file
from flask_cors import CORS
import os
from process import videoToDoc

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# def videoToDoc(video_path, language):
#     """
#     Function to process the video and generate a sample.docx file.
#     This is a placeholder. Replace with actual processing logic.
#     """
#     from docx import Document  # Ensure you have python-docx installed

#     doc = Document()
#     doc.add_heading("Video Processing Output", level=1)
#     doc.add_paragraph(f"Processed Video: {video_path}")
#     doc.add_paragraph(f"Selected Language: {language}")

#     output_doc_path = os.path.join("./processed", "sample.docx")
#     doc.save(output_doc_path)

#     return output_doc_path  # Returning the processed document path

@app.route('/process', methods=['POST'])
def process_video():

    language = request.form.get("language")
    video_file = request.files.get("video")

    if not language:
        return {"error": "Language not provided"}, 400
    if not video_file:
        return {"error": "No video file uploaded"}, 400

    # Save the uploaded file
    video_path = os.path.join("./upload", video_file.filename)
    video_file.save(video_path)

    print(f"Received video: {video_file.filename} for processing in {language}")

    # Process video and generate doc file
    docx_file_path = videoToDoc(video_path, language)

    # Return sample.docx for download
    return send_file(docx_file_path, as_attachment=True)

@app.route('/')
def home():
    return "Flask is ready ...."

if __name__ == '__main__':
    app.run(debug=True)
