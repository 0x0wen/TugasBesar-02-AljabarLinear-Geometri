import base64
import test
import numpy as np
import cv2

def ubahArrayGambarJadiHistHSV(file_contents: bytes):
    
    nparr = np.frombuffer(file_contents, np.uint8)
    ArrayGambar = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    arrayobjects = []
    for image in ArrayGambar:
        image_resize = cv2.resize(image, (0,0), fx = 0.5, fy = 0.5)
        H,S,V = test.histHSV(image_resize)
        
        _, buffer = cv2.imencode('.jpg', image)
        img_encode = base64.b64encode(buffer.tobytes()).decode("utf-8")
        
        arrayobjects.append({
            "image": img_encode,
            "hist_h": H,
            "hist_s": S,
            "hist_v": V,
        })
    
    return arrayobjects