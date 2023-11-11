import cv2
import os
import tekstur
import time
import pickle

mulai = time.time()
path1 = "C:\\Users\\Axel Santadi\\Documents\\Cool_Yeah\\Tingkat_2\\Semester_3\\AlGeo\\Tubes2\\TugasBesar-Algeo-2\\0.jpg"
image = cv2.imread(path1)
image_resize = cv2.resize(image, (0,0), fx = 0.25, fy = 0.25)
reference_image = tekstur.grayscale_image(image_resize)
reference_features = tekstur.calculate_texture_features(reference_image)
#persamaan = float(input("masukkan minimal persentase persamaan:"))

with open("objects.pkl", "rb") as file:
    loaded_data = pickle.load(file)

max = len(loaded_data)
for i in range(max):
    ambil = loaded_data[i]["co_occurrence_matrix"]
    compared_features = tekstur.cariKontrasDll(ambil)
    similarity = tekstur.cosine_similarity(reference_features, compared_features)
    print(f'Similarity with image_{i}.jpg: {similarity*100}')

selesai = time.time()
selisih = selesai - mulai
print("total waktu adalah = ", selisih)

'''# Loop untuk membandingkan dengan ribuan gambar lainnya
path = "C:\\Users\\Axel Santadi\\Documents\\Cool_Yeah\\Tingkat_2\\Semester_3\\AlGeo\\Tubes2\\TugasBesar-Algeo-2\\dataset"
daftar_file = os.listdir(path)
i = 2

for nama_file in daftar_file:
    start = time.time()
    compared_image = cv2.imread(os.path.join(path, nama_file))
    compared_image_rezise = cv2.resize(compared_image, (0,0), fx = 0.25, fy = 0.25)
    compared_image_tekstur = tekstur.grayscale_image(compared_image_rezise)
    compared_features = tekstur.calculate_texture_features(compared_image_tekstur)
    
    
    end = time.time()
    selis = end - start
    print("waktu = ",selis)
    i += 1

selesai = time.time()
selisih = selesai - mulai
print("total waktu adalah = ", selisih)'''