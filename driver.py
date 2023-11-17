import base64
import warna
import numpy as np
import cv2

def ubahArrayGambarJadiHistHSV(arr):
    arrayobjects = []
    for file in arr:
        nparr = np.frombuffer(file, np.uint8)
        gambar = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        image_resize = cv2.resize(gambar, (0,0), fx = 0.5, fy = 0.5)
        H,S,V = warna.histHSV(image_resize)
        
        _, buffer = cv2.imencode('jpg', gambar)
        img_encode = base64.b64encode(buffer.tobytes()).decode("utf-8")
        
        arrayobjects.append({
            "image": img_encode,
            "hist_h": H,
            "hist_s": S,
            "hist_v": V,
        })
    return arrayobjects