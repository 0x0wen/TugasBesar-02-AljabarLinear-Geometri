import numpy as np

def histHSV(gambar1):
    bins = 8
    gambar1 = gambar1 / 255.0
    tinggi1 = gambar1.shape[0]
    lebar1 = gambar1.shape[1]
    hist_h = np.zeros(bins)
    hist_s = np.zeros(bins)
    hist_v = np.zeros(bins)
    for i in range(tinggi1):
        for j in range(lebar1):
            # proses untuk gambar 1
            r1 = gambar1[i, j, 2] 
            g1 = gambar1[i, j, 1]  
            b1 = gambar1[i, j, 0] 
            
            Cmax = max(r1,g1,b1)
            Cmin = min(r1,g1,b1)
            selisih = Cmax - Cmin
    
            if (selisih == 0):
                h1 = 0
            elif (Cmax == r1):
                h1 = 60 * (((g1 - b1) / selisih) % 6)
            elif (Cmax == g1):
                h1 = 60 * (((b1 - r1) / selisih) + 2)
            else:
                h1 = 60 * (((r1 - g1) / selisih) + 4)
            
            if (Cmax == 0):
                s1 = 0
            else:
                s1 = selisih / Cmax
            
            v1 = Cmax
            
            idx_h = min(int(h1 / (360 / bins)),bins - 1)
            idx_s = min(int(s1 / (1 / bins)),bins - 1)
            idx_v = min(int(v1 / (1 / bins)),bins - 1)
            
            hist_h[idx_h] += 1
            hist_s[idx_s] += 1
            hist_v[idx_v] += 1
    totalh = sum(hist_h)
    totals = sum(hist_s)
    totalv = sum(hist_v)
    hist_h = [h / totalh for h in hist_h]
    hist_s = [s / totals for s in hist_s]
    hist_v = [v / totalv for v in hist_v]
    return hist_h,hist_s,hist_v


def similarity(hist1,hist2):
    summ = 0
    panjangvek1 = np.linalg.norm(hist1)
    panjangvek2 = np.linalg.norm(hist2)
    for i in range (len(hist1)):
        summ += (hist1[i] * hist2[i])
    return summ / (panjangvek1 * panjangvek2)   