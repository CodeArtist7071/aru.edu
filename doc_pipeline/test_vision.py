import os
from google.cloud import vision
from config import GOOGLE_APPLICATION_CREDENTIALS

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = GOOGLE_APPLICATION_CREDENTIALS
client = vision.ImageAnnotatorClient()

with open("test.jpg", "rb") as img_file:
    content = img_file.read()

image = vision.Image(content=content)
response = client.document_text_detection(image=image)

for page in response.full_text_annotation.pages:
    for block in page.blocks:
        print(f"Block type: {block.block_type}, Text len: {len(block.paragraphs)}")
