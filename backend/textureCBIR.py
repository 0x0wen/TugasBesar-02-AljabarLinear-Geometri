import cv2
from textureProcessor import cosine_similarity,calculate_texture_features
import time
import numpy as np

async def textureCBIR(threshold,image,dataset):
    content = await image.read()
    gambar = cv2.imdecode(np.frombuffer(content, np.uint8), cv2.IMREAD_COLOR)
    image_resize  = cv2.resize(gambar,(0,0),fx = 0.5 , fy = 0.5)
    imageFeatures = calculate_texture_features(image_resize)
    arrayakhir = [] 
    mulai = time.time()
    for entry in dataset:
        comparedFeatures = entry['contrast'],entry['entropy'],entry['homogenity']
        similarityValue = cosine_similarity(imageFeatures,comparedFeatures) * 100
        threshold = int(threshold)
        if similarityValue >= threshold:
            if (not arrayakhir):
                arrayakhir.append({
                    "image" : entry['image'],
                    "persentasePersamaan" : similarityValue
                })
                
            else:
                indeks = 0
                while indeks < len(arrayakhir) and arrayakhir[indeks]['persentasePersamaan'] > similarityValue:
                    indeks += 1
                masuk = ({
                    "image" : entry['image'],
                    "persentasePersamaan" : similarityValue
                })
                arrayakhir.insert(indeks, masuk)

    selesai = time.time()
    selisih = selesai - mulai
    hasil = {
        "result" : arrayakhir,
        "time" : selisih 
    }
    return hasil

    