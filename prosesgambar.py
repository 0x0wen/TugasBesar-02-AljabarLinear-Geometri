import cv2
import os
import warna

# minimum cocok
minim = int(input("masukkan minimal tingkat kecocokan (dalam %): "))

# Membaca gambar dari file
gambar1 = cv2.imread('ayam.jpeg')
list_h1,list_s1,list_v1 = warna.CBIR_Warna(gambar1)

path = "D:\\Kuliah\\Semester 3\\Algeo\\Tubes2\\Github\\TugasBesar-Algeo-2\\ayam"
daftar_file = os.listdir(path)

# Mengakses fitur warna dari setiap piksel
sim = []
for nama_file in daftar_file:
    gambar2 = cv2.imread(os.path.join(path, nama_file))
    list_h2,list_s2,list_v2 = warna.CBIR_Warna(gambar2)

    sim1 = warna.similarity(list_h1,list_h2)
    sim2 = warna.similarity(list_s1,list_s2)
    sim3 = warna.similarity(list_v1,list_v2)
    
    cossim1 = ((sim1 + sim2 + sim3) / 3) * 100
    sim.append(cossim1)

#mencetak hasil
simsort = sorted(sim, reverse = True)
for i in range (len(sim)):
    if (simsort[i] < minim):
            break
    for j in range (len(sim)):
        if (simsort[i] == sim[j]):  
            print(f"Tingkat kecocokan ke-{i+1} adalah dengan gambar ke {j+1} atau file yang beranama {daftar_file[j]} dengan persentase = {simsort[i]:.2f}%") 