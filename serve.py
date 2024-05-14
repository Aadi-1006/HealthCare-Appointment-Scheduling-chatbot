from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS library
from bot2 import chat

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/chat', methods=['POST'])
def handle_chat():
    user_input = request.json.get('message')
    chatbot_response = chat(user_input)
    return jsonify({'message': chatbot_response})

if __name__ == '__main__':
    app.run(host='localhost', port=5000)