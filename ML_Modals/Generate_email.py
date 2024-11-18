import imaplib, datetime, os, email, smtplib, ollama, time
from email.message import EmailMessage
from email.header import decode_header
from email.utils import parsedate_to_datetime
from dotenv import load_dotenv
import email.policy
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


load_dotenv()
EMAIL_ACCOUNT = os.getenv("NEW_USER")
PASSWORD = os.getenv("NEW_PASSWORD")
IMAP_SERVER = "imap.gmail.com"
SMTP_SERVER = "smtp.gmail.com"
port = 587

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


def send_email(subject, sender, recipient, body, EMAIL_ACCOUNT, PASSWORD, SMTP_SERVER, port):

    message = MIMEMultipart()
    message["From"] = EMAIL_ACCOUNT
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

# send_email(subject, sender, recipient, body, EMAIL_ACCOUNT, PASSWORD, SMTP_SERVER, port)
# draft_email(subject, sender, recipient, body, EMAIL_ACCOUNT, PASSWORD, SMTP_SERVER, port, IMAP_SERVER)
# {"Sender_Name":"=?utf-8?Q?Kotak_Fastrack_Personal_Loan_=F0=9F=92=B0?=","Sender_Email":"retailproducts@kotak.in","Subject":"Wohoo😍 Rs.100000 is pre-approved for you, Jignesh Mistry","Response":"Here is a summary of the email content, focusing on key information only:\n\n* The sender is Kotak Mahindra Bank.\n* A pre-approved loan of ₹100,000 is available.\n* Features include:\n\t+ Instant disbursement\n\t+ Zero documentation\n\t+ Tenure of 36 months\n* Click here to view complete terms and conditions.","Email_date":"13-Nov-2024 02:22:58","Category":"Offer","Priority":"low"}