import cv2
import test
import time
import driver
import pandas as pd

minim = int(input("masukkan minimal tingkat kecocokan (dalam %): "))
mulai = time.time()

path1 = "0.jpg"
gambar1 = cv2.imread(path1)
gambar1_resized = cv2.resize(gambar1, (0, 0) , fx = 0.5 , fy = 0.5)
H1,S1,V1 = test.histHSV(gambar1_resized)

path1 = "D:\\Kuliah\\Semester 3\\Algeo\\TUBES2_ALGEO\\Lokal\\Dataset"
path2 = "output.csv"
driver.ubahArrayGambarJadiHistHSV(path1 , path2)

sim = []
df = pd.read_csv(path2)

df['hist_h'] = df['hist_h'].apply(eval)
df['hist_s'] = df['hist_s'].apply(eval)
df['hist_v'] = df['hist_v'].apply(eval)

for index, row in df.iterrows():
    H2,S2,V2 = row['hist_h'],row['hist_s'],row['hist_v']
    sim.append((test.similarity(H1,H2) + test.similarity(S1,S2) + test.similarity(V1,V2))/3 *100) 

simsort = sorted(sim,reverse=True)
for i in range (len(sim)-1,-1,-1):
    if (simsort[i] < minim):
            break
    for j in range (len(sim)):
        if (simsort[i] == sim[j]):  
            print(f"Tingkat kecocokan ke-{i+1} adalah dengan gambar ke {j+1} dengan persentase = {simsort[i]:.2f}%") 

selesai = time.time()
selisih = selesai - mulai
print(f"Waktu eksekusi:{selisih:.2f}detik")