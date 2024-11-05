import re
import json

# Original string containing the JSON dictionary
text = 'Here is the classification of the response in JSON format:\n\n{"category": "Job Posting"}'

# Regular expression to match JSON-like dictionary structure
json_match = re.search(r'\{.*\}', text)

# Check if a JSON structure was found and parse it
if json_match:
    json_str = json_match.group(0)  # Extract the JSON part as a string
    try:
        # Convert JSON string to a dictionary
        extracted_dict = json.loads(json_str)
        print("Extracted Dictionary:", extracted_dict)
        x = extracted_dict.values()
        print(x)
        for vakue in x:
            print(vakue)
        # print(type(x))
    except json.JSONDecodeError:
        print("Failed to parse JSON.")
else:
    print("No JSON found in the text.")
