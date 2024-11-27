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



class ReadDraft:

    def __init__(self, EMAIL_ACCOUNT, PASSWORD, IMAP_SERVER, imap_port, SMTP_SERVER, smtp_port):
        self.EMAIL_ACCOUNT = EMAIL_ACCOUNT
        self.PASSWORD = PASSWORD
        self.imap = imaplib.IMAP4_SSL(IMAP_SERVER, imap_port)
        self.smtp = smtplib.SMTP(SMTP_SERVER, smtp_port)

    def DateTimeFormat(self, date_obj):
        """Format the date to DD-MMM-YYYY."""
        return date_obj.strftime("%d-%b-%Y")

    def login(self):
        try:
            self.imap.login(self.EMAIL_ACCOUNT, self.PASSWORD)
            print("IMAP Logged in")

            self.smtp.starttls()
            self.smtp.login(self.EMAIL_ACCOUNT, self.PASSWORD)
            
            print("SMTP Login")

        except imaplib.IMAP4.error as e:
            raise Exception("Authentication failed. Please check your credentials.") from e
        except smtplib.SMTPException as e:
            print(f"Authentication failed. Please check your credentials.: {e}")
        except Exception as e:
            print(f"An error occured: {e}")

    def getAllDraft(self):

        # Get current Date & Time
        dateTime = datetime.now()

        self.login()

        # imap = imaplib.IMAP4_SSL("imap.gmail.com", 993)

        # try:
        #     self.imap_server = imaplib.IMAP4_SSL(IMAP_SERVER)
        #     self.imap_server.login(EMAIL_ACCOUNT, PASSWORD)
        #     self.smtp_server = smtplib.SMTP(SMTP_SERVER, smtp_port) 
        #     self.smtp_server.starttls()
        #     self.smtp_server.login(EMAIL_ACCOUNT, PASSWORD)
        # except imaplib.IMAP4.error as e:
        #     raise Exception("Authentication failed. Please check your credentials.") from e
        # except smtplib.SMTPException as e:
        #     print(f"Authentication failed. Please check your credentials.: {e}")
        # except Exception as e:
        #     print(f"An error occured: {e}")

        # Select the Draft [Gmail]/Drafts
        status, mailbox = self.imap.select("[Gmail]/Drafts")
        if status != 'OK':
            raise Exception("Failed to select Drafts folder.")
        
        # Specify the date in DD-MMM-YYYY format (e.g., 17-Oct-2024)
        search_date = self.DateTimeFormat(dateTime)
        # print("Date ===============> ",search_date)

        # Search emails received on or after this date
        status, messages = self.imap.search(None, 'BEFORE', search_date)
        if status != 'OK':
            raise Exception(f"IMAP search failed with status: {status}")
        # messages --> an array that contains binary id of each email in the inbox in a single string 
        # eg. [b'abcd efgh ijkl mnop qrst']

        # Get the list of email IDs returned by the search
        email_ids = messages[0].split()

        # print(f"Found {len(email_ids)} emails since {search_date}")
        # print(f"Found {len(email_ids)} emails since {search_date}: {email_ids}")

        # for email_id in email_ids:
        #     print("#"*140)
        #     self.SingleEmailDetails(email_id)


        return email_ids
    
    def SingleEmailDetails(self, email_id):
        history_Element = {}

        # Fetch each email by ID
        status, msg_data = self.imap.fetch(email_id, "(RFC822)")
        # print("Fetched email data")

        # Parse the email content
        msg = email.message_from_bytes(msg_data[0][1])
        # print("Conerted email to bytes", msg)

        # Get the email subject
        subject, encoding = decode_header(msg["Subject"])[0]
        # print("Got subject")
        if isinstance(subject, bytes):
            subject = subject.decode(encoding if encoding else "utf-8")

        history_Element["subject"] = subject

        # Get the sender's information
        receiver_email = msg["To"]
        history_Element["receiver_email"] = receiver_email
        print(f'Recepient email : {history_Element["receiver_email"]}')

        # Get the date and format it
        date_tuple = email.utils.parsedate_tz(msg["Date"])
        # print("Entering date format")

        # This is a draft, there exists no date, so remove email_date
        # email_date = parsedate_to_datetime(msg["Date"]).strftime("%d-%b-%Y %H:%M:%S")
        # print("Email date", email_date)
        # history_Element['email_date'] = email_date


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
        # print(history_Element)
        return history_Element


if __name__ == '__main__':

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

    
