"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Settings, X, User, Bot, Plus, MessageSquare, Trash2, Menu, PanelLeftClose, PanelLeft, Paperclip, Image, FileText, Mic, ChevronDown, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

interface ChatSettings {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
}

export default function Page() {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Welcome Chat",
      messages: [
        {
          id: "1",
          role: "assistant",
          content: "Hello! I'm Nova, your AI assistant. How can I help you today?",
        },
      ],
      createdAt: new Date(),
    },
  ]);
  const [activeSessionId, setActiveSessionId] = useState("1");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [settings, setSettings] = useState<ChatSettings>({
    model: "nova-1",
    temperature: 0.7,
    maxTokens: 2048,
    systemPrompt: "You are Nova, a helpful and friendly AI assistant.",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const messages = activeSession?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !activeSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeSessionId
          ? { ...session, messages: [...session.messages, userMessage] }
          : session
      )
    );
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "That's a great question! Let me think about that...",
        "I'd be happy to help you with that. Here's what I think...",
        "Interesting! Based on my understanding, I would suggest...",
        "Thanks for sharing that. Here's my perspective...",
      ];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
      };
      setSessions((prev) =>
        prev.map((session) =>
          session.id === activeSessionId
            ? { ...session, messages: [...session.messages, aiMessage] }
            : session
        )
      );
      setIsTyping(false);
    }, 1500);
  };

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: `New Chat ${sessions.length + 1}`,
      messages: [
        {
          id: "1",
          role: "assistant",
          content: "Hello! I'm Nova, your AI assistant. How can I help you today?",
        },
      ],
      createdAt: new Date(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setSidebarOpen(false);
  };

  const deleteSession = (sessionId: string) => {
    if (sessions.length === 1) return;
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      setActiveSessionId(sessions[0].id === sessionId ? sessions[1].id : sessions[0].id);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/10">
        <Button
          onClick={createNewChat}
          className="w-full bg-gradient-to-r from-[#a855f7] to-[#00d9ff] text-white hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`group flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all ${
                session.id === activeSessionId
                  ? "bg-white/10 border border-[#a855f7]/50"
                  : "hover:bg-white/5"
              }`}
              onClick={() => {
                setActiveSessionId(session.id);
                setSidebarOpen(false);
              }}
            >
              <MessageSquare className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-300 truncate flex-1">{session.title}</span>
              {sessions.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 h-6 w-6 text-gray-400 hover:text-red-400 hover:bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSession(session.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0E27] flex">
      {/* Desktop Sidebar */}
      <div 
        className={`hidden md:flex border-r border-white/10 bg-[#0f1419] flex-col transition-all duration-300 ease-in-out overflow-hidden ${
          desktopSidebarOpen ? "w-64 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <div className="w-64 h-full flex flex-col">
          <SidebarContent />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Menu */}
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden text-gray-400 hover:text-white hover:bg-white/10">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 bg-[#0f1419] border-white/10">
                  <SheetHeader className="p-4 border-b border-white/10">
                    <SheetTitle className="text-white">Chat History</SheetTitle>
                  </SheetHeader>
                  <SidebarContent />
                </SheetContent>
              </Sheet>

              {/* Desktop Sidebar Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
                className="hidden md:flex text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {desktopSidebarOpen ? (
                  <PanelLeftClose className="w-5 h-5 transition-transform duration-200" />
                ) : (
                  <PanelLeft className="w-5 h-5 transition-transform duration-200" />
                )}
              </Button>

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#00d9ff] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Nova AI
                </h1>
                <p className="text-xs text-gray-400">Online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(true)}
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#00d9ff] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-[#a855f7] to-[#00d9ff] rounded-br-md"
                      : "bg-white/10 rounded-bl-md"
                  }`}
                >
                  <p
                    className={`text-sm ${message.role === "user" ? "text-white" : "text-gray-300"}`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {message.content}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#00d9ff] flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-white/10 bg-[#0f1419]/80 backdrop-blur-xl p-4">
          <div className="max-w-4xl mx-auto">
            {/* Input Container - Lovable Style */}
            <div className="bg-[#1a1f2e] rounded-2xl border border-white/10 p-2">
              {/* Input Row */}
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask Nova to help you with..."
                  className="flex-1 bg-transparent border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                />
              </div>
              
              {/* Action Buttons Row */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                <div className="flex items-center gap-1">
                  {/* Plus Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    title="More options"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  
                  {/* Attach Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all gap-2"
                    title="Attach file"
                  >
                    <Paperclip className="w-4 h-4" />
                    <span className="text-xs">Attach</span>
                  </Button>
                  
                  {/* Theme/Mode Dropdown */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all gap-2"
                    title="Select mode"
                  >
                    <Image className="w-4 h-4" />
                    <span className="text-xs">Theme</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-1">
                  {/* Chat Mode Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 rounded-lg bg-white/10 text-white hover:bg-white/15 transition-all gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs">Chat</span>
                  </Button>
                  
                  {/* Voice Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    title="Voice input"
                  >
                    <AudioLines className="w-4 h-4" />
                  </Button>
                  
                  {/* Send Button */}
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    size="icon"
                    className="h-8 w-8 rounded-lg bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:bg-white/20 disabled:text-gray-500 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="bg-[#0f1419] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Settings
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Configure your AI assistant preferences
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Model Selection */}
            <div className="space-y-2">
              <Label className="text-gray-300">Model</Label>
              <Select value={settings.model} onValueChange={(value) => setSettings({ ...settings, model: value })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f1419] border-white/10">
                  <SelectItem value="nova-1" className="text-white hover:bg-white/10">Nova 1 (Default)</SelectItem>
                  <SelectItem value="nova-2" className="text-white hover:bg-white/10">Nova 2 (Advanced)</SelectItem>
                  <SelectItem value="nova-fast" className="text-white hover:bg-white/10">Nova Fast</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Temperature */}
            <div className="space-y-2">
              <Label className="text-gray-300">Temperature: {settings.temperature}</Label>
              <Slider
                value={[settings.temperature]}
                onValueChange={(value) => setSettings({ ...settings, temperature: value[0] })}
                min={0}
                max={1}
                step={0.1}
                className="[&_[role=slider]]:bg-[#a855f7]"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>

            {/* Max Tokens */}
            <div className="space-y-2">
              <Label className="text-gray-300">Max Tokens</Label>
              <Input
                type="number"
                value={settings.maxTokens}
                onChange={(e) => setSettings({ ...settings, maxTokens: parseInt(e.target.value) })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            {/* System Prompt */}
            <div className="space-y-2">
              <Label className="text-gray-300">System Prompt</Label>
              <Textarea
                value={settings.systemPrompt}
                onChange={(e) => setSettings({ ...settings, systemPrompt: e.target.value })}
                rows={3}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 resize-none"
              />
            </div>
          </div>
          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setShowSettings(false)}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setShowSettings(false)}
              className="bg-gradient-to-r from-[#a855f7] to-[#00d9ff] text-white hover:opacity-90 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
