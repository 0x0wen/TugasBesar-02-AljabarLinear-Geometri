import cv2
import os
import tekstur
import time

# Membaca gambar dari file
path1 = "C:\\Users\\Axel Santadi\\Documents\\Cool_Yeah\\Tingkat_2\\Semester_3\\AlGeo\\Tubes2\\TugasBesar-Algeo-2\\0.jpg"
gambar1 = cv2.imread(path1)
totcon1,tothom1,totent1 = tekstur.CBIR_Tekstur(gambar1)

path = "C:\\Users\\Axel Santadi\\Documents\\Cool_Yeah\\Tingkat_2\\Semester_3\\AlGeo\\Tubes2\\TugasBesar-Algeo-2\\dataset"
daftar_file = os.listdir(path)

#Mengakses fitur warna dari setiap piksel
i = 2
for nama_file in daftar_file:
    start = time.time()
    gambar2 = cv2.imread(os.path.join(path, nama_file))
    totcon2,tothom2,totent2 = tekstur.CBIR_Tekstur(gambar2)

    sim = tekstur.similarity(totcon1,tothom1, totent1, totcon2, tothom2, totent2) * 100

    print(f"Tingkat kecocokan gambar {1} & {i} = {sim}") 
    end = time.time()
    selis = end - start
    print("waktu = ",selis)
    i += 1
