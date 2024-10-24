from dotenv import load_dotenv
from datetime import datetime
import os, imaplib, email, ollama, json, sqlite3
from email.header import decode_header
from email.utils import parsedate_to_datetime


class GmailSummary:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.imap = imaplib.IMAP4_SSL("imap.gmail.com", 993)


    ######## """Format the date to DD-MMM-YYYY.""" ###########   
    def DateTimeFormat(self, formattedDate):
        self.formattedDate = formattedDate.strftime("%d-%b-%Y")
        # print("Today's date:", self.formattedDate)
        return self.formattedDate
    
    
    ######### """Login to the email account.""" ##############
    def Login(self):
        try:
            self.imap.login(self.username, self.password)
            # print("Logged in successfully!")
        except imaplib.IMAP4.error as e:
            print(f"An error occurred: {e}")


    ####### """Retrieve emails received today.""" ############
    def getTodaysEmail(self):
        dateTime = datetime.now()

        # Select the inbox
        self.imap.select("inbox")

        # Specify the date in DD-MMM-YYYY format (e.g., 17-Oct-2024)
        search_date = self.DateTimeFormat(dateTime)

        # Search emails received on or after this date
        status, messages = self.imap.search(None, f'SINCE {search_date}')
        # messages --> an array that contains binary id of each email in the inbox in a single string 
        # eg. [b'abcd efgh ijkl mnop qrst']

        # Get the list of email IDs returned by the search
        email_ids = messages[0].split()

        # print(f"Found {len(email_ids)} emails since {search_date}")
        # print(email_ids)
        return email_ids
    

    ########## """Fetch details of a single email.""" ################
    def SingleEmailDetails(self, email_id):
        history_Element = {}

        # Fetch each email by ID
        status, msg_data = self.imap.fetch(email_id, "(RFC822)")

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
                    history_Element["body"] = body

                    split_gmail = body.split(" ")
                    # print("Body:", body)
                    # conversation_history.append(history_Element)
                    
                    break
                except:
                    pass
        return history_Element
    
    def generateResponse(self):
        con = sqlite3.connect("TodaysEmail.db")
        cur = con.cursor()
        cur.execute("SELECT * FROM emails")
        r = cur.fetchall()
        dict_from_tuples = {t[0]: {"Sender_Name": t[1], "Sender_Email": t[2], "Subject": t[3], "Response": t[4]} for t in r}

        # print(dict_from_tuples)

        Emails = self.getTodaysEmail()
        conversation_history = []

        API_DATA = {}
        
        for email_id in Emails:

            if "Email_"+str(email_id) in dict_from_tuples:
                # print("Email_"+str(email_id), "already exists")
                continue
        
            details = self.SingleEmailDetails(email_id)
            # API_DATA.update({"Email "+str(email_id) : {}})
            
            prompt = f"Generate a short summary for : {details}" 

            # print("#"*150)
            # print("\n\n\n")
            # print("Sender Name   : ",details['sender_name'])
            # print("Sender Email  : ",details['sender_email'])
            # print("Subject       : ",details['subject'])
            # print("Summary       : \n")
            # API_DATA.update({"Email_"+str(email_id) : {
            #     "Sender_Name":details['sender_name'],
            #     "Sender_Email":details['sender_email'],
            #     "Subject":details['subject']
            # }})

            conversation_history.append({
                'role' : 'user',
                'content' : prompt,
            })

            response = ollama.chat(
                model = 'llama3.2', 
                stream = True,
                messages = conversation_history
            )

            response_content = ""

            # print("\n #############\n Printing summary \n#############\n")
            for chunk in response:
                response_content += chunk['message']['content']
                # print(chunk['message']['content'], end='', flush=True)

            API_DATA.update({"Email_"+str(email_id) : {
                "Sender_Name":details['sender_name'],
                "Sender_Email":details['sender_email'],
                "Subject":details['subject'],
                "Response":response_content
            }})
            
                
            conversation_history.append({
                'role':'user',
                'content': response_content
            })

            # print("\n\n\n")
            # for key, value in API_DATA.items():
            #     print(key," : ", value, end="\n\n")
            
        con.close()
        return API_DATA


if __name__ == '__main__':

    load_dotenv()
    username = os.getenv("EMAIL_USER")
    password = os.getenv("EMAIL_PASS")

    obj = GmailSummary(username, password)
    obj.Login()
    APP_DATA = obj.generateResponse()  
    # print(json.dumps(APP_DATA))

    con = sqlite3.connect("TodaysEmail.db")
    cur = con.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS emails(id, Sender_Name, Sender_Email, Subject, Response)")

    # APP_DATA =  {
    #         "Email_b'5025'": 
    #             {
    #                 "Sender_Name": "Highire Manpower Services", 
    #                 "Sender_Email": "vacancy@openings.shine.com", 
    #                 "Subject": "Urgent Hiring for Front End Developer at Freelancer", 
    #                 "Response": "Here is a short summary:\n\n\"Urgent hiring for Front End Developer at Freelancer. Job posting from Highire Manpower Services (vacancy@openings.shine.com) on October 21, 2024.\""
    #             }, 

    #         "Email_b'5026'": 
    #             {
    #                 "Sender_Name": "", 
    #                 "Sender_Email": "olivia@mail.nanonets.com", 
    #                 "Subject": "Curious About Nanonets? ", 
    #                 "Response": "Here is a short summary:\n\n\"Job inquiry about Nanonets from Olivia (olivia@mail.nanonets.com) on October 21, 2024.\""
    #             }
    #         }
    
    id = ''
    Sender_Name = ''
    Sender_Email = ''
    Subject = ''
    Response = ''
    
    for key, values in APP_DATA.items():
        # print(key , ": ")
        id = key
        cur.execute("SELECT * FROM emails WHERE id = ?", (id,))
        res = cur.fetchone()
        # print("response :::::", res)
        if res is None:
            cur.execute("INSERT INTO emails (id) VALUES (?)", (id,))
            # print("ID inserted successfully..")
        else:
            # print("ID already exists")
            continue
        
        
        for k, v in values.items():
            # print(k, ": ", v)
            

            if k == "Sender_Name":
                Sender_Name = v
            if k == "Sender_Email":
                Sender_Email = v
            if k == "Subject":
                Subject = v
            if k == "Response":
                Response = v

            cur.execute("UPDATE emails SET Sender_Name=? , Sender_Email=? , Subject=? , Response=? WHERE id=? ", (Sender_Name, Sender_Email, Subject, Response, id))
            # print("Emal updated successfuly \n\n")

    # print("##############")
    cur.execute("SELECT * FROM emails")
    r = cur.fetchall()
    # print(r)
    r = r[::-1]
    dict_from_tuples = {t[0]: {"Sender_Name": t[1], "Sender_Email": t[2], "Subject": t[3], "Response": t[4]} for t in r}
    json_string = json.dumps(dict_from_tuples)
    print(json_string)
        

    con.commit()
    con.close()

    # print("###############################")
    # print(id)
    # print(Sender_Name)
    # print(Sender_Email)
    # print(Subject)
    # print(Response)


    

    # obj = GmailSummary("sahiljadhav25009@gmail.com", "owhx qsgn dmrc fbxi")
    
    
    # print(response)
    
    # print(json.dumps(response))
    
    # load_dotenv()
    # username = os.getenv("EMAIL_USER")
    # password = os.getenv("EMAIL_PASS")

    # # obj = GmailSummary("sahiljadhav25009@gmail.com", "owhx qsgn dmrc fbxi")
    # obj = GmailSummary(username, password)
    # obj.Login()

    # Emails = obj.getTodaysEmail()
    # conversation_history = []

    # API_DATA = {}
    
    # for email_id in Emails:
       
    #     details = obj.SingleEmailDetails()
    #     API_DATA.update({"Email "+str(email_id) : {}})
        
    #     prompt = f"Generate a short summary for : {details}" 

    #     print("#"*150)
    #     print("\n\n\n")
    #     print("Sender Name   : ",details['sender_name'])
    #     print("Sender Email  : ",details['sender_email'])
    #     print("Subject       : ",details['subject'])
    #     print("Summary       : \n")
    #     API_DATA.update({"Email "+str(email_id) : {
    #         "Sender_Name":details['sender_name'],
    #         "Sender_Email":details['sender_email'],
    #         "Subject":details['subject']
    #     }})

    #     conversation_history.append({
    #         'role' : 'user',
    #         'content' : prompt,
    #     })

    #     response = ollama.chat(
    #         model = 'llama3', 
    #         stream = True,
    #         messages = conversation_history
    #     )

    #     response_content = ""

    #     for chunk in response:
    #         response_content += chunk['message']['content']
    #         print(chunk['message']['content'], end='', flush=True)

    #     API_DATA.update({"Email "+str(email_id) : {
    #         "Sender_Name":details['sender_name'],
    #         "Sender_Email":details['sender_email'],
    #         "Subject":details['subject'],
    #         "Response":response_content
    #     }})
    #     print("\n\n")
    #     for key, value in API_DATA.items():
    #         print(key," : ", value, end="\n")
            
    #     conversation_history.append({
    #         'role':'user',
    #         'content': response_content
    #     })
    # for i in conversation_history:
    #     print(i.items(), "\n")



    
    
    


    

    

