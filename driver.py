import test
import os
import cv2
import csv

def ubahArrayGambarJadiHistHSV(path_gambar,path_csv):
    arrayobjects = []
    ArrayGambar = os.listdir(path_gambar)
    i = 1
    for image in ArrayGambar:
        compared_image = cv2.imread(os.path.join(path_gambar, image))
        image_resize = cv2.resize(compared_image, (0,0), fx = 0.5, fy = 0.5)
        H,S,V = test.histHSV(image_resize)
        arrayobjects.append({
            "image": compared_image,
            "hist_h": H,
            "hist_s": S,
            "hist_v": V,
        })
        print(f'gambar {i} sudah jadi')
        i+=1
    
    with open(path_csv, 'w', newline='') as csv_file:
        # Specify the field names (column headers)
        fieldnames = ['image', 'hist_h', 'hist_s', 'hist_v']
        
        # Create a CSV writer object
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

        # Write the header row
        writer.writeheader()

        # Write the data rows
        for row in arrayobjects:
            writer.writerow(row)
    