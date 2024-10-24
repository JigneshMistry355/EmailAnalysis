import ollama
# from test_2 import body

conversation_history = []

while True:

    prompt = input("\n\nEnter your prompt....\n\n")

    conversation_history.append({
        'role' : 'user',
        'content' : prompt,
    })

    response = ollama.chat(
        model = 'llama3', 
        stream = True,
        messages = conversation_history
    )

    response_content = ""

    for chunk in response:
        response_content += chunk['message']['content']
        print(chunk['message']['content'], end='', flush=True)

    conversation_history.append({
        'role':'user',
        'content': response_content
    })