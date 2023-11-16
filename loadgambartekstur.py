import cv2
import tekstur
import time
import csv
import pandas as pd

data = pd.read_csv('objects.csv')

data['contrast'] = data['contrast']
data['entropy'] = data['entropy']
data['homogeneity'] = data['homogeneity']

persamaan = float(input("masukkan minimal persentase persamaan:"))
mulai = time.time()
path1 = "C:\\Users\\Axel Santadi\\Documents\\Cool_Yeah\\Tingkat_2\\Semester_3\\AlGeo\\Tubes2\\TugasBesar-Algeo-2\\0.jpg"
image = cv2.imread(path1)
image_resize = cv2.resize(image, (0,0), fx = 0.5, fy = 0.5)
reference_features = tekstur.calculate_texture_features(image_resize)

i = 1
arrayakhir = []
for index, row in data.iterrows():
    arrayImageDanSimilarity = []
    start = time.time()
    compared_features = row['contrast'],row['entropy'],row['homogeneity']
    similarity = tekstur.cosine_similarity(reference_features, compared_features) * 100
    done = time.time()
    waktu_perbandingan = float(done - start)
    print(f'Similarity with image_{i}.jpg: {similarity}')
    if similarity >= persamaan:
        arrayImageDanSimilarity.append({
            "image": row['image'],
            "persentasePersamaan": similarity,
        })

    arrayakhir.append({
        "arrayImgAndSmlrt": arrayImageDanSimilarity,
        "waktuOperasi": waktu_perbandingan,
    })
    i += 1

selesai = time.time()
selisih = selesai - mulai
print("total waktu adalah = ", selisih)

with open("hasil.csv", 'w', newline="") as csv_file:
    fieldnames =['arrayImgAndSmlrt', 'waktuOperasi']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    writer.writeheader()
    for row in arrayakhir:
        writer.writerow(row)