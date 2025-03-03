import imaplib
import email
from email.header import decode_header

# Login credentials
username = ""
password = ""

# Connect to the IMAP server
imap = imaplib.IMAP4_SSL("imap.gmail.com")

Emails = {}

try:
    # Login to your email account
    imap.login(username, password)

    # Select the mailbox you want to read from
    imap.select("inbox")

    # Search for all emails in the inbox
    status, messages = imap.search(None, "ALL")

    # List of email IDs in the inbox
    email_ids = messages[0].split()

    # Fetch the most recent email (last one)
    latest_email_id = email_ids[-1]

    # Fetch the email content
    status, msg_data = imap.fetch(latest_email_id, "(RFC822)")

    # Parse the email content
    msg = email.message_from_bytes(msg_data[0][1])

    # Decode the email subject
    subject, encoding = decode_header(msg["Subject"])[0]
    if isinstance(subject, bytes):
        subject = subject.decode(encoding if encoding else "utf-8")

    # Print the subject
    print("Subject:", subject)
    
    from_header = msg["From"]
    sender_name, sender_email = email.utils.parseaddr(from_header)

    print(f"Sender Name: {sender_name}")
    print(f"Sender Email: {sender_email}")
    
    
    from_header = msg["cc"]
    cc, cc_email = email.utils.parseaddr(from_header)

    # print(f"cc: {cc}")
    # %%
    print(f"cc Email: {cc_email}")
    # %%
    # Check if the email has multiple parts
    if msg.is_multipart():
        for part in msg.walk():
            # Extract content type
            content_type = part.get_content_type()
            content_disposition = str(part.get("Content-Disposition"))

            try:
                # Get the email body
                body = part.get_payload(decode=True).decode()
                split_gmail = body.split(" ")
                print("Body:", body)
                break
            except:
                pass

    # Logout from the email server
    imap.logout()

except Exception as e:
    print("An error occurred:", e)
