from transformers import LlamaForSequenceClassification, LlamaTokenizer
import torch, sqlite3, json, ollama

con = sqlite3.connect("TodaysEmail.db")
cur = con.cursor()
response = cur.execute("SELECT Response FROM emails")
response_data = cur.fetchall()
print(json.dumps(response_data))

tokenizer = LlamaTokenizer.from_pretrained('llama3.2')
model = LlamaForSequenceClassification.from_pretrained('llama3.2')

