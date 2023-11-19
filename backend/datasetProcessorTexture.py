from textureProcessor import calculate_texture_features
import os
import cv2
import asyncio
import numpy as np
import base64
async def datasetTextureFeatureExtractor(arr):
    arrayobjects = []
    for i, file in enumerate(arr):
        content = await asyncio.to_thread(file.read)
        if content:
            gambar = cv2.imdecode(np.frombuffer(content, np.uint8), cv2.IMREAD_COLOR)
            # rest of the code
        else:
            print("Empty buffer",content)
            continue
        image_resize = cv2.resize(gambar, (0,0), fx = 0.5, fy = 0.5)
        contrast, entropy, homogenity = calculate_texture_features(image_resize)
        _, buffer = cv2.imencode('.JPEG', gambar)
        img_encode = base64.b64encode(buffer.tobytes()).decode("utf-8")
        arrayobjects.append({
            "image": img_encode,
            "contrast": contrast,
            "entropy": entropy,
            "homogenity": homogenity,
        })
    return arrayobjects
