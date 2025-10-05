"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Code,
  BookOpen,
  Plus,
  Sparkles,
  MoreHorizontal,
  Search,
  Settings,
  Trash2,
  Clock,
  Zap,
  Brain,
  Image,
  Mic,
  MicOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

const AiPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedMode, setSelectedMode] = useState<
    "general" | "coding" | "study"
  >("general");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatHistory] = useState<ChatHistory[]>([
    {
      id: "1",
      title: "Project Architecture Discussion",
      lastMessage: "How to structure a React application?",
      timestamp: new Date(Date.now() - 3600000),
      messageCount: 15,
    },
    {
      id: "2",
      title: "API Integration Help",
      lastMessage: "Best practices for API calls in Next.js",
      timestamp: new Date(Date.now() - 7200000),
      messageCount: 8,
    },
    {
      id: "3",
      title: "Database Design",
      lastMessage: "PostgreSQL vs MongoDB for my project",
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 23,
    },
    {
      id: "4",
      title: "Study Plan Creation",
      lastMessage: "Create a 30-day JavaScript learning plan",
      timestamp: new Date(Date.now() - 172800000),
      messageCount: 12,
    },
    {
      id: "5",
      title: "Code Review",
      lastMessage: "Review my authentication system",
      timestamp: new Date(Date.now() - 259200000),
      messageCount: 6,
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're asking about "${inputMessage}". Let me help you with that! This is a simulated response that would come from your AI model.`,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getModeConfig = () => {
    switch (selectedMode) {
      case "coding":
        return {
          icon: Code,
          color: "from-green-500 to-emerald-600",
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/30",
          textColor: "text-green-400",
        };
      case "study":
        return {
          icon: BookOpen,
          color: "from-blue-500 to-cyan-600",
          bgColor: "bg-blue-500/10",
          borderColor: "border-blue-500/30",
          textColor: "text-blue-400",
        };
      default:
        return {
          icon: Sparkles,
          color: "from-purple-500 to-pink-600",
          bgColor: "bg-purple-500/10",
          borderColor: "border-purple-500/30",
          textColor: "text-purple-400",
        };
    }
  };

  const modeConfig = getModeConfig();

  return (
    <div className="h-[900px] bg-primary flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 bg-secondary backdrop-blur-xl border-r border-tertiary flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-tertiary">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AI Assistant</h2>
              <p className="text-sm text-gray-400">Powered by GPT-4</p>
            </div>
          </div>

          <Button className="w-full shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-secondary">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg pl-10 pr-4 py-2 
                       text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 
                       focus:ring-1 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-400">
              Recent Chats
            </span>
          </div>

          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className="group p-3 rounded-lg bg-gray-800/30 hover:bg-accent border-secondary 
                       hover:border-gray-600/50 cursor-pointer transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-white truncate flex-1 group-hover:text-blue-300">
                  {chat.title}
                </h4>
                <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-tertiary rounded">
                  <MoreHorizontal className="w-3 h-3 text-gray-400" />
                </button>
              </div>
              <p className="text-xs text-gray-400 truncate mb-2">
                {chat.lastMessage}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {chat.timestamp.toLocaleDateString()}
                </span>
                <Badge
                  variant="outline"
                  className="text-xs text-gray-400 border-gray-600"
                >
                  {chat.messageCount} msgs
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-tertiary">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-gray-600 hover:bg-gray-800"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 hover:bg-gray-800"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Chat Header */}
        <header className="bg-gray-900/30 backdrop-blur-xl border-b border-tertiary p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`p-2 ${modeConfig.bgColor} rounded-xl border ${modeConfig.borderColor}`}
              >
                <modeConfig.icon
                  className={`w-5 h-5 ${modeConfig.textColor}`}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white capitalize">
                  {selectedMode} Assistant
                </h1>
                <p className="text-sm text-gray-400">
                  {selectedMode === "coding"
                    ? "Code with confidence"
                    : selectedMode === "study"
                    ? "Learn and grow"
                    : "Ask me anything"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                className={`${modeConfig.bgColor} ${modeConfig.textColor} border ${modeConfig.borderColor}`}
              >
                <Zap className="w-3 h-3 mr-1" />
                Online
              </Badge>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-2xl rounded-2xl p-4 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                    : "bg-gray-800/50 backdrop-blur-sm border border-tertiary text-gray-100"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.role === "user" ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-tertiary rounded-2xl p-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-gray-900/30 backdrop-blur-xl border-t border-tertiary">
          {/* Mode Selector */}
          <div className="flex gap-2 mb-4">
            {(["general", "coding", "study"] as const).map((mode) => {
              const config =
                mode === "coding"
                  ? { icon: Code, label: "Coding", color: "green" }
                  : mode === "study"
                  ? { icon: BookOpen, label: "Study", color: "blue" }
                  : { icon: Sparkles, label: "General", color: "purple" };

              return (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                    selectedMode === mode
                      ? `bg-${config.color}-500/20 border-${config.color}-500/50 text-${config.color}-400`
                      : "bg-gray-800/30 border-gray-600/50 text-gray-400 hover:bg-tertiary"
                  }`}
                >
                  <config.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{config.label}</span>
                </button>
              );
            })}
          </div>

          {/* Input Box */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-4">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />

            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 hover:bg-tertiary text-gray-300"
                >
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 hover:bg-tertiary text-gray-300"
                >
                  <Image className="w-4 h-4 mr-2" />
                  Image
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 hover:bg-tertiary text-gray-300"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? (
                    <MicOff className="w-4 h-4 mr-2 text-red-400" />
                  ) : (
                    <Mic className="w-4 h-4 mr-2" />
                  )}
                  {isRecording ? "Stop" : "Voice"}
                </Button>
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-blue-800  hover:from-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AiPage;
