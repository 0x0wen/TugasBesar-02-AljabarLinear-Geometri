def Normalisasi(r,g,b):
    r /= 255
    g /= 255
    b /= 255
    return r,g,b
 
def cariH(Cmax,r,g,b,selisih):
    if (selisih == 0):
        return 0
    elif (Cmax == r):
        return 60 * (((g - b) / selisih) % 6)
    elif (Cmax == g):
        return 60 * (((b - r) / selisih) + 2)
    else:
        return 60 * (((r - g) / selisih) + 4)
    
def cariS(Cmax , selisih):
    if (Cmax == 0):
        return 0
    else:
        return selisih / Cmax

def RGBToHSV(r,g,b):
    
    r,g,b = Normalisasi(r,g,b)
    
    Cmax = max(r,g,b)
    Cmin = min(r,g,b)
    selisih = Cmax - Cmin
    
    h = cariH(Cmax,r,g,b,selisih)
    s = cariS(Cmax,selisih)
    v = Cmax
    return h,s,v

def similarity(list1,list2):
    sum = 0
    panjangvek1 = 0;
    panjangvek2 = 0;
    a = len(list1)
    if (a > len(list2)):
        a = len(list2)
    for i in range (a):
        sum += (list1[i] * list2[i])
        panjangvek1 += list1[i]**2
        panjangvek2 += list2[i]**2
    panjangvek1 **= (1/2)  
    panjangvek2 **= (1/2)
    
    return sum / (panjangvek1 * panjangvek2)    

def CBIR_Warna(gambar1):
    tinggi1 = gambar1.shape[0]
    lebar1 = gambar1.shape[1]
    list_h1 = []
    list_s1 = []
    list_v1 = []
    for i in range(tinggi1):
        for j in range(lebar1):
            # proses untuk gambar 1
            r1 = gambar1[i, j, 2] 
            g1 = gambar1[i, j, 1]  
            b1 = gambar1[i, j, 0] 
            h1,s1,v1 = RGBToHSV(r1,g1,b1)
            list_h1.append(h1)
            list_s1.append(s1)
            list_v1.append(v1)
    return list_h1,list_s1,list_v1
