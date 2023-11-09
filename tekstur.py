import cv2
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def Normalisasi(r,g,b):
    r = r * 0.29
    g = g * 0.587
    b = b * 0.114
    y = r+g+b
    return y

def coocurenceMatrix(list, tinggi, lebar):
    cooc = np.zeros((256,256), dtype=int)

    for i in range(tinggi):
        for j in range(lebar-1):
            X = round(list[i,j])
            Y = round(list[i,j+1])
            cooc[X,Y] += 1

    return cooc

def symmetricMatrix(matrix):
    symMatrix = np.zeros((256,256), dtype=float)
    
    symMatrix = matrix + np.transpose(matrix)
    
    return symMatrix

def normalizationMatrix(matrix):
    pembagi = np.sum(matrix)
    
    norm = np.zeros((256,256),dtype=float)
    norm = matrix / pembagi

    return norm

def contrast(matrix):
    totcon = np.sum(matrix * (np.arange(matrix.shape[0])[:, None] - np.arange(matrix.shape[1]))**2)

    return totcon

def homogenity(matrix):
    tothom = np.sum(matrix / (1 + np.abs(np.arange(matrix.shape[0])[:, None] - np.arange(matrix.shape[1]))))
    return tothom

def entropy(matrix):
    epsilon = 1e-8
    matrix = np.maximum(matrix, epsilon)
    totent = -np.sum(matrix * np.log2(matrix))
    
    return totent

def CBIR_Tekstur(gambar1):
    tinggi = gambar1.shape[0]
    lebar = gambar1.shape[1]
    list_Y = np.zeros((tinggi,lebar))
    r, g, b = cv2.split(gambar1)

    list_Y = Normalisasi(r,g,b)

    cooc = coocurenceMatrix(list_Y, tinggi, lebar)
    coocsim = symmetricMatrix(cooc)
    norm = normalizationMatrix(coocsim)

    totcon = contrast(norm)
    tothom = homogenity(norm)
    totent = entropy(norm)

    return totcon,tothom,totent

def similarity(totcon1, tothom1, totent1, totcon2, tothom2, totent2):
    vektor_1 = np.array([totcon1, tothom1, totent1])
    vektor_2 = np.array([totcon2, tothom2, totent2])

    vektor_1 = vektor_1 / np.linalg.norm(vektor_1)
    vektor_2 = vektor_2 / np.linalg.norm(vektor_2)

    similarity = cosine_similarity([vektor_1], [vektor_2])[0][0]

    return similarity