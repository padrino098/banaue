
import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';
import { Message } from '../types';

const BookingAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Mabuhay! Welcome to the Banaue Rice Terraces. How can I assist you with your stay today? 🌄' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getChatResponse(messages, input);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting. Please try calling us instead!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Chat window */}
      <div className={`transition-all duration-300 ease-in-out transform ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'} absolute bottom-20 right-0 w-[90vw] sm:w-[350px] max-h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-stone-200 overflow-hidden`}>
        {/* Header */}
        <div className="bg-green-800 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-800">
              <i className="fa-solid fa-robot text-sm"></i>
            </div>
            <div>
              <h4 className="font-bold text-sm">Terrace Assistant</h4>
              <span className="text-[10px] opacity-80 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                Always available
              </span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:text-green-200">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-stone-50 min-h-[300px]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none shadow-sm'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-stone-200 shadow-sm flex space-x-1">
                <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-stone-100 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-grow bg-stone-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="w-10 h-10 bg-green-800 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <i className="fa-solid fa-paper-plane text-xs"></i>
          </button>
        </div>
      </div>

      {/* Toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-green-800 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce-slow"
      >
        <div className="relative">
          <i className={`fa-solid ${isOpen ? 'fa-message' : 'fa-comments'} text-2xl`}></i>
          {!isOpen && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>}
        </div>
      </button>
    </div>
  );
};

export default BookingAssistant;
