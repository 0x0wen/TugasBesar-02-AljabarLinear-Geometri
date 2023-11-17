import tekstur
import os
import cv2
import csv
import numpy as np
import base64

def ubahArrayGambarMenjadiListCooc(arrayFile):
    arrayobjects = []
    for fileImage in arrayFile:
        nparr = np.frombuffer(fileImage, np.uint8)
        gambar = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        image_resize = cv2.resize(gambar, (0,0), fx = 0.5, fy = 0.5)
        contrast, entropy, homogeneity = tekstur.calculate_texture_features(image_resize)
        _, buffer = cv2.imencode('.jpg', gambar)
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