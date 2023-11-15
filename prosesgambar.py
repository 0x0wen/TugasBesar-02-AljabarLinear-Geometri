import cv2
import os
import warna
import time

# minimum tingkat kecocokan
minim = int(input("masukkan minimal tingkat kecocokan (dalam %): "))

start1_time = time.time()

# Membaca gambar dari file
gambar1 = cv2.imread('cek\\0.jpg')
gambar1_resized = cv2.resize(gambar1, (0, 0) , fx = 0.5 , fy = 0.5)
H1,S1,V1 = warna.histHSV(gambar1_resized)

path = "D:\\Kuliah\\Semester 3\\Algeo\\TUBES2_ALGEO\\Github\\TugasBesar-Algeo-2\\cek"
daftar_file = os.listdir(path)

# Mengolah gambar dari RGB ke HSV
sim = []
for nama_file in daftar_file:
    start_time = time.time()
    
    gambar2 = cv2.imread(os.path.join(path, nama_file))
    gambar2_resized = cv2.resize(gambar2, (0, 0) , fx = 0.5 ,fy = 0.5)
    H2,S2,V2 = warna.histHSV(gambar2_resized)

    sim.append((warna.similarity(H1,H2) + warna.similarity(S1,S2) + warna.similarity(V1,V2))/3 *100 )
    
    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"Waktu eksekusi:{elapsed_time:.2f}detik")

#Print hasil compare
simsort = sorted(sim,reverse=True)
for i in range (len(sim)-1,-1,-1):
    if (simsort[i] < minim):
            break
    for j in range (len(sim)):
        if (simsort[i] == sim[j]):  
            print(f"Tingkat kecocokan ke-{i+1} adalah dengan gambar ke {j+1} atau file yang bernama {daftar_file[j]} dengan persentase = {simsort[i]:.2f}%") 
end_time = time.time()
elapsed_time = end_time - start1_time
print(f"Waktu eksekusi:{elapsed_time:.2f}detik")