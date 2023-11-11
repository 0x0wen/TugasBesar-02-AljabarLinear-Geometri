import cv2
import os
import tekstur
import time
from skimage.feature import graycomatrix, graycoprops
import numpy as np

'''# Membaca gambar dari file
gambar1 = cv2.imread(path1)
totcon1,tothom1,totent1 = tekstur.CBIR_Tekstur(gambar1)


#Mengakses fitur warna dari setiap piksel
i = 2
    start = time.time()
    gambar2 = cv2.imread(os.path.join(path, nama_file))
    totcon2,tothom2,totent2 = tekstur.CBIR_Tekstur(gambar2)

    sim = tekstur.similarity(totcon1,tothom1, totent1, totcon2, tothom2, totent2)

    print(f"Tingkat kecocokan gambar {1} & {i} = {sim}") 
    end = time.time()
    selis = end - start
    print("waktu = ",selis)
    i += 1'''

path1 = "C:\\Users\\Axel Santadi\\Documents\\Cool_Yeah\\Tingkat_2\\Semester_3\\AlGeo\\Tubes2\\TugasBesar-Algeo-2\\0.jpg"
image = cv2.imread(path1)
reference_image = tekstur.grayscale_image(image)
reference_features = tekstur.calculate_texture_features(reference_image)

# Loop untuk membandingkan dengan ribuan gambar lainnya
path = "C:\\Users\\Axel Santadi\\Documents\\Cool_Yeah\\Tingkat_2\\Semester_3\\AlGeo\\Tubes2\\TugasBesar-Algeo-2\\dataset"
daftar_file = os.listdir(path)
i = 2
for nama_file in daftar_file:
    start = time.time()
    compared_image = cv2.imread(os.path.join(path, nama_file))
    compared_image = tekstur.grayscale_image(compared_image)
    compared_features = tekstur.calculate_texture_features(compared_image)

    similarity = tekstur.cosine_similarity(reference_features, compared_features)
    end = time.time()
    selis = end - start
    print(f'Similarity with image_{i}.jpg: {similarity:.4f}')
    print("waktu = ",selis)
    i += 1