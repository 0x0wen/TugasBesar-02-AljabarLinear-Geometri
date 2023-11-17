import cv2
import tekstur
import time
import base64
import pandas as pd

def mainTekstur(persamaan, arrayObjects, image):
    mulai = time.time()
    image_resize = cv2.resize(image, (0,0), fx = 0.5, fy = 0.5)
    reference_features = tekstur.calculate_texture_features(image_resize)
    arrayakhir = []
    arrayImgdanSim = []
    for row in arrayObjects.iterrows():
        compared_features = row['contrast'],row['entropy'],row['homogeneity']
        similarity = tekstur.cosine_similarity(reference_features, compared_features) * 100
        if similarity >= persamaan:
            if (not arrayImgdanSim):
                arrayImgdanSim.append({
                    "image" : row['image'],
                    "persentasePersamaan" : similarity
                })
            else:
                indeks = 0
                while indeks < len(arrayImgdanSim) and (arrayImgdanSim[indeks])['persentaseSim'] > similarity:
                    indeks += 1
                masuk = ({
                    "image" : row['image'],
                    "persentasePersamaan" : similarity
                })
                arrayImgdanSim.insert(indeks, masuk)

    selesai = time.time()
    selisih = selesai - mulai
    arrayakhir.append({
        "arrayImgAndSim": arrayImgdanSim,
        "waktuOperasi": selisih,
    })

    return arrayakhir



'''with open("hasil.csv", 'w', newline="") as csv_file:
    fieldnames =['arrayImgAndSmlrt', 'waktuOperasi']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    writer.writeheader()
    for row in arrayakhir:
        writer.writerow(row)
'''