"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MessageSquare, Brain, Sparkles, Zap, Bot, User } from "lucide-react";

interface DemoMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  typing?: boolean;
}

function Home() {
  const [displayText, setDisplayText] = useState("");
  const [showCards, setShowCards] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [demoMessages, setDemoMessages] = useState<DemoMessage[]>([]);
  const [demoStep, setDemoStep] = useState(0);
  const fullText = "Meet ROBCHAT AI — Your Intelligent AI Companion";

  const demoConversation: DemoMessage[] = [
    { id: 1, role: "user", content: "Help me write a creative story about space exploration" },
    { id: 2, role: "assistant", content: "I'd love to help! Let's craft an epic tale of humanity's journey to the stars. What era should we set it in - near future or distant?" },
    { id: 3, role: "user", content: "Distant future, with faster-than-light travel" },
    { id: 4, role: "assistant", content: "Perfect! Picture this: The year is 3247. Captain Elena Voss stands on the bridge of the Starweaver, humanity's first vessel capable of folding space itself..." },
  ];

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowCards(true), 300);
        setTimeout(() => setShowCTA(true), 800);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

  // Demo conversation animation
  useEffect(() => {
    if (!showCards || demoStep >= demoConversation.length) return;

    const timer = setTimeout(() => {
      const currentMessage = demoConversation[demoStep];

      // Show typing indicator for assistant messages
      if (currentMessage.role === "assistant") {
        setDemoMessages(prev => [...prev, { ...currentMessage, typing: true }]);
        setTimeout(() => {
          setDemoMessages(prev =>
            prev.map(msg => msg.id === currentMessage.id ? { ...msg, typing: false } : msg)
          );
          setDemoStep(prev => prev + 1);
        }, 1500);
      } else {
        setDemoMessages(prev => [...prev, currentMessage]);
        setDemoStep(prev => prev + 1);
      }
    }, demoStep === 0 ? 500 : 2000);

    return () => clearTimeout(timer);
  }, [showCards, demoStep]);

  const features = [
    {
      icon: MessageSquare,
      title: "Natural Conversations",
      description: "Engage in fluid, human-like dialogue that understands context and nuance.",
    },
    {
      icon: Brain,
      title: "Context Memory",
      description: "ROBCHAT AI remembers your preferences and past conversations for personalized responses.",
    },
    {
      icon: Sparkles,
      title: "Multi-Modal Input",
      description: "Share text, images, and files for comprehensive AI assistance.",
    },
    {
      icon: Zap,
      title: "Smart Suggestions",
      description: "Proactive recommendations that anticipate your needs before you ask.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E27] relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f3a] via-[#0A0E27] to-[#2d1b4e] opacity-80" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#a855f7]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00d9ff]/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>


      {/* Main content */}
      <main className="relative z-10 max-w-[900px] mx-auto px-6 py-20 flex flex-col items-center min-h-screen">
        {/* Hero Section */}
        <div className="text-center mb-20 pt-16">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {displayText}
            <span className="animate-pulse text-[#00d9ff]">|</span>
          </h1>
          <p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Experience the future of AI-powered conversations. Intelligent, intuitive, and always learning.
          </p>
        </div>

        {/* Feature Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-20 transition-all duration-700 ${showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#a855f7]/50 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#00d9ff] flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-shadow">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3
                className="text-xl font-semibold text-white mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-gray-400 text-sm"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Demo Preview */}
        <div
          className={`w-full max-w-2xl mb-16 transition-all duration-700 ${showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
            {/* Window Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#00d9ff] flex items-center justify-center">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-gray-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>ROBCHAT AI Demo</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 min-h-[200px] max-h-[300px] overflow-y-auto">
              {demoMessages.length === 0 && (
                <div className="flex items-center justify-center h-[200px]">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a855f7]/20 to-[#00d9ff]/20 flex items-center justify-center mx-auto mb-3">
                      <MessageSquare className="w-6 h-6 text-[#a855f7]" />
                    </div>
                    <p className="text-gray-500 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      Starting demo conversation...
                    </p>
                  </div>
                </div>
              )}

              {demoMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#00d9ff] flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${message.role === "user"
                        ? "bg-gradient-to-r from-[#a855f7] to-[#00d9ff] rounded-br-md"
                        : "bg-white/10 rounded-bl-md"
                      }`}
                  >
                    {message.typing ? (
                      <div className="flex gap-1 py-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    ) : (
                      <p
                        className={`text-sm ${message.role === "user" ? "text-white" : "text-gray-300"}`}
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {message.content}
                      </p>
                    )}
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Preview */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex gap-3">
                <div className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-500 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Type your message...
                  </p>
                </div>
                <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#a855f7]/50 to-[#00d9ff]/50 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white/50" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div
          className={`transition-all duration-700 ${showCTA ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <Link href="/login">
          <button
            className="px-12 py-4 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#00d9ff] text-white font-semibold text-lg hover:opacity-90 transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] animate-pulse cursor-pointer"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Start Chatting
          </button>
          </Link>
        </div>


      </main>
    </div>
  );
}

export default Home;
