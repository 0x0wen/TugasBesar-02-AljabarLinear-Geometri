import tekstur
import os
import cv2
import csv
import time

def ubahArrayGambarMenjadiListCooc(path):
    arrayobjects = []
    ArrayGambar = os.listdir(path)
    i = 1
    mulai = time.time()
    for image in ArrayGambar:
        compared_image = cv2.imread(os.path.join(path, image))
        image_resize = cv2.resize(compared_image, (0,0), fx = 0.5, fy = 0.5)
        contrast, entropy, homogeneity = tekstur.calculate_texture_features(image_resize)
        arrayobjects.append({
            "image": image_resize,
            "contrast": contrast,
            "entropy": entropy,
            "homogeneity": homogeneity,
        })
        print(f'gambar {i} sudah jadi')
        i+=1
    selesai = time.time()
    selisih = selesai - mulai
    print(f'waktu :{selisih}')
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