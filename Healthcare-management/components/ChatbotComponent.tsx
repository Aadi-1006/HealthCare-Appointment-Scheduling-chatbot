"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface ChatMessage {
  role: "user" | "assistant";
  message: string;
}

const ChatbotComponent: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add user input to chat history
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { role: "user", message: userInput },
    ]);

    try {
      // Send user input to the Flask server
      const response = await axios.post<{ message: string }>(
        "http://localhost:5000/chat",
        { message: userInput },
      );
      const chatbotResponse = response.data.message;

      // Add chatbot response to chat history
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { role: "assistant", message: chatbotResponse },
      ]);
    } catch (error) {
      console.error("Error communicating with the Flask server:", error);
    }

    // Clear the user input field
    setUserInput("");
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Card>
        <CardHeader>AI Doctor Chatbot</CardHeader>
        <CardContent>
          {chatHistory.map((message, index) => (
            <div key={index}>
              <strong>{message.role}:</strong> {message.message}
            </div>
          ))}
        </CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input type="text" value={userInput} onChange={handleInputChange} />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatbotComponent;

