from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Initialize models
emotion_analyzer = pipeline("text-classification", model="bhadresh-savani/bert-base-uncased-emotion")
intent_classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
# Using DialoGPT for more conversational response generation
llm = pipeline("text-generation", model="gpt2")

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')

    # Analyze emotion
    emotion = emotion_analyzer(user_message)[0]['label']

    # Detect intent from message
    intents = ["ask_symptom", "report_pain", "seek_reassurance", "describe_mood"]
    intent = intent_classifier(user_message, intents)['labels'][0]

    # Create a conversational response without rephrasing the question
    response_prompt = f"Patient:{user_message}"
    response = llm(
        response_prompt,
        max_length=100,        # Allows response length to be flexible and natural
        temperature=0.7,       # Keeps output controlled but natural
        top_p=0.9,             # Helps maintain coherence
        repetition_penalty=1.2 # Discourages repetition
    )[0]['generated_text'].strip()

    # Post-process to remove any residual prompt text
    patient_response = response.replace(response_prompt, '').strip()

    return jsonify({'intent': intent, 'emotion': emotion, 'response': patient_response})

if __name__ == '__main__':
    app.run(debug=True)
