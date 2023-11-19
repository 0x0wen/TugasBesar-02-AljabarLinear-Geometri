import cv2
from .colorProcessor import histHSV,similarity
import time
import numpy as np

async def colorCBIR(minim,img,arrayobject):
    content = await img.read()
    gambar = cv2.imdecode(np.frombuffer(content, np.uint8), cv2.IMREAD_COLOR)
    gambar_resized  = cv2.resize(gambar,(0,0),fx = 0.5 , fy = 0.5)
    H1,S1,V1 = histHSV(gambar_resized)
    arrayImgdanSim = []
    mulai = time.time()
    for data in arrayobject:
        H2 = data['hist_h']
        S2 = data['hist_s']
        V2 = data['hist_v']
        threshold = int(minim)
        similarityValue = (similarity(H1,H2) + similarity(S1,S2) + similarity(V1,V2)) / 3 * 100
        if similarityValue >= threshold:
            if (not arrayImgdanSim):
                arrayImgdanSim.append({
                    "image" : data['image'],
                    "persentasePersamaan" : similarityValue
                })
            else:
                indeks = 0
                while indeks < len(arrayImgdanSim) and arrayImgdanSim[indeks]['persentasePersamaan'] > similarityValue:
                    indeks += 1
                masuk = ({
                    "image" : data['image'],
                    "persentasePersamaan" : similarityValue
                })
                arrayImgdanSim.insert(indeks, masuk)
    selesai = time.time()
    selisih = selesai - mulai
    
    hasil = {
        "result" : arrayImgdanSim,
        "time" : selisih 
    }
    
    return hasil