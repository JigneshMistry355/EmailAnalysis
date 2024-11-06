import imaplib, datetime, os
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()
EMAIL_ACCOUNT = os.getenv("EMAIL_USER")
PASSWORD = os.getenv("EMAIL_PASS")
IMAP_SERVER = "imap.gmail.com"

def save_draft(subject, sender, recipient, body):
    # Set up the email message
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = recipient
    msg.set_content(body)
    msg_date = datetime.datetime.now().strftime("%d-%b-%Y %H:%M:%S")

    with imaplib.IMAP4_SSL(IMAP_SERVER) as mail:
        mail.login(EMAIL_ACCOUNT, PASSWORD)
        mail.select("Drafts")
        mail.append("Drafts", '', imaplib.Time2Internaldate(datetime.datetime.now().timestamp()), msg.as_bytes())
        print("Email Draft saved .. !")


subject = "Exciting Job Opportunity: Marketing Specialist Position at Creative Corp"
sender = "recruiter@creativecorp.com"
recipient = "applicant@example.com"
body = """\
Dear Applicant,

We are thrilled to announce an opening for a Marketing Specialist at Creative Corp. If you’re passionate about brand-building and engaging with customers through innovative marketing campaigns, this is an opportunity to consider.

Please visit our careers page to learn more about the role, responsibilities, and how to apply. We look forward to receiving your application.

Best regards,
Laura Garcia
Talent Acquisition Manager
Creative Corp
"""
save_draft(subject, sender, recipient, body)