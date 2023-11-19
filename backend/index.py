from fastapi import FastAPI, File, Form,UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uvicorn
from colorCBIR import colorCBIR
from textureCBIR import textureCBIR
from datasetProcessor import datasetFeatureExtractor

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Add your frontend URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

color_dataset = []
texture_dataset= []



@app.get("/healthchecker")
def healthchecker():
    return {"status": "success", "message": "yes no Framework with Next.js"}


@app.post("/dataset")
async def process_images(files: List[UploadFile] = File(...)):
    global color_dataset
    global texture_dataset
    try:
        color_dataset,texture_dataset = await datasetFeatureExtractor(files)
        return {"status": "success", "message": "Dataset is processed!"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@app.post("/query")
async def query(threshold: str = Form(...),parameter : str = Form(...), file: UploadFile = File(...) ):
    global color_dataset
    global texture_dataset
    try:
        if(parameter == 'color'):
            return await colorCBIR(threshold,file,color_dataset)
        else:
            return await textureCBIR(threshold,file,texture_dataset)
    except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")
    

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)