from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
import os, subprocess, json
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from dotenv import load_dotenv
from typing import Annotated

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "fakehashedsecret",
        "disabled": False,
    },
    "alice": {
        "username": "alice",
        "full_name": "Alice Wonderson",
        "email": "alice@example.com",
        "hashed_password": "fakehashedsecret2",
        "disabled": True,
    },
}

app = FastAPI()

def fake_hashed_password(password : str):
    return "fakehashed" + password

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    username : str
    email : str | None = None
    full_name : str | None = None
    disabled : str | None = None

class UserInDB(User):
    hashed_password : str

def getuser(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

def fake_decode_token(token):
    user = getuser(fake_users_db, token)
    return user

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException( 
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Invalid authentication credentials",
            headers = {"WWW-Authenticate": "Bearer"}
            )
    return user

async def get_current_active_user(current_user: Annotated[User, Depends(get_current_user)]):
    if current_user.disabled:
        raise HTTPException(status_code = 400, detail = "Inactive user")
    return current_user

@app.post("/token")
async def login(form_data : Annotated[OAuth2PasswordRequestForm, Depends()] ):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code= 400, detail= "Incorrect Username or password")
    user = UserInDB(**user_dict)
    hashed_password = fake_hashed_password(form_data.password)
    if not fake_hashed_password == user.hashed_password:
        raise HTTPException(status_code= 400, detail= "Incorrect Username or password")
    return {"access token": user.username, "token_type": "bearer"}


@app.get("/login")
async def read_users(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user

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
    

    

