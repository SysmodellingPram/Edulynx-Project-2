
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { startAIChat } from '../services/AIchatbox';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hello! I'm your Edulynx AI Advisor. How can I help you with your study abroad plans today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    const systemPrompt = "You are Edulynx AI, a specialized study abroad consultant. Help students find universities, understand visa requirements, compare programs, and provide tips for SOPs and LORs. Be professional, encouraging, and informative.";
    chatRef.current = startAIChat(systemPrompt);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      if (chatRef.current) {
        const result = await chatRef.current.sendMessage({ message: input });
        const aiMsg: ChatMessage = { 
          role: 'model', 
          content: result.text || "I'm sorry, I couldn't process that.", 
          timestamp: new Date() 
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "Oops! I ran into an error. Please try again later.", 
        timestamp: new Date() 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] bg-white rounded-xl border border-[#E5E7EB] shadow-sm m-4 overflow-hidden">
      <header className="p-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#2563EB]">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.53 4.47a1 1 0 10-1.42 1.44 6.001 6.001 0 009.9 0 1 1 0 00-1.42-1.44 4 4 0 01-7.06 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-[#1F2937]">Edulynx AI Advisor</h3>
            <span className="text-xs text-green-500 font-medium">Online • 24/7 Support</span>
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F9FAFB]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-[#2563EB] text-white rounded-tr-none' 
                : 'bg-white text-[#1F2937] border border-[#E5E7EB] rounded-tl-none shadow-sm'
            }`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              <span className={`text-[10px] mt-2 block ${msg.role === 'user' ? 'text-blue-100' : 'text-[#4B5563]'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl rounded-tl-none p-4 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#4B5563] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#4B5563] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-[#4B5563] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-[#E5E7EB]">
        <div className="flex items-center space-x-2 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-1 px-4">
          <input
            type="text"
            placeholder="Ask about universities, documents, or visa help..."
            className="flex-1 bg-transparent py-3 focus:outline-none text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
