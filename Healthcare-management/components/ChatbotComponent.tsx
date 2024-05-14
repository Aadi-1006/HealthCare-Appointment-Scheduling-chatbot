'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';


const ChatbotComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add user input to chat history
    setChatHistory((prevChatHistory) => [...prevChatHistory, { role: 'user', message: userInput }]);

    try {
      // Send user input to the Flask server
      const response = await axios.post('http://localhost:5000/chat', { message: userInput });
      const chatbotResponse = response.data.message;

      // Add chatbot response to chat history
      setChatHistory((prevChatHistory) => [...prevChatHistory, { role: 'assistant', message: chatbotResponse }]);
    } catch (error) {
      console.error('Error communicating with the Flask server:', error);
    }

    // Clear the user input field
    setUserInput('');
  };

  return (
    <div>
      {/* <h2>Chatbot</h2> */}
      <div>
        {chatHistory.map((message, index) => (
          <div key={index}>
            <strong>{message.role}:</strong> {message.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <Input type="text" value={userInput} onChange={handleInputChange} />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

export default ChatbotComponent;