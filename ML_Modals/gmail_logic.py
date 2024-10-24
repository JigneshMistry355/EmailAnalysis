import imaplib
import email
from email.header import decode_header
from email.utils import parsedate_to_datetime
from datetime import datetime

now = datetime.now()
formatted_date = now.strftime("%d-%b-%Y")
print("Today's date:", formatted_date)


# Login credentials
username = "sahiljadhav25009@gmail.com"
password = "owhx qsgn dmrc fbxi"

# Connect to Gmail IMAP server
imap = imaplib.IMAP4_SSL("imap.gmail.com", 993)

try:
    # Login to the email account
    imap.login(username, password)
    print("Logged in successfully!")

    # Select the inbox
    imap.select("inbox")

    # Specify the date in DD-MMM-YYYY format (e.g., 17-Oct-2024)
    search_date = formatted_date

    # Search emails received on or after this date
    status, messages = imap.search(None, f'SINCE {search_date}')

    # Get the list of email IDs returned by the search
    email_ids = messages[0].split()

    print(f"Found {len(email_ids)} emails since {search_date}")
    print(email_ids)

    for email_id in email_ids:
        # Fetch each email by ID
        status, msg_data = imap.fetch(email_id, "(RFC822)")

        # Parse the email content
        msg = email.message_from_bytes(msg_data[0][1])

        # Get the email subject
        subject, encoding = decode_header(msg["Subject"])[0]
        if isinstance(subject, bytes):
            subject = subject.decode(encoding if encoding else "utf-8")

        # Get the sender's information
        sender_name, sender_email = email.utils.parseaddr(msg["From"])

        # Get the date and format it
        date_tuple = email.utils.parsedate_tz(msg["Date"])
        email_date = parsedate_to_datetime(msg["Date"]).strftime("%d-%b-%Y %H:%M:%S")

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

        print(f"\nEmail ID: {email_id.decode()}")
        print(f"Date: {email_date}")
        print(f"Subject: {subject}")
        print(f"Sender: {sender_name} <{sender_email}>")
       
        

    # Logout
    imap.logout()
    print(" Logged OUT !!")

except imaplib.IMAP4.error as e:
    print(f"An error occurred: {e}")
