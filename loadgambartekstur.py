import cv2
import os
import tekstur

# Membaca gambar dari file
gambar1 = cv2.imread('hololive-suisei.jpg')
totcon1,tothom1,totent1 = tekstur.CBIR_Tekstur(gambar1)

path = "C:\\Users\\Axel Santadi\\Documents\\Cool_Yeah\\Tingkat_2\\Semester_3\\AlGeo\\Tubes2\\buat_tes"
daftar_file = os.listdir(path)

# Mengakses fitur warna dari setiap piksel
i = 2
for nama_file in daftar_file:
    gambar2 = cv2.imread(os.path.join(path, nama_file))
    totcon2,tothom2,totent2 = tekstur.CBIR_Tekstur(gambar2)

    sim1 = tekstur.similarity(totcon1,totcon2)
    sim2 = tekstur.similarity(tothom1,tothom2)
    sim3 = tekstur.similarity(totent1,totent2)
    
    cossim1 = ((sim1+sim2+sim3) / 3) * 100
    print(f"Tingkat kecocokan gambar {1} & {i} = {cossim1:.2f}%") 
    i += 1