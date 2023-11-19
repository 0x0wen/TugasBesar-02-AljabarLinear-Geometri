import base64
from colorProcessor import histHSV
import numpy as np
import cv2

async def datasetColorFeatureExtractor(arr):
    arrayobjects = []
    for i,file in enumerate(arr):
        content = await file.read()
        gambar = cv2.imdecode(np.frombuffer(content, np.uint8), cv2.IMREAD_COLOR)
        print("yesssssss")
        image_resize = cv2.resize(gambar, (0,0), fx = 0.5, fy = 0.5)
        H,S,V = histHSV(image_resize)
        _, buffer = cv2.imencode('.JPEG', gambar)
        img_encode = base64.b64encode(buffer.tobytes()).decode("utf-8")
        
        arrayobjects.append({
            "image": img_encode,
            "hist_h": H,
            "hist_s": S,
            "hist_v": V,
        })
    return arrayobjects