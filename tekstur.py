import cv2
import numpy as np

def Normalisasi(r,g,b):
    r *= 29/100
    g *= 587/1000
    b *= 114/1000
    y = round(r+g+b)
    return y

def coocurenceMatrix(list, tinggi, lebar):
    cooc = np.zeros((256,256))

    for i in range(tinggi):
        for j in range(lebar-1):
            X = list[i, j]
            Y = list[i, j+1]
            cooc[X,Y] += 1

    return cooc

def symmetricMatrix(matrix):
    tMatrix = np.zeros((256,256))

    for i in range(255):
        for j in range(255):
            tMatrix[i,j] = matrix[j,i]

    symMatrix = np.zeros((256,256))
    for i in range(255):
        for j in range(255):
            symMatrix[i,j] = matrix[i,j]+tMatrix[i,j]
    
    return symMatrix

def contrast(matrix):
    totcon = 0
    for i in range(255):
        for j in range(255):
            totcon += matrix[i,j] * ((i-j) ** 2)
    
    return totcon

def homogenity(matrix):
    tothom = 0

    for i in range(255):
        for j in range(255):
            tothom += matrix[i,j] / (1 + ((i - j) ** 2))
    
    return tothom

def entropy(matrix):
    totent = 0

    for i in range(255):
        for j in range(255):
            totent += -1*(matrix[i,j]*np.log(matrix[i,j]))
    
    return totent

def CBIR_Tekstur(gambar):
    tinggi = gambar.shape[0]
    lebar = gambar.shape[1]
    list_Y = np.zeros((tinggi,lebar))

    for i in range(tinggi):
        for j in range(lebar):
            r = gambar[i,j,2]
            g = gambar[i,j,1]
            b = gambar[i,j,0]
            Y = Normalisasi(r,g,b)
            list_Y[i,j] = Y

    totcon = contrast(list_Y) 
    tothom = homogenity(list_Y)
    totent = entropy(list_Y)

    return totcon,tothom,totent

def similarity(list1,list2):
    sum = 0
    panjangvek1 = 0;
    panjangvek2 = 0;

    sum += (list1 * list2)
    panjangvek1 += list1**2
    panjangvek2 += list2**2
    
    panjangvek1 **= (1/2)  
    panjangvek2 **= (1/2)
    
    return sum / (panjangvek1 * panjangvek2) 