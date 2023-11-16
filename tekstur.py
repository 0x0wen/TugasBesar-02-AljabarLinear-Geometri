import cv2
import numpy as np

def grayscale_image(image):
    r, g, b = cv2.split(image)
    r = r * 0.29
    g = g * 0.587
    b = b * 0.114
    y = r+g+b
    yInt = y.astype(int)
    return yInt

def calculate_texture_features(image):
    image = grayscale_image(image)
    co_occurrence_matrix = np.zeros((256, 256), dtype=int)
    height, width = image.shape

    for i in range(height):
        for j in range(width-1):
            if j < width:
                co_occurrence_matrix[image[i, j], image[i, j+1]] += 1

    contrast = np.sum(np.square(np.arange(256)[:, np.newaxis] - np.arange(256)[np.newaxis, :]) * co_occurrence_matrix)
    entropy = -np.sum(co_occurrence_matrix * np.log(co_occurrence_matrix + np.finfo(float).eps))
    homogeneity = np.sum(co_occurrence_matrix / (1 + np.abs(np.arange(256)[:, np.newaxis] - np.arange(256)[np.newaxis, :])))

    return contrast, entropy, homogeneity

def cosine_similarity(vector1, vector2):
    dot_product = np.dot(vector1, vector2)
    norm_vector1 = np.linalg.norm(vector1)
    norm_vector2 = np.linalg.norm(vector2)
    
    similarity = dot_product / (norm_vector1 * norm_vector2)

    return similarity