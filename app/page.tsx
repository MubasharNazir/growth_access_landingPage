'use client';

import { useState, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import Chatbot from './components/Chatbot';
import emailjs from '@emailjs/browser';
import LogoCloud from '@/components/logo-cloud';
export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    budget: '' // Added budget field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [showCoffeeInvite, setShowCoffeeInvite] = useState(false);
  const [showCoffeePreface, setShowCoffeePreface] = useState(false);
  const [coffeeAnim, setCoffeeAnim] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCoffeePreface(true);
      const openModal = setTimeout(() => {
        setShowCoffeePreface(false);
        setShowCoffeeInvite(true);
      }, 1200);
      return () => clearTimeout(openModal);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showCoffeeInvite) {
      const anim = setTimeout(() => setCoffeeAnim(true), 20);
      return () => clearTimeout(anim);
    } else {
      setCoffeeAnim(false);
    }
  }, [showCoffeeInvite]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const emailBody = `
      <h2>New contact request</h2>
      <p><strong>Name:</strong> ${formData.name || '-'} </p>
      <p><strong>Email:</strong> ${formData.email || '-'} </p>
      <p><strong>Phone:</strong> ${formData.phone || '-'} </p>
      <p><strong>Company:</strong> ${formData.company || '-'} </p>
      <p><strong>Service:</strong> ${formData.service || '-'} </p>
      <p><strong>Budget:</strong> ${formData.budget || '-'} </p>
      <p><strong>Message / Description:</strong><br/>${(formData.message || '-').replace(/\n/g, '<br/>')}</p>
    `;

    const fullMessage = `Name: ${formData.name || '-'}\nEmail: ${formData.email || '-'}\nPhone: ${formData.phone || '-'}\nCompany: ${formData.company || '-'}\nService: ${formData.service || '-'}\nBudget: ${formData.budget || '-'}\n\nDescription:\n${formData.message || '-'}`;

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: formData.service,
      // Send the combined details in the 'message' field so templates using {{message}} receive full info
      message: fullMessage,
      budget: formData.budget,
      // Also send a formatted HTML body so the email contains a single readable block
      email_body: emailBody,
      // common helper for reply-to
      reply_to: formData.email,
      // subject and plain text fallback
      subject: `New contact request from ${formData.name || 'Website Visitor'}`,
      plain_text: fullMessage,
    };

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS environment variables (NEXT_PUBLIC_EMAILJS_*) are not set');
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      console.log('Form submitted and email sent via EmailJS:', templateParams);
      setSubmitStatus('success');

      // Reset form after success
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
        budget: '' // Reset budget
      });

      // Clear success message after a short delay
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('EmailJS send error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 dark:bg-slate-950/80 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                          <div className="flex items-center">
              <Image
                src="/images/ga-marketing.svg"
                alt="Company Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </div>
              <div className="hidden md:flex items-center space-x-8">
                {/* <a href="#services" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Services</a>
                <a href="#automation" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Solutions</a>
                <a href="#contact" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Contact</a> */}
               <a
                 href="https://cal.com/growthaccess/30min"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/30 font-medium"
               >
                 Book Consultation
               </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-20 overflow-hidden">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-purple-950/20 animate-gradient"></div>
          
          {/* Floating Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-400/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          
          <div className="relative max-w-5xl mx-auto text-center w-full z-10 pt-12 md:pt-16 lg:pt-20">
            {/* Badge/Trust Indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hero-animate-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-1xl font-medium text-slate-700 dark:text-slate-300">Every dirham our clients spend turns into measurable returns.</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight hero-animate-1 relative">
              <span className="relative z-10">Websites, Mobile Apps, Digital Marketing, and AI Agents for Smart Automation
              </span>
              <br />
              <span className=" text-2xl relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
              Trusted by 50+ clients - Based in Abu Dhabi.
              </span>
              {/* Glow effect behind text */}
              <span className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 -z-10"></span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-16 md:mb-20 leading-relaxed max-w-3xl mx-auto hero-animate-2">
            Schedule your free strategy call, or let’s grab a coffee at our office and talk ideas. 
            </p>
            
            {/* Key Selling Points */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10 mb-14">
              {[
                "50+ Successful Projects",
                "Since 2021",
                "Proven ROI Results"
              ].map((point, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 group hero-animate-point"
                  style={{ animationDelay: `${500 + idx * 200}ms` }}
                >
                  <div className="relative">
                                          <svg 
                        className="w-5 h-5 text-blue-500 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-600 group-hover:rotate-12" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm md:text-base font-medium text-slate-700 dark:text-slate-300 relative transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {point}
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400/50 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </span>
                </div>
              ))}
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center hero-animate-buttons mb-20">
              <a href="tel:+971554379700" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-lg shadow-lg border-2 border-blue-600 dark:border-blue-500 inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +971 554379700
              </a>
              <a href="#services-web" className="px-8 py-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-900 dark:text-slate-100 rounded-lg font-semibold text-lg border-2 border-slate-300 dark:border-slate-600 inline-block">
                See our work
              </a>
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex flex-col items-center gap-2 hero-animate-buttons">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-600 rounded-full flex items-start justify-center p-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </section>

        <LogoCloud />

        {/* Services: Secure Website Development */}
        <section id="services-web" className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/20 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-center text-3xl md:text-5xl font-semibold text-slate-800 dark:text-slate-100">Secure Website Development</h1>
            <div className="marquee mt-10">
              <div className="marquee-track gap-8 pr-8">
                {[
                  "/images/services/1600w-W3nWsJvGCTw.webp",
                  "/images/services/1600w-Idu8v4LkwTc.webp",
                  "/images/services/teachme.png",
                  "/images/services/Myfinance.png",
                  "/images/services/1280w-uaCKkInLFTI.webp",
                  "/images/services/1600w-CCJSQD2zN68.webp",
                  "/images/services/1600w-u37738GWtDc.webp",
                  "/images/services/1600w-CCJSQD2zN68.webp",
                ].map((src, i) => (
                  <div key={i} className="relative h-64 sm:h-72 md:h-80 w-[360px] sm:w-[440px] md:w-[500px] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-lg">
                    <Image src={src} alt={`Web Showcase ${i+1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services: Result Driven Marketing & Lead Generation */}
        <section id="services-marketing" className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50/20 dark:from-slate-950 dark:to-slate-900">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-center text-3xl md:text-5xl font-semibold text-slate-800 dark:text-slate-100">Result Driven Marketing & Lead Generation</h1>
            <div className="marquee mt-10">
              <div className="marquee-track gap-8 pr-8">
                {[
                  "/images/services/1600w-yqkaOutL7SU.jpg",
                  "/images/services/1600w-IZc7afd0Kr8.webp",
                  "/images/services/1600w-NWp-ZXzvQJA.webp",
                  "/images/services/1600w-UPZ-RNumcAo.webp",
                  "/images/services/1600w-iX5KTFYPY8E.webp",
                  // "/images/services/web-development.jpg",
                  // "/images/services/automation.jpg",
                  // "/images/services/it-services.jpg",
                ].map((src, i) => (
                  <div key={i} className="relative h-64 sm:h-72 md:h-80 w-[360px] sm:w-[440px] md:w-[500px] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-lg">
                    <Image src={src} alt={`Marketing Showcase ${i+1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services: AI & Automation Showcases */}
        <section id="services-automation" className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/20 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-center text-3xl md:text-5xl font-semibold text-slate-800 dark:text-slate-100">AI & Automation Showcases</h1>
            <div className="marquee mt-10">
              <div className="marquee-track gap-8 pr-8">
                {[
                  "/images/services/1600w-Y3V3eyyvtbk.webp",
                  "/images/services/1600w-PQndc6YQK2g.webp",
                  "/images/services/1600w-ekPcGQeub8Y.webp",
                  "/images/services/1600w-DfPc3lcuJ6Q.webp",
                  "/images/services/Properhad-2036x1184x249x0x1578x1184x1702370377.webp",
                  "/images/services/bc321701-017f-4ae5-b208-cc6e04ec7f36-cover.png",
                  "/images/services/dniytaqxu9cpsseeqpi1.jpg",
                  "/images/services/download.png",
                ].map((src, i) => (
                  <div key={i} className="relative h-64 sm:h-72 md:h-80 w-[360px] sm:w-[440px] md:w-[500px] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-lg">
                    <Image src={src} alt={`Automation Showcase ${i+1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        ?


                   {/* Testimonials Section */}
      <section id="testimonials" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-2">
            What our clients say 
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Trusted by 100+ Clients</p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  quote: "Mudassar helped us in designing our website in both English and Arabic. We will take his help again in the near future.",
                  name: "CEO,TRUEZONE",
                  initials: "CM",
                  location: "Abu Dhabi",
                  avatar: "/images/hassan (1).png"
                },
                {
                  quote: "The team we dealt with have been world class, in terms of pricing and delivery, I don't think there's much better out there.",
                  name: "Founder,RENTAL SHIELD",
                  initials: "RS",
                  location: "Abu Dhabi",
                  avatar: "/images/james (1).jpeg"
                },
                {
                  quote: "They provided us with great services in relation to quality assurance. Provided insights and recommendation on the app flow, checked for bugs, mistakes, and any potential risks that might affect the performance of the application.",
                  name: "CEO, MINDTALES",
                  initials: "FA",
                  location: "Abu Dhabi",
                  avatar: "/images/viktorija (1).jpeg"
                },
                {
                  quote: "We needed an extra pair of hands to quickly move a client-specific project forward. Our in-house backend developer teamed up with GrowthAccess as the frontend developer. They worked well together and l appreciate the result",
                  name: "PRESIDENT, LOAN BUFFALO",
                  initials: "OM",
                  location: "Abu Dhabi",
                  avatar: "/images/KC (1).jpeg"
                },
                
              ].slice(testimonialIndex, testimonialIndex + 3).map((testimonial, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-lg p-5 md:p-6 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.885 2.026c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.48 8.72c-.783-.57-.38-1.81.588-1.81H7.53a1 1 0 00.95-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-base md:text-[18px] text-slate-700 dark:text-slate-300 leading-relaxed mb-4 line-clamp-4">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700">
                      {testimonial.avatar ? (
                        <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
                          {testimonial.initials}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-slate-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                type="button"
                onClick={() => setTestimonialIndex((i) => Math.max(0, i - 3))}
                disabled={testimonialIndex === 0}
                aria-label="Previous testimonials"
                className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setTestimonialIndex((i) => Math.min(3, i + 3))}
                disabled={testimonialIndex >= 3}
                aria-label="Next testimonials"
                className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-10 md:p-14 text-center">
            {/* soft gradient wash */}
            <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-gradient-to-br from-blue-500/15 via-indigo-500/15 to-purple-500/15 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-500/10 via-blue-500/10 to-indigo-500/10 blur-3xl"></div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 md:mb-6">
              Ready to <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Transform Your Business</span>?
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of companies already scaling with our AI‑powered automation and growth solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
              <a
                href="https://cal.com/growthaccess/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-base md:text-lg shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                Book Consultation
              </a>
              <a
                href="https://wa.me/+971554379700"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 rounded-lg font-semibold text-base md:text-lg border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-6 text-xs md:text-sm text-slate-500 dark:text-slate-400">
              Secure scheduling via Cal.com • No credit card required
            </div>
          </div>
        </div>
      </section>

       {/* Contact Form Section */}
       <section id="contact" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Decorative gradient wrapper */}
          <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-gradient-to-br from-emerald-50 via-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
            {/* fine diagonal lines */}
            <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="relative px-4 sm:px-8 lg:px-12 py-12 md:py-16">
              <div className="text-center mb-10 md:mb-12">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-3">Get a quote</h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
                  We are here to help you get onboard with strong presence in the UAE market.
                </p>
              </div>

              {/* Card */}
              <div className="mx-auto max-w-2xl">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl border border-slate-200 dark:border-slate-700 pb-28 md:pb-0 relative z-10">
                  <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-6 md:mb-8">
                    <div>
                      <label htmlFor="name" className="block text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 md:py-3 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-0 dark:focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 md:py-3 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-all text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-6 md:mb-8">
                    <div>
                      <label htmlFor="phone" className="block text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3.5 py-2.5 md:py-3 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your Company"
                        className="w-full px-3.5 py-2.5 md:py-3 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-all text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6 md:mb-8">
                    <label htmlFor="service" className="block text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Service Interest *
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full appearance-none pr-10 px-3.5 py-2.5 md:py-3 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-all text-sm"
                      >
                        <option value="">Select a service...</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="it-services">IT Services</option>
                        <option value="automation">AI & Automation</option>
                        <option value="web-development">Web Development</option>
                        <option value="app-development">Mobile App Development</option>
                        <option value="ui-ux-design">UI/UX Design</option>
                        <option value="consulting">IT Consulting</option>
                        <option value="erp-crm">ERP & CRM Solutions</option>
                        <option value="cloud-solutions">Cloud Solutions</option>
                        <option value="devops">DevOps & Infrastructure</option>

                        <option value="analytics">Analytics & Insights</option>
                        <option value="cybersecurity">Cybersecurity</option>
                        <option value="other">Other</option>
                      </select>
                      {/* Chevron Icon */}
                      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 11.92 1.18l-4.25 3.37a.75.75 0 01-.92 0L5.21 8.39a.75.75 0 01.02-1.18z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="mb-6 md:mb-8">
                    <label htmlFor="message" className="block text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project and how we can help..."
                      className="w-full px-3.5 py-2.5 md:py-3 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-all resize-none text-sm"
                    ></textarea>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-[12px] text-slate-500 dark:text-slate-400 text-center">
                    By submitting this form, you agree to our privacy policy. We’ll never share your information.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>



        {/* Footer */}
        <footer className="border-t border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900 text-slate-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="grid gap-10 md:grid-cols-3">
              {/* Brand */}
              <div>
                <div className="flex items-center mb-5">
                  <Image src="/images/logo.png" alt="Company Logo" width={150} height={40} className="h-9 w-auto brightness-0 invert" />
                </div>
                <p className="text-slate-400">
                  Empowering businesses with digital innovation and automation excellence.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-white font-semibold mb-4">Contact</h3>
                <ul className="space-y-3">
                  <li className="text-slate-400">Office # 308 Majid Al Futtaim Building, near Abu Dhabi Mall, Abu Dhabi, United Arab Emirates.</li>
                  <li>
                    <a href="https://wa.me/+971 554379700" className="hover:text-blue-400 transition-colors">Phone/WhatsApp: +971 554379700</a>
                  </li>
                  <li>
                    <a href="mailto:sales@growthaccess.ae" className="hover:text-blue-400 transition-colors">Email: sales@growthaccess.ae</a>
                  </li>
                  <li>
                    <a href="https://maps.google.com/?q=Majid%20Al%20Futtaim%20Building%20Abu%20Dhabi%20Mall" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:underline">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/></svg>
                      Find us on Google Map
                    </a>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {[
                    { label: 'Services', href: '#services' },
                    { label: 'Automation', href: '#automation' },
                    { label: 'Contact', href: '#contact' },
                  ].map((l, i) => (
                    <li key={i}><a href={l.href} className="hover:text-blue-400 transition-colors">{l.label}</a></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-500">© 2025 GrowthAccess Technologies, Abu Dhabi, UAE.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Timed Coffee Invitation Popup */}
      {showCoffeePreface && (
        <div className="fixed inset-0 z-[59] pointer-events-none flex items-end justify-center p-6">
          <div className="pointer-events-auto bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-full px-5 py-2 shadow-lg hero-animate-1">
            Sorry to interrupt you — quick invite!
          </div>
        </div>
      )}

      {showCoffeeInvite && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCoffeeInvite(false)} />

          {/* Modal */}
          <div className={`relative z-[61] max-w-3xl w-[92%] md:w-[860px] rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl transform transition-all duration-300 ease-out ${coffeeAnim ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-3'}`}>
            <button
              aria-label="Close invitation"
              onClick={() => setShowCoffeeInvite(false)}
              className="absolute top-3.5 right-3.5 w-9 h-9 rounded-lg bg-white/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            <div className="grid md:grid-cols-2">
              {/* Visual */}
              <div className="relative h-56 md:h-full">
                <Image src="/images/Mubashar_Nazir_A_photorealistic_image_of_two_diverse_business_professionals,_a_w_1c324658-a0ff-498e-81de-91ff275795f0.jpg" alt="Coffee invitation" fill className="object-cover" />
                <div className="absolute bottom-3 left-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700">Let's grab a coffee ☕️</div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 lg:p-10">
                <p className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold mb-2">Personal invite</p>
                <h3 className="text-1xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-3 leading-snug">Meet our Digital Strategist over coffee at our Abu Dhabi office and discuss your project.</h3>
               
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-200 dark:ring-blue-900">
                    <Image src="/images/1752723677506.jpeg" alt="Digital Strategist" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Mudassar Nazir</p>
                    <p className="text-xs text-slate-500">Digital & Technology Strategist</p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  
                Mudassar has helped 30+ Abu Dhabi companies plan and launch projects, build websites and mobile apps, implement AI automation, and craft effective digital strategies — with experience in both government and private sectors.
                   </p>

                

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/+971554379700?text=Hi%20GrowthAccess%2C%20I%27d%20like%20to%20schedule%20a%20coffee%20meeting%20at%20your%20office."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors"
                  >
                    Schedule coffee at our office
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                  </a>
                  <a
                    href="https://cal.com/growthaccess/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors"
                  >
                    Book an online Zoom meeting
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp FAB */}
      <a
        href="https://wa.me/+971554379700"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA56] text-white shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center z-50"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Chatbot */}
      <Chatbot />
    </>
  );
}