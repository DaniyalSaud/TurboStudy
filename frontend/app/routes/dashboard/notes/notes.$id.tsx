import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router';
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "~/components/ui/resizable";
import { Textarea } from "~/components/ui/textarea";
import Markdown from "react-markdown"
import { 
    Send, 
  Bot, 
  User, 
  FileText, 
  Lightbulb,
  BookOpen,
  Brain,
  Sparkles,
  History,
  Edit3,
  Download
} from "lucide-react";
export default function NotesPage() {
  const { id } = useParams();
  const [noteContent, setNoteContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Chat state
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hi! I'm your AI study assistant. I can help you with questions about this note, explain concepts, create study materials, and more. What would you like to know?",
      timestamp: new Date(Date.now() - 2 * 60 * 1000)
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { icon: Lightbulb, text: "Explain the key concepts in this note", category: "Explanation" },
    { icon: FileText, text: "Create a summary of this note", category: "Summary" },
    { icon: Brain, text: "Generate quiz questions from this content", category: "Practice" },
    { icon: BookOpen, text: "Help me understand this topic better", category: "Learning" },
    { icon: Sparkles, text: "Create flashcards from this material", category: "Study Tools" }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  useEffect(() => {
    // Load note content based on ID
    if (id) {
      setNoteTitle(`Study Notes ${id}`);
      setNoteContent(`# Study Notes ${id}

## Introduction
This is a sample note to demonstrate the resizable layout between notes and chat.

## Key Points
- Point 1: Important concept
- Point 2: Another important concept
- Point 3: Critical information

## Details
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

### Subsection
More detailed information about the topic...`);
    }
  }, [id]);

  const handleSaveNote = () => {
    setLastSaved(new Date());
    setIsEditing(false);
    // Here you would save to your backend
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      type: 'user' as const,
      content: message,
      timestamp: new Date(),
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
      return "I'd be happy to explain the concepts in your note! Based on the content I can see, let me break down the key points with detailed explanations and examples.";
    } else if (userMessage.toLowerCase().includes('quiz') || userMessage.toLowerCase().includes('question')) {
      return "Great idea! Here are some practice questions based on your note:\n\n1. What are the main concepts covered in this study material?\n2. Can you explain the relationship between the key points mentioned?\n3. How would you apply these concepts in a real-world scenario?\n\nWould you like me to create more questions or explain any of these topics?";
    } else if (userMessage.toLowerCase().includes('summary')) {
      return "Here's a comprehensive summary of your note:\n\n**Key Concepts:**\n• Main topics and their significance\n• Important relationships between ideas\n• Critical details to remember\n\n**Study Focus:**\n• Core principles to understand\n• Practical applications\n• Areas that might need more review\n\nWould you like me to elaborate on any specific section?";
    } else {
      return "That's an interesting question about your note! I can help you understand this topic better. Could you provide more specific details about what you'd like to focus on from your study material?";
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
    <div className="h-screen p-4">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Notes Panel - Left Side (60% initial) */}
        <ResizablePanel  defaultSize={60} minSize={50} >
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <CardTitle className="text-lg">{noteTitle}</CardTitle>
                    <CardDescription className="text-sm">
                      {lastSaved ? `Last saved: ${formatTime(lastSaved)}` : 'Not saved'}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 className="w-4 h-4 mr-1" />
                    {isEditing ? 'Preview' : 'Edit'}
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleSaveNote}
                    disabled={!isEditing}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-4 overflow-hidden">
              {isEditing ? (
                <Textarea
                  value={noteContent}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNoteContent(e.target.value)}
                  placeholder="Start writing your notes..."
                  className="w-full h-full resize-none border-none focus:ring-0 font-mono text-sm"
                />
              ) : (
                <div className={`h-full overflow-y-auto prose prose-sm prose-neutral dark:prose-invert max-w-none`}>
                  <Markdown>{noteContent}</Markdown>
                </div>
              )}
            </CardContent>
          </Card>
        </ResizablePanel>

        <ResizableHandle className='opacity-0 rounded-full p-0.5 my-4 mx-1 hover:bg-neutral-700 dark:hover:bg-neutral-500 dark:hover:opacity-100 transition-all' />
 
        {/* Chat Panel - Right Side (40% initial) */}
        <ResizablePanel defaultSize={40} minSize={30}>
          <Card className="h-full flex flex-col">
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
                      Ask questions about your note
                    </CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <History className="w-4 h-4 mr-2" />
                  History
                </Button>
              </div>
            </CardHeader>

            {/* Quick Actions */}
            <div className="border-b p-3">
              <div className="text-xs font-medium text-gray-500 mb-2">Quick Actions</div>
              <div className="flex flex-wrap gap-1">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => handleQuickPrompt(prompt.text)}
                  >
                    <prompt.icon className="w-3 h-3 mr-1" />
                    {prompt.category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex space-x-3 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.type === 'user' 
                          ? 'bg-gray-200' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-600'
                      }`}>
                        {msg.type === 'user' ? (
                          <User className="w-3 h-3 text-gray-600" />
                        ) : (
                          <Bot className="w-3 h-3 text-white" />
                        )}
                      </div>
                      
                      {/* Message Bubble */}
                      <div className={`rounded-lg px-3 py-2 text-sm ${
                        msg.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
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
                    <div className="flex space-x-3 max-w-[85%]">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input Area */}
            <div className="border-t p-3">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about your note..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
