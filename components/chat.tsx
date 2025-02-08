"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Mic,
  MicOff,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  User,
} from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// Types
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  sources?: string[];
  timestamp: Date;
}

interface ChatResponse {
  message: string;
  sources: string[];
}

interface ChatMessageProps {
  message: Message;
}

// ChatMessage Component
const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [showSources, setShowSources] = useState(false);

  return (
    <div
      className={`flex gap-4 p-4 message-appear ${
        message.isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex flex-col max-w-[80%] ${
          message.isUser ? "items-end" : "items-start"
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          {message.isUser ? (
            <>
              <span className="text-purple-300">You</span>
              <User className="w-5 h-5 text-purple-300" />
            </>
          ) : (
            <>
              <MessageSquare className="w-5 h-5 text-blue-300" />
              <span className="text-blue-300">AI Assistant</span>
            </>
          )}
        </div>

        <div
          className={`glass-effect rounded-lg p-4 ${
            message.isUser ? "bg-purple-900/30" : "bg-blue-900/30"
          }`}
        >
          <ReactMarkdown className="prose prose-invert">
            {message.content}
          </ReactMarkdown>

          {message.sources && message.sources.length > 0 && (
            <div className="mt-2">
              <button
                onClick={() => setShowSources(!showSources)}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors"
              >
                {showSources ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
                Sources
              </button>

              {showSources && (
                <ul className="mt-2 space-y-1 text-sm text-gray-400">
                  {message.sources.map((source, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                      {source}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <span className="text-xs text-gray-500 mt-1">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [repoUrl, setRepoUrl] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const storedrurl = localStorage.getItem("rurl");

    if (storedrurl) {
      setRepoUrl(storedrurl);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);
    resetTranscript();

    try {
      const response = await axios.post<ChatResponse>(
        "http://localhost:5000/chat",
        {
          message: input,
          reponame: repoUrl,
        }
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.message,
        isUser: false,
        sources: response.data.sources,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, there was an error processing your request.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="rainbow-border h-1"></div>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4">
        <div className="mb-4">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Enter GitHub Repository URL"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 transition-colors pr-12"
              disabled={isLoading}
            />
            {browserSupportsSpeechRecognition && (
              <button
                type="button"
                onClick={toggleListening}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
              >
                {listening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-4 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
