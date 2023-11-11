import cv2
import os
import tekstur
import time

path1 = "C:\\Users\\Axel Santadi\\Documents\\Cool_Yeah\\Tingkat_2\\Semester_3\\AlGeo\\Tubes2\\TugasBesar-Algeo-2\\0.jpg"
image = cv2.imread(path1)
image = cv2.resize(image, (0,0), fx = 0.5, fy = 0.5)
reference_image = tekstur.grayscale_image(image)
reference_features = tekstur.calculate_texture_features(reference_image)

# Loop untuk membandingkan dengan ribuan gambar lainnya
path = "C:\\Users\\Axel Santadi\\Documents\\Cool_Yeah\\Tingkat_2\\Semester_3\\AlGeo\\Tubes2\\TugasBesar-Algeo-2\\dataset"
daftar_file = os.listdir(path)
i = 2
mulai = time.time()
for nama_file in daftar_file:
    start = time.time()
    compared_image = cv2.imread(os.path.join(path, nama_file))
    compared_image = cv2.resize(compared_image, (0,0), fx = 0.5, fy = 0.5)
    compared_image = tekstur.grayscale_image(compared_image)
    compared_features = tekstur.calculate_texture_features(compared_image)

    similarity = tekstur.cosine_similarity(reference_features, compared_features)
    end = time.time()
    selis = end - start
    print(f'Similarity with image_{i}.jpg: {similarity:.4f}')
    print("waktu = ",selis)
    i += 1

selesai = time.time()
selisih = selesai - mulai
print("total waktu adalah = ", selisih)