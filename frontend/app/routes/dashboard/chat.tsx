import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  FileText, 
  Lightbulb,
  BookOpen,
  Brain,
  Sparkles,
  Plus,
  History,
  Paperclip
} from "lucide-react";

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hi! I'm your AI study assistant. I can help you with questions about your notes, explain concepts, create study materials, and more. What would you like to study today?",
      timestamp: new Date(Date.now() - 2 * 60 * 1000)
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const availableNotes = [
    { id: '1', title: 'Machine Learning Fundamentals', subject: 'CS 401' },
    { id: '2', title: 'Organic Chemistry Reactions', subject: 'CHEM 301' },
    { id: '3', title: 'European History Timeline', subject: 'HIST 200' },
    { id: '4', title: 'Statistical Analysis Methods', subject: 'STAT 300' },
    { id: '5', title: 'Molecular Biology Concepts', subject: 'BIO 250' }
  ];

  const quickPrompts = [
    { icon: Lightbulb, text: "Explain this concept in simple terms", category: "Explanation" },
    { icon: FileText, text: "Create a summary of my notes", category: "Summary" },
    { icon: Brain, text: "Generate quiz questions", category: "Practice" },
    { icon: BookOpen, text: "Help me understand this topic", category: "Learning" },
    { icon: Sparkles, text: "Create flashcards from this material", category: "Study Tools" }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      type: 'user' as const,
      content: message,
      timestamp: new Date(),
      attachedNotes: selectedNotes.length > 0 ? selectedNotes : undefined
    };

    setChatHistory(prev => [...prev, newUserMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'assistant' as const,
        content: generateAIResponse(message),
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    // Simple response generation for demo
    if (userMessage.toLowerCase().includes('explain')) {
      return "I'd be happy to explain that concept! Based on your notes, let me break this down into simpler terms with relevant examples from your study materials.";
    } else if (userMessage.toLowerCase().includes('quiz') || userMessage.toLowerCase().includes('question')) {
      return "Great idea! Here are some practice questions based on your notes:\n\n1. What are the key differences between supervised and unsupervised learning?\n2. Can you explain the process of backpropagation in neural networks?\n3. How do you evaluate the performance of a machine learning model?\n\nWould you like me to create more questions or explain any of these topics?";
    } else if (userMessage.toLowerCase().includes('summary')) {
      return "Here's a comprehensive summary of your selected notes:\n\n**Key Concepts:**\n• Machine learning algorithms and their applications\n• Statistical methods for data analysis\n• Historical context and timelines\n\n**Important Points:**\n• Understanding the theoretical foundations\n• Practical applications in real-world scenarios\n• Connections between different topics\n\nWould you like me to elaborate on any specific section?";
    } else {
      return "That's an interesting question! Based on your study materials, I can help you understand this topic better. Could you provide more specific details about what you'd like to focus on?";
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setMessage(prompt);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Study Assistant</h1>
        <p className="text-gray-600">Ask questions about your notes and get instant help with your studies</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Available Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Select Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {availableNotes.map((note) => (
                <div
                  key={note.id}
                  className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                    selectedNotes.includes(note.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedNotes(prev =>
                      prev.includes(note.id)
                        ? prev.filter(id => id !== note.id)
                        : [...prev, note.id]
                    );
                  }}
                >
                  <div className="font-medium text-sm">{note.title}</div>
                  <div className="text-xs text-gray-500">{note.subject}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Prompts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs h-auto py-2"
                  onClick={() => handleQuickPrompt(prompt.text)}
                >
                  <prompt.icon className="w-3 h-3 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">{prompt.category}</div>
                    <div className="text-gray-500">{prompt.text}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col min-h-0">
          <Card className="flex-1 flex flex-col min-h-0">
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">TurboStudy AI</CardTitle>
                    <CardDescription className="text-sm">
                      {selectedNotes.length > 0 
                        ? `Referencing ${selectedNotes.length} notes`
                        : 'Ready to help with your studies'
                      }
                    </CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <History className="w-4 h-4 mr-2" />
                  History
                </Button>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex space-x-3 max-w-3xl ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.type === 'user' 
                          ? 'bg-gray-200' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-600'
                      }`}>
                        {msg.type === 'user' ? (
                          <User className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      
                      {/* Message Bubble */}
                      <div className={`rounded-lg px-4 py-2 ${
                        msg.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {/* Attached Notes */}
                        {msg.attachedNotes && msg.attachedNotes.length > 0 && (
                          <div className="mb-2 flex flex-wrap gap-1">
                            {msg.attachedNotes.map(noteId => {
                              const note = availableNotes.find(n => n.id === noteId);
                              return note ? (
                                <Badge key={noteId} variant="secondary" className="text-xs">
                                  {note.title}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        )}
                        
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                        <div className={`text-xs mt-1 ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex space-x-3 max-w-3xl">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={selectedNotes.length > 0 
                      ? `Ask about your ${selectedNotes.length} selected notes...`
                      : "Ask me anything about your studies..."
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {selectedNotes.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedNotes.map(noteId => {
                    const note = availableNotes.find(n => n.id === noteId);
                    return note ? (
                      <Badge key={noteId} variant="outline" className="text-xs">
                        <FileText className="w-3 h-3 mr-1" />
                        {note.title}
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
