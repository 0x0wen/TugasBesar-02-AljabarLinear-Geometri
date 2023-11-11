import tekstur
import os
import cv2
import pickle

def ubahArrayGambarMenjadiListCooc(path):
    global_objects = None
    arrayobjects = []
    ArrayGambar = os.listdir(path)
    i = 1
    for image in ArrayGambar:
        compared_image = cv2.imread(os.path.join(path, image))
        image_resize = cv2.resize(compared_image, (0,0), fx = 0.5, fy = 0.5)
        co_occurrence_matrix = tekstur.coocMatrix(image_resize)
        arrayobjects.append({
            "image": compared_image,
            "co_occurrence_matrix": co_occurrence_matrix
        })
        print(f'gambar {i} sudah jadi')
        i+=1
    global_objects = arrayobjects

    with open("objects.pkl", "wb") as file:
        pickle.dump(global_objects, file)
    return arrayobjects

path = "C:\\Users\\Axel Santadi\\Documents\\Cool_Yeah\\Tingkat_2\\Semester_3\\AlGeo\\Tubes2\\TugasBesar-Algeo-2\\dataset"
daftar_file = os.listdir(path)

retrieved_objects = tekstur.ubahArrayGambarMenjadiListCooc(path)