import cv2
import os
import numpy as np
from scipy.spatial import distance
import pickle

global_objects = None

def grayscale_image(image):
    r, g, b = cv2.split(image)
    r = r * 0.29
    g = g * 0.587
    b = b * 0.114
    y = r+g+b
    yInt = y.astype(int)
    return yInt

def calculate_texture_features(image):
    co_occurrence_matrix = np.zeros((256, 256), dtype=int)
    height, width = image.shape

    for i in range(height):
        for j in range(width):
            if i < height - 1 and j < width - 1:
                co_occurrence_matrix[image[i, j], image[i+1, j+1]] += 1

    contrast = np.sum(np.square(np.arange(256)[:, np.newaxis] - np.arange(256)[np.newaxis, :]) * co_occurrence_matrix)
    entropy = -np.sum(co_occurrence_matrix * np.log(co_occurrence_matrix + np.finfo(float).eps))
    homogeneity = np.sum(co_occurrence_matrix / (1 + np.abs(np.arange(256)[:, np.newaxis] - np.arange(256)[np.newaxis, :])))

    return contrast, entropy, homogeneity

def coocMatrix(image):
    image = grayscale_image(image)
    co_occurrence_matrix = np.zeros((256, 256), dtype=int)
    height, width = image.shape

    for i in range(height):
        for j in range(width-1):
            co_occurrence_matrix[image[i, j], image[i, j+1]] += 1
    
    return co_occurrence_matrix

def cariKontrasDll(co_occurrence_matrix):
    contrast = np.sum(np.square(np.arange(256)[:, np.newaxis] - np.arange(256)[np.newaxis, :]) * co_occurrence_matrix)
    entropy = -np.sum(co_occurrence_matrix * np.log(co_occurrence_matrix + np.finfo(float).eps))
    homogeneity = np.sum(co_occurrence_matrix / (1 + np.abs(np.arange(256)[:, np.newaxis] - np.arange(256)[np.newaxis, :])))
    return contrast, entropy, homogeneity

def cosine_similarity(vector1, vector2):
    return 1 - distance.cosine(vector1, vector2)

