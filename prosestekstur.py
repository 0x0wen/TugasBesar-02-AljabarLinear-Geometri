import tekstur
import os
import cv2
import csv
import numpy as np
import base64

def ubahArrayGambarMenjadiListCooc(file_contents: bytes):
    nparr = np.frombuffer(file_contents, np.uint8)
    ArrayGambar = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    arrayobjects = []
    for image in ArrayGambar:
        image_resize = cv2.resize(image, (0,0), fx = 0.5, fy = 0.5)
        contrast, entropy, homogeneity = tekstur.calculate_texture_features(image_resize)
        _, buffer = cv2.imencode('.jpg', image)
        img_base64 = base64.b64encode(buffer).decode("utf-8")
        arrayobjects.append({
            "image": img_base64,
            "contrast": contrast,
            "entropy": entropy,
            "homogeneity": homogeneity,
        })

    return arrayobjects

def buatFile(arrayobjects):
    with open("objects.csv", 'w', newline="") as csv_file:
        fieldnames =['image', 'contrast', 'entropy', 'homogeneity']
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        writer.writeheader()
        for row in arrayobjects:
            writer.writerow(row)
    
path = "C:\\Users\\Axel Santadi\\Documents\\Cool_Yeah\\Tingkat_2\\Semester_3\\AlGeo\\Tubes2\\TugasBesar-Algeo-2\\dataset"
daftar_file = os.listdir(path)

retrieved_objects = ubahArrayGambarMenjadiListCooc(path)
buatFile(retrieved_objects)