from fastapi import FastAPI
import os, subprocess, json
from fastapi.middleware.cors import CORSMiddleware
# from dotenv import load_dotenv


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def run_script():
    try :
        print("Starting the process..")
        
        result = subprocess.run(["python", "get_gmail_data.py"], capture_output=True, text=True)

        # result = subprocess.run(venv, command)

        if result.returncode == 0:
            output_dict = json.loads(result.stdout)
            return output_dict
        else :
            return {"message":"Script failed", "error": result.stderr}
    except Exception as e:
        return {"message":"An error occured", "error": str(e)}