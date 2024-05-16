"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { SendHorizontalIcon } from "lucide-react";
import CopyToClipboard from "./ui/copy-to-clipboard";
import { toast } from "./ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  role: "user" | "assistant";
  message: string;
}

const ChatbotComponent: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const ref = useRef<HTMLDivElement>(null);

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
        "http://localhost:4501/chat",
        { message: userInput }
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

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [chatHistory]);

  return (
    <section className="py-24 text-zinc-700">
      <div className="container max-w-3xl">
        <div className="mx-auto flex max-w-lg items-center justify-between px-1">
          <h1 className="font-serif text-2xl font-medium">AI Doctor Chatbot</h1>
        </div>

        <div className="mx-auto mt-3 w-full max-w-lg">
          <ScrollArea
            className="mb-2 h-[400px] rounded-md border p-4"
            ref={ref}
          >
            {chatHistory.map((m, index) => (
              <div key={index} className="mr-6 whitespace-pre-wrap md:mr-12">
                {m.role === "user" && (
                  <div className="mb-6 flex gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="text-sm">U</AvatarFallback>
                    </Avatar>
                    <div className="mt-1.5">
                      <p className="font-semibold">You</p>
                      <div className="mt-1.5 text-sm text-zinc-500">
                        {m.message}
                      </div>
                    </div>
                  </div>
                )}

                {m.role === "assistant" && (
                  <div className="mb-6 flex gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-blue-700 text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-1.5 w-full">
                      <div className="flex justify-between">
                        <p className="font-semibold">Bot</p>
                        <CopyToClipboard message={m} className="-mt-1" />
                      </div>
                      <div className="mt-2 text-sm text-zinc-500">
                        {m.message}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>

          <form onSubmit={handleSubmit} className="relative">
            <Input
              name="message"
              value={userInput}
              onChange={handleInputChange}
              placeholder={"Ask me anything..."}
              className="pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500"
            />
            <Button
              size="icon"
              type="submit"
              variant="secondary"
              className="absolute right-1 top-1 h-8 w-10"
            >
              <SendHorizontalIcon className="h-5 w-5 text-blue-700" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChatbotComponent;