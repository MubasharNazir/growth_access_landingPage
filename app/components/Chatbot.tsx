'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ChatMessage {
  type: 'bot' | 'user';
  message: string;
  timestamp?: Date;
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
}

const botGreetings = [
  "Hello! 👋 Welcome! I'm here to help you get started with our digital solutions. How can I assist you today?",
  "Hi there! Thanks for visiting. I'd love to help you learn more about our services. What brings you here today?",
  "Welcome! 😊 I'm here to help answer your questions about our IT services and digital marketing solutions. How can I help?"
];

const botResponses = {
  greeting: [
    "That's great! Let me collect some information so our team can provide you with the best solution.",
    "Perfect! To get started, I'll need a few details from you.",
    "Wonderful! I'd like to gather some basic information to better assist you."
  ],
  name: [
    "Nice to meet you, {name}! That's a great name. 😊",
    "Pleasure to meet you, {name}!",
    "Hello {name}! Great to connect with you."
  ],
  email: {
    success: [
      "Perfect! Got your email.",
      "Great! Email saved.",
      "Excellent! I've got that."
    ],
    error: [
      "Hmm, that doesn't look like a valid email address. Could you please check and enter it again?",
      "I need a valid email format (like name@example.com). Could you try again?",
      "That email format isn't quite right. Please enter a valid email address."
    ]
  },
  phone: {
    success: [
      "Perfect! I've got all the information I need. Our team will reach out to you within 24 hours to discuss how we can help transform your business.",
      "Excellent! All set. One of our experts will contact you soon to provide personalized recommendations.",
      "Wonderful! We've received your information. Our team will get in touch with you shortly with next steps."
    ],
    error: [
      "I need a valid phone number to reach you. Could you please provide your phone number with area code?",
      "That phone number seems incomplete. Please include your country code and number.",
      "Could you double-check that phone number? I need at least 10 digits."
    ]
  },
  thanks: [
    "Thank you so much, {name}! We're excited to work with you. Have a great day! 🚀",
    "Thanks for your interest, {name}! Our team is looking forward to connecting with you soon.",
    "Much appreciated, {name}! We'll be in touch very soon. Take care!"
  ]
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  const [currentStep, setCurrentStep] = useState<'greeting' | 'name' | 'email' | 'phone' | 'complete'>('greeting');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasStarted) {
      // Initial greeting after opening
      setTimeout(() => {
        const greeting = botGreetings[Math.floor(Math.random() * botGreetings.length)];
        setMessages([{ type: 'bot', message: greeting, timestamp: new Date() }]);
        setHasStarted(true);
      }, 300);
    }
  }, [isOpen, hasStarted]);

  const getRandomResponse = (responses: string[], replacements?: Record<string, string>) => {
    let response = responses[Math.floor(Math.random() * responses.length)];
    if (replacements) {
      Object.keys(replacements).forEach(key => {
        response = response.replace(`{${key}}`, replacements[key]);
      });
    }
    return response;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { type: 'user', message: userMessage, timestamp: new Date() }]);
    setIsLoading(true);
    setInputValue('');

    // Simulate realistic typing delay (500-1200ms)
    const delay = 500 + Math.random() * 700;

    setTimeout(() => {
      setIsLoading(false);

      switch (currentStep) {
        case 'greeting':
          // User responded to greeting, now ask for name
          const greetingResponse = getRandomResponse(botResponses.greeting);
          setMessages(prev => [...prev, { type: 'bot', message: greetingResponse, timestamp: new Date() }]);
          setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', message: "May I start by getting your name?", timestamp: new Date() }]);
          }, 600);
          setCurrentStep('name');
          break;

        case 'name':
          setLeadData({ name: userMessage });
          const nameResponse = getRandomResponse(botResponses.name, { name: userMessage });
          setMessages(prev => [...prev, { type: 'bot', message: nameResponse, timestamp: new Date() }]);
          setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', message: "What's your email address?", timestamp: new Date() }]);
          }, 800);
          setCurrentStep('email');
          break;

        case 'email':
          if (validateEmail(userMessage)) {
            setLeadData({ ...leadData, email: userMessage });
            const emailSuccess = getRandomResponse(botResponses.email.success);
            setMessages(prev => [...prev, { type: 'bot', message: emailSuccess, timestamp: new Date() }]);
            setTimeout(() => {
              setMessages(prev => [...prev, { type: 'bot', message: "And finally, what's your phone number?", timestamp: new Date() }]);
            }, 600);
            setCurrentStep('phone');
          } else {
            const emailError = getRandomResponse(botResponses.email.error);
            setMessages(prev => [...prev, { type: 'bot', message: emailError, timestamp: new Date() }]);
          }
          break;

        case 'phone':
          if (validatePhone(userMessage)) {
            const completeLeadData = { ...leadData, phone: userMessage };
            setLeadData(completeLeadData);
            const phoneSuccess = getRandomResponse(botResponses.phone.success);
            setMessages(prev => [...prev, { type: 'bot', message: phoneSuccess, timestamp: new Date() }]);
            setTimeout(() => {
              const thanks = getRandomResponse(botResponses.thanks, { name: leadData.name || 'there' });
              setMessages(prev => [...prev, { type: 'bot', message: thanks, timestamp: new Date() }]);
            }, 1000);
            setCurrentStep('complete');
            
            // Send data to backend (you can implement API call here)
            console.log('Lead Data Collected:', completeLeadData);
            
            // Here you would typically send to your API
            // fetch('/api/leads', { method: 'POST', body: JSON.stringify(completeLeadData) })
          } else {
            const phoneError = getRandomResponse(botResponses.phone.error);
            setMessages(prev => [...prev, { type: 'bot', message: phoneError, timestamp: new Date() }]);
          }
          break;
      }
    }, delay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRestart = () => {
    setMessages([]);
    setLeadData({});
    setCurrentStep('greeting');
    setInputValue('');
    setHasStarted(false);
    const greeting = botGreetings[Math.floor(Math.random() * botGreetings.length)];
    setTimeout(() => {
      setMessages([{ type: 'bot', message: greeting, timestamp: new Date() }]);
      setHasStarted(true);
    }, 300);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset after closing
    setTimeout(() => {
      setMessages([]);
      setLeadData({});
      setCurrentStep('greeting');
      setInputValue('');
      setHasStarted(false);
    }, 300);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group z-50"
          aria-label="Open chat"
        >
          <svg
            className="w-6 h-6 transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 w-96 h-[600px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-600"></span>
              </div> */}
              <div>
                <Image
                  src="/images/logo.png"
                  alt="Company Logo"
                  width={120}
                  height={30}
                  className="h-7 w-auto brightness-0 invert"
                />
                
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
            {messages.length === 0 && (
              <div className="flex justify-center items-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm text-slate-500">Starting conversation...</p>
                </div>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-sm'
                      : 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-sm shadow-sm border border-slate-100 dark:border-slate-600'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  {msg.timestamp && (
                    <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-white dark:bg-slate-700 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-slate-100 dark:border-slate-600">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 'complete' && (
              <div className="pt-4">
                <button
                  onClick={handleRestart}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                >
                  Start New Conversation
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {currentStep !== 'complete' && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="flex space-x-2">
                <input
                  type={currentStep === 'email' ? 'email' : currentStep === 'phone' ? 'tel' : 'text'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    currentStep === 'greeting'
                      ? 'Type your message...'
                      : currentStep === 'name'
                      ? 'Your name...'
                      : currentStep === 'email'
                      ? 'your.email@example.com'
                      : '+1 (555) 123-4567'
                  }
                  className="flex-1 px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white text-sm"
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
