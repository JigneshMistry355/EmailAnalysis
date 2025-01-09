import imaplib, datetime, os, email, smtplib, ollama, time
from email.message import EmailMessage
from email.header import decode_header
from email.utils import parsedate_to_datetime
from dotenv import load_dotenv
import email.policy
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from bs4 import BeautifulSoup

load_dotenv()
EMAIL_ACCOUNT = os.getenv("NEW_USER")
PASSWORD = os.getenv("NEW_PASSWORD")
IMAP_SERVER = "imap.gmail.com"
SMTP_SERVER = "smtp.gmail.com"
port = 587
imap_port = 993

######## """Format the date to DD-MMM-YYYY.""" ###########   
def DateTimeFormat(date_obj):
    """Format the date to DD-MMM-YYYY."""
    return date_obj.strftime("%d-%b-%Y")

def login(IMAP_SERVER, SMTP_SERVER, EMAIL_ACCOUNT, PASSWORD):
    try:
        imap_server = imaplib.IMAP4_SSL(IMAP_SERVER)
        imap_server.login(EMAIL_ACCOUNT, PASSWORD)
        smtp_server = smtplib.SMTP(SMTP_SERVER, port) 
        smtp_server.starttls()
        smtp_server.login(EMAIL_ACCOUNT, PASSWORD)
    except imaplib.IMAP4.error as e:
        raise Exception("Authentication failed. Please check your credentials.") from e
    except smtplib.SMTPException as e:
        print(f"Authentication failed. Please check your credentials.: {e}")
    except Exception as e:
        print(f"An error occured: {e}")
   


####### """Retrieve emails received today.""" ############
def getAllDraft(IMAP_SERVER, SMTP_SERVER, EMAIL_ACCOUNT, PASSWORD, port):

    # Get current Date & Time
    dateTime = datetime.now()

    # login(IMAP_SERVER, SMTP_SERVER, EMAIL_ACCOUNT, PASSWORD)

    # imap = imaplib.IMAP4_SSL("imap.gmail.com", 993)

    try:
        imap_server = imaplib.IMAP4_SSL(IMAP_SERVER)
        imap_server.login(EMAIL_ACCOUNT, PASSWORD)
        smtp_server = smtplib.SMTP(SMTP_SERVER, port) 
        smtp_server.starttls()
        smtp_server.login(EMAIL_ACCOUNT, PASSWORD)
    except imaplib.IMAP4.error as e:
        raise Exception("Authentication failed. Please check your credentials.") from e
    except smtplib.SMTPException as e:
        print(f"Authentication failed. Please check your credentials.: {e}")
    except Exception as e:
        print(f"An error occured: {e}")

    # Select the Draft
    status, mailbox = imap_server.select("[Gmail]/Drafts")
    if status != 'OK':
        raise Exception("Failed to select Drafts folder.")
    
    # Specify the date in DD-MMM-YYYY format (e.g., 17-Oct-2024)
    search_date = DateTimeFormat(dateTime)

    # Search emails received on or after this date
    status, messages = imap_server.search(None, 'BEFORE', search_date)
    if status != 'OK':
        raise Exception(f"IMAP search failed with status: {status}")
    # messages --> an array that contains binary id of each email in the inbox in a single string 
    # eg. [b'abcd efgh ijkl mnop qrst']

    # Get the list of email IDs returned by the search
    email_ids = messages[0].split()

    # print(f"Found {len(email_ids)} emails since {search_date}")
    print(f"Found {len(email_ids)} emails since {search_date}: {email_ids}")

    for email_id in email_ids:
        print(getSingleDraftDetails(email_id, IMAP_SERVER, SMTP_SERVER, EMAIL_ACCOUNT, PASSWORD, port))

    return email_ids

def getSingleDraftDetails(email_id, IMAP_SERVER, SMTP_SERVER, EMAIL_ACCOUNT, PASSWORD, port):

    history_Element = {}

    try:
        imap_server = imaplib.IMAP4_SSL(IMAP_SERVER)
        imap_server.login(EMAIL_ACCOUNT, PASSWORD)
        smtp_server = smtplib.SMTP(SMTP_SERVER, port) 
        smtp_server.starttls()
        smtp_server.login(EMAIL_ACCOUNT, PASSWORD)
    except imaplib.IMAP4.error as e:
        raise Exception("Authentication failed. Please check your credentials.") from e
    except smtplib.SMTPException as e:
        print(f"Authentication failed. Please check your credentials.: {e}")
    except Exception as e:
        print(f"An error occured: {e}")

    status, msg_data = imap_server.fetch(email_id, "(RFC822)")

    # Parse the email content
    msg = email.message_from_bytes(msg_data[0][1])

    # Get the email subject
    subject, encoding = decode_header(msg["Subject"])[0]
    if isinstance(subject, bytes):
        subject = subject.decode(encoding if encoding else "utf-8")

    history_Element["subject"] = subject

    # Get the sender's information
    sender_name, sender_email = email.utils.parseaddr(msg["From"])
    history_Element["sender_name"] = sender_name
    history_Element["sender_email"] = sender_email

    # Get the date and format it
    date_tuple = email.utils.parsedate_tz(msg["Date"])
    email_date = parsedate_to_datetime(msg["Date"]).strftime("%d-%b-%Y %H:%M:%S")
    history_Element['email_date'] = email_date


    if msg.is_multipart():
        for part in msg.walk():
            # Extract content type
            content_type = part.get_content_type()
            content_disposition = str(part.get("Content-Disposition"))

            try:
                # Get the email body
                body = part.get_payload(decode=True).decode()
                body = BeautifulSoup(body, "html.parser")
                body = body.get_text()
                history_Element["body"] = body

                # split_gmail = body.split(" ")
                # print("Body:", body)
                # conversation_history.append(history_Element)
                
                break
            except:
                pass

    return history_Element

# getAllDraft(IMAP_SERVER, SMTP_SERVER, EMAIL_ACCOUNT, PASSWORD, port)

def draft_email(subject, sender, recipient, body, EMAIL_ACCOUNT, PASSWORD, SMTP_SERVER, port, IMAP_SERVER):
    
    message = MIMEMultipart()
    message["From"] = EMAIL_ACCOUNT
    message["To"] = recipient
    message["Subject"] = subject

    prompt = f"generate a formal response email body from {EMAIL_ACCOUNT} for {sender} only. Do not generate subject. Here is the summary of his email : {body}"

    ollama_response = ollama.chat(
        model = 'llama3.1:8b', 
        messages=[{
            'role':'user',
            'content':prompt
        }]
    )
    ollama_response = ollama_response['message']['content']
    message.attach(MIMEText(ollama_response, 'plain'))

    try:
        print("Details ==> ",subject, sender, recipient)
        smtp_server = smtplib.SMTP(SMTP_SERVER, port) 
        smtp_server.starttls()
        smtp_server.login(EMAIL_ACCOUNT, PASSWORD)

        email_string = message.as_string()

        imap_server = imaplib.IMAP4_SSL(IMAP_SERVER)
        imap_server.login(EMAIL_ACCOUNT, PASSWORD)
        imap_server.select('[Gmail]/Drafts')
        imap_server.append('[Gmail]/Drafts', '', imaplib.Time2Internaldate(time.time()), email_string.encode('utf-8'))

        # print('$'*120)
        # print(message["From"])
        # print(message['To'])
        # print(message['Subject'])
        # print("Process Complete..!")
        return { "Subject": message["Subject"],  "Sender_Name": sender, "To": message["To"], "Body": ollama_response, }

    except Exception as e:
        print(f"An error occured: {e}")
    finally:
        smtp_server.quit()
        imap_server.close()


def generate_to_send(subject, sender, recipient, body, EMAIL_ACCOUNT, PASSWORD, SMTP_SERVER, port, IMAP_SERVER):
    message = MIMEMultipart()
    message["From"] = EMAIL_ACCOUNT
    message["To"] = recipient
    message["Subject"] = subject

    prompt = f"generate a formal response email body from {EMAIL_ACCOUNT} for {sender} only. Do not generate subject. Here is the summary of this email : {body}"

    ollama_response = ollama.chat(
        model = 'llama3.1:8b', 
        messages=[{
            'role':'user',
            'content':prompt
        }]
    )
    ollama_response = ollama_response['message']['content']
    message.attach(MIMEText(ollama_response, 'plain'))

    try:
        print("Details ==> ",subject, sender, recipient)
        smtp_server = smtplib.SMTP(SMTP_SERVER, port) 
        smtp_server.starttls()
        smtp_server.login(EMAIL_ACCOUNT, PASSWORD)

        email_string = message.as_string()

        imap_server = imaplib.IMAP4_SSL(IMAP_SERVER)
        imap_server.login(EMAIL_ACCOUNT, PASSWORD)
        

        # print('$'*120)
        # print(message["From"])
        # print(message['To'])
        # print(message['Subject'])
        # print("Process Complete..!")
        return { "Subject": message["Subject"],  "Sender_Name": sender, "To": message["To"], "Body": ollama_response, }

    except Exception as e:
        print(f"An error occured: {e}")
  


def send_email(subject, sender, recipient, body, EMAIL_ACCOUNT, PASSWORD, SMTP_SERVER, port):

    message = MIMEMultipart()
    message["From"] = sender
    message["To"] = recipient
    message["Subject"] = subject

    # prompt = f"generate a formal response for {sender}. Here is the summary of his email : {body}"
    # ollama_response = ollama.chat(
    #     model = 'llama3.1:8b', 
    #     messages=[{
    #         'role':'user',
    #         'content':prompt
    #     }]
    # )
    # ollama_response = ollama_response['message']['content']
    message.attach(MIMEText(body, 'plain'))
    # message.add_header('X-Unsent', '1')
    
    try:
        with smtplib.SMTP(SMTP_SERVER, port) as server:
            server.starttls()
            server.login(EMAIL_ACCOUNT, PASSWORD)
            
            # Send email
            server.sendmail(EMAIL_ACCOUNT, recipient, message.as_string())
            
    except smtplib.SMTPException as e:
        print(f"Login failed: {e}")
    except Exception as e:
        print(f"An error occurred while sending the email: {e}")
   


# subject = "Test Email from Jignesh today"
# sender = "jigneshmistry1997@gmail.com"
# recipient = "jvmistry7@gmail.com"
# body = """
# aaa bbb c d eeeeeeee ffffff
# """
# generate_to_send(subject, sender, recipient, body, EMAIL_ACCOUNT, PASSWORD, SMTP_SERVER, port, IMAP_SERVER)
# send_email(subject, sender, recipient, body, EMAIL_ACCOUNT, PASSWORD, SMTP_SERVER, port)
# draft_email(subject, sender, recipient, body, EMAIL_ACCOUNT, PASSWORD, SMTP_SERVER, port, IMAP_SERVER)
# {"Sender_Name":"=?utf-8?Q?Kotak_Fastrack_Personal_Loan_=F0=9F=92=B0?=","Sender_Email":"retailproducts@kotak.in","Subject":"Wohoo😍 Rs.100000 is pre-approved for you, Jignesh Mistry","Response":"Here is a summary of the email content, focusing on key information only:\n\n* The sender is Kotak Mahindra Bank.\n* A pre-approved loan of ₹100,000 is available.\n* Features include:\n\t+ Instant disbursement\n\t+ Zero documentation\n\t+ Tenure of 36 months\n* Click here to view complete terms and conditions.","Email_date":"13-Nov-2024 02:22:58","Category":"Offer","Priority":"low"}