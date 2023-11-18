import base64
import warna
import numpy as np
import cv2
import io
from PIL import Image

def encode_image(image):
    # Konversi gambar OpenCV menjadi format yang dapat digunakan oleh Pillow
    image_pil = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    
    # Buat objek buffer
    buffer = io.BytesIO()
    
    # Simpan gambar dalam format JPEG ke buffer
    image_pil.save(buffer, format="JPEG")
    
    # Ambil data dari buffer
    img_encode = base64.b64encode(buffer).decode("utf-8")
    
    return img_encode

def ubahArrayGambarJadiHistHSV(arr):
    arrayobjects = []
    for file in arr:
        nparr = np.frombuffer(file, np.uint8)
        gambar = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        image_resize = cv2.resize(gambar, (0,0), fx = 0.5, fy = 0.5)
        H,S,V = warna.histHSV(image_resize)
        
        img_encode = encode_image(gambar)
        
        arrayobjects.append({
            "image": img_encode,
            "hist_h": H,
            "hist_s": S,
            "hist_v": V,
        })
    return arrayobjects