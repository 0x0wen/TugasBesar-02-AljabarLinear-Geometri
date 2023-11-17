import cv2
import warna
import time

def mainColor(minim,img,arrayobject):
    gambar_resized  = cv2.resize(img,(0,0),fx = 0.5 , fy = 0.5)
    H1,S1,V1 = warna.histHSV(gambar_resized)

    sim = []
    arrayImgdanSim = []
    arrayakhir = []
    
    mulai = time.time()
    for row in arrayobject:
        H2,S2,V2 = row['hist_h'],row['hist_s'],row['hist_v']
        similarity = (warna.similarity(H1,H2) + warna.similarity(S1,S2) + warna.similarity(V1,V2)) / 3 * 100
        if similarity >= minim:
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
        "arrayImgdanSim" : arrayImgdanSim,
        "waktuOperasi" : selisih 
    })
    
    return arrayakhir