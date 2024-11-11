import imaplib, datetime, os, email
from email.message import EmailMessage
from email.header import decode_header
from email.utils import parsedate_to_datetime
from dotenv import load_dotenv
import email.policy


load_dotenv()
EMAIL_ACCOUNT = os.getenv("EMAIL_USER")
PASSWORD = os.getenv("EMAIL_PASS")
IMAP_SERVER = "imap.gmail.com"

def save_draft(subject, sender, recipient, body, EMAIL_ACCOUNT, PASSWORD):
    
    # Set up the email message
    msg = EmailMessage(policy=email.policy.SMTP)
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = recipient
    msg.set_content(body)
    msg_date = datetime.datetime.now().strftime("%d-%b-%Y %H:%M:%S")

    IMAP_SERVER = "imap.gmail.com"
    with imaplib.IMAP4_SSL(IMAP_SERVER, 993) as imap:
        try:
            imap.login(EMAIL_ACCOUNT, PASSWORD)
            print("Logged in successfully!")
        
        
            imap.select("Drafts")

            timestamp = datetime.datetime.now().strftime("%d-%b-%Y %H:%M:%S")
            imap.append("Drafts","", imaplib.Time2Internaldate(datetime.datetime.now().timestamp()), msg.as_bytes())
            print("Email Draft saved .. !")
        except imaplib.IMAP4.error as e:
            print(f"Login failed: {e}")
        except Exception as e:
            print(f"An error occurred: {e}")


subject = "Test Email from Sahil"
sender = "sahiljadhav25009@gmail.com"
recipient = "jvmistry7@gmail.com"
body = """\
Dear Applicant,

We are thrilled to announce an opening for a Marketing Specialist at Creative Corp. If you’re passionate about brand-building and engaging with customers through innovative marketing campaigns, this is an opportunity to consider.

Please visit our careers page to learn more about the role, responsibilities, and how to apply. We look forward to receiving your application.

Best regards,
Laura Garcia
Talent Acquisition Manager
Creative Corp
"""

save_draft(subject, sender, recipient, body, EMAIL_ACCOUNT, PASSWORD)