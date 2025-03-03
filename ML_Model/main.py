from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
import os, subprocess, json, jwt
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated
from datetime import datetime, timedelta, timezone
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from typing import Optional
from Generate_email import send_email, draft_email, generate_to_send
from dotenv import load_dotenv
from read_draft import ReadDraft

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

fake_users_db = {
    "alice": {
        "username": "alice",
        "full_name": "Alice Wonderson",
        "email": "alice@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": True,
    },
}

def fake_hashed_password(password : str):
    return "fakehashed" + password

class Token(BaseModel):
    access_token : str
    token_type : str

class TokenData(BaseModel):
    username : str | None = None

class User(BaseModel):
    username : str
    email : str | None = None
    full_name : str | None = None
    disabled : bool | None = None

class UserInDB(User):
    hashed_password : str
    
pwd_context = CryptContext(schemes = ["bcrypt"], deprecated = "auto") 

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hashed(password):
    return pwd_context.hash(password)

def getuser(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)
    
def authenticate_user(fake_db, username: str, password: str):
    user = getuser(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data : dict, expires_delta : timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes= 15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm= ALGORITHM)
    return encoded_jwt

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail = "Could not validate credentials",
        headers = {"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms= [ALGORITHM])
        username: str = payload.get('sub')
        if username is None:
            raise credentials_exception
        token_data = TokenData(username = username)
    except InvalidTokenError:
        raise credentials_exception
    user = getuser(fake_users_db, username = token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: Annotated[User, Depends(get_current_user)]):
    if current_user.disabled:
        raise HTTPException(status_code = 400, detail = "Inactive user")
    return current_user

@app.post("/token")
async def login_for_access_token(
    form_data : Annotated[OAuth2PasswordRequestForm, Depends()] 
    ) -> Token:

    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data= {"sub":user.username} , expires_delta= access_token_expires
    )
    return Token(access_token= access_token, token_type= "bearer")

@app.get("/login")
async def read_users(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user
  
@app.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return [{"item_id": "Foo", "owner": current_user.username}]  



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
    

# class Item(BaseModel):
#     Sender_Name : str | None = None
#     Sender_Email : str | None = None
#     Subject : str | None = None
#     Response : str | None = None
#     Email_date : str | None = None
#     Category : str | None = None
#     Priority : str | None = None


class Item(BaseModel):
    Sender_Name: Optional[str] = None
    Sender_Email: Optional[str] = None
    Subject: Optional[str] = None
    Response: Optional[str] = None
    Email_date: Optional[str] = None  # You can also use datetime if date parsing is required
    Category: Optional[str] = None
    Priority: Optional[str] = None


class SendItems(BaseModel):
    Sender_Name : Optional[str] = None
    Body : Optional[str] = None
    Subject : Optional[str] = None
    To : Optional[str] = None
    Email_date: Optional[str] = None  # You can also use datetime if date parsing is required
    Category: Optional[str] = None
    Priority: Optional[str] = None


class DraftList(BaseModel):
    Subject : Optional[str] = None
    Receiver_email : Optional[str] = None
    Body : Optional[str] = None


@app.post("/send_email/")
async def email_response(data : SendItems):
    load_dotenv()
    EMAIL_ACCOUNT = os.getenv("NEW_USER")
    PASSWORD = os.getenv("NEW_PASSWORD")
    SMTP_SERVER = "smtp.gmail.com"
    port = 587
    subject = data.Subject
    sender = EMAIL_ACCOUNT
    recipient = data.To
    body = data.Body

    print("Executing function")
    response = send_email(subject, sender, recipient, body, EMAIL_ACCOUNT, PASSWORD, SMTP_SERVER, port)
    print("Subject: ", subject)
    print("Sender Email: ", sender)
    print("Receiver: ", recipient)
    return {"Message": response}


# send_email(subject, sender, recipient, body, EMAIL_ACCOUNT, PASSWORD, SMTP_SERVER, port)
@app.post("/draft_email/")
async def email_response(data : Item):
    load_dotenv()
    EMAIL_ACCOUNT = os.getenv("NEW_USER")
    PASSWORD = os.getenv("NEW_PASSWORD")
    SMTP_SERVER = "smtp.gmail.com"
    IMAP_SERVER = "imap.gmail.com"
    port = 587
    subject = data.Subject
    sender = data.Sender_Name
    recipient = data.Sender_Email
    body = data.Response

    print("Executing function")
    # print("Details ==> ",json.dumps(subject), sender, recipient)
    response = draft_email(subject, sender, recipient, body, EMAIL_ACCOUNT, PASSWORD, SMTP_SERVER, port, IMAP_SERVER)
    # print(response)
    return response


@app.post("/generate_to_send_email/")
async def generate_email(data : Item):
    load_dotenv()
    EMAIL_ACCOUNT = os.getenv("NEW_USER")
    PASSWORD = os.getenv("NEW_PASSWORD")
    SMTP_SERVER = "smtp.gmail.com"
    IMAP_SERVER = "imap.gmail.com"
    port = 587
    subject = data.Subject
    sender = data.Sender_Name
    recipient = data.Sender_Email
    body = data.Response

    print("Executing function")
    # print("Details ==> ",json.dumps(subject), sender, recipient)
    response = generate_to_send(subject, sender, recipient, body, EMAIL_ACCOUNT, PASSWORD, SMTP_SERVER, port, IMAP_SERVER)
    # print(response)
    return response


@app.get("/draft_list/")
async def draft_list():
    load_dotenv()
    EMAIL_ACCOUNT = os.getenv("NEW_USER")
    PASSWORD = os.getenv("NEW_PASSWORD")
    IMAP_SERVER = "imap.gmail.com"
    SMTP_SERVER = "smtp.gmail.com"
    smtp_port = 587
    imap_port = 993
    draft_object = ReadDraft(EMAIL_ACCOUNT, PASSWORD, IMAP_SERVER, imap_port, SMTP_SERVER, smtp_port)
    Emails = draft_object.getAllDraft()
    myDraftList = []
    for email_id in Emails:
        # print(draft_object.SingleEmailDetails(email_id))
        myDraftList.append(draft_object.SingleEmailDetails(email_id))
    return myDraftList[::-1] 