
import torch, sqlite3, json, ollama

con = sqlite3.connect("TodaysEmail.db")
cur = con.cursor()
response = cur.execute("SELECT Response FROM emails")
response_data = cur.fetchall()
# response_data = json.dumps(response_data)

# print(response_data)
categories = ["Job Posting", "Inquiry", "Newsletter", "Application", "Confirmation", "Other"]
priority = ["urgent" ,"high", "medium", "low"]

prompt = f"Categorize this email summary based on category {categories} in single word \n Summary : {response_data[-2]} \n Also analyze the priority : {priority} \n Response format: \n Category : Your response \n Priority : Your response"

ollama_response = ollama.chat(model="llama3.2", messages=[{
    'role':'user',
    'content':prompt
}]
)
print("#"*140)
print(response_data[-2])
print()
print(ollama_response['message']['content'])
print("#"*140)




# def categorizedEmails(email_summaries):
#     categorized_emails = []
#     for summary in email_summaries:
#         response = ollama.chat(
#             model='llama3.2',
#             messages = f"Categorize the following email summary into one of the categories: {', '.join(categories)}.\n\nEmail Summary: {summary}\n\nCategory:"
#         )
#         category = response['choices'][0]['text'].strip()
#         categorized_emails.append((summary, category))
#     return categorized_emails

# # Categorize the emails
# categorized_emails = categorizedEmails(response_data)

# # Print the categorized emails
# for email, category in categorized_emails:
#     print(f"Email: {email}\nCategory: {category}\n")

# for i in range(len(response_data)):
#     text = response_data[i]
#     print(i)
#     print(response_data[i])
    
#     categories = ["Job Posting", "Inquiry", "Newsletter", "Application", "Confirmation", "Other"]

#     prompt = f"Categorize the emails based on categories {categories}"

#     ollama_response = ollama.chat(
#         model="llama3.2",
#         stream=True,
#         messages=[{"role":"user", "content":prompt}]        
#     )

#     for res in ollama_response:
#         print(res)

#         category = res.get('text', None)


#         print("\n\n\n")
#         print("#"*140)
#         print(f"Email is categorized as {category}")
