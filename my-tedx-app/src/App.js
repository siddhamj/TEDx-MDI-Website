import React, { useState, useEffect, useRef } from 'react';

// --- Animation Hooks & Components ---

// Custom hook for observing when an element is in the viewport
const useInView = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isInView];
};

// Custom hook for the typing effect
const useTypingEffect = (text, duration = 100) => {
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        if (typedText.length < text.length) {
            const timeoutId = setTimeout(() => {
                setTypedText(text.slice(0, typedText.length + 1));
            }, duration);
            return () => clearTimeout(timeoutId);
        }
    }, [typedText, text, duration]);

    return typedText;
};


// Component to wrap elements that should animate on scroll
const AnimateOnScroll = ({ children, animationClass, delay = 0 }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isInView ? animationClass : 'opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};


// --- Helper Components ---

const Header = ({ setPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = (pageName) => {
    setPage(pageName);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-black/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => navigate('home')} className="text-2xl font-extrabold text-left transform hover:scale-105 transition-transform">
          <span className="text-white">TEDx</span><span className="text-red-600">MDIGurgaon</span>
        </button>
        <nav className="hidden md:flex space-x-8 text-white">
          <button onClick={() => navigate('home')} className="hover:text-red-600 transition-colors">Home</button>
          <button onClick={() => navigate('about')} className="hover:text-red-600 transition-colors">About</button>
          <button onClick={() => navigate('speakers')} className="hover:text-red-600 transition-colors">Speakers</button>
          <button onClick={() => navigate('events')} className="hover:text-red-600 transition-colors">Events</button>
          <button onClick={() => navigate('contact')} className="hover:text-red-600 transition-colors">Contact</button>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <button onClick={() => navigate('home')} className="block w-full text-left py-2 px-6 text-sm hover:bg-gray-800">Home</button>
          <button onClick={() => navigate('about')} className="block w-full text-left py-2 px-6 text-sm hover:bg-gray-800">About</button>
          <button onClick={() => navigate('speakers')} className="block w-full text-left py-2 px-6 text-sm hover:bg-gray-800">Speakers</button>
          <button onClick={() => navigate('events')} className="block w-full text-left py-2 px-6 text-sm hover:bg-gray-800">Events</button>
          <button onClick={() => navigate('contact')} className="block w-full text-left py-2 px-6 text-sm hover:bg-gray-800">Contact</button>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 py-12">
    <div className="container mx-auto px-6 text-center text-gray-400">
      <div className="text-3xl font-extrabold mb-4">
        <span className="text-white">TEDx</span><span className="text-red-600">MDIGurgaon</span>
      </div>
      <div className="flex justify-center space-x-6 mb-6">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-red-600 transition-transform transform hover:scale-110"><i className="fab fa-facebook-f"></i></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-red-600 transition-transform transform hover:scale-110"><i className="fab fa-twitter"></i></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-red-600 transition-transform transform hover:scale-110"><i className="fab fa-instagram"></i></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-red-600 transition-transform transform hover:scale-110"><i className="fab fa-linkedin-in"></i></a>
      </div>
      <p className="mb-2">For inquiries, please email us at <a href="mailto:contact@tedxmdigurgaon.com" className="text-white hover:underline">contact@tedxmdigurgaon.com</a></p>
      <p className="text-sm">&copy; 2024 TEDxMDI Gurgaon. This independent TEDx event is operated under license from TED.</p>
    </div>
  </footer>
);

// --- Page Components ---

const HomePage = ({ setPage }) => {
    const typedTitle = useTypingEffect("Ideas Worth Spreading");

    return (
      <div>
        <div className="hero-section text-white text-center py-24 md:py-40 px-6" style={{background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://placehold.co/1920x1080/000000/ffffff?text=TEDx+MDI') no-repeat center center/cover"}}>
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 h-24">{typedTitle}<span className="animate-blink">|</span></h1>
            <AnimateOnScroll animationClass="animate-fadeInScaleUp" delay={1500}>
                <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto">Join us for a day of brilliant speakers, mind-opening talks, and inspiring conversations.</p>
            </AnimateOnScroll>
            <AnimateOnScroll animationClass="animate-fadeInScaleUp" delay={1700}>
                <button onClick={() => setPage('events')} className="bg-red-600 text-white font-bold py-4 px-10 rounded-full text-lg uppercase hover:bg-red-700 transition-transform transform hover:scale-105">View Event Details</button>
            </AnimateOnScroll>
          </div>
        </div>
        <div className="py-20 bg-black">
          <div className="container mx-auto px-6 text-center">
            <AnimateOnScroll animationClass="animate-slideInUp">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">About <span className="text-red-600">TEDx</span>MDI Gurgaon</h2>
                <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
                <p className="max-w-3xl mx-auto text-gray-300 text-lg">In the spirit of "ideas worth spreading," TED has created TEDx, a program of local, self-organized events that bring people together to share a TED-like experience. We aim to create a platform for Gurugram's brightest minds to share their most innovative ideas.</p>
                <button onClick={() => setPage('about')} className="mt-8 inline-block text-red-600 font-bold transform hover:scale-105 transition-transform">Learn More About Us &rarr;</button>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    );
};

const AboutPage = () => (
  <div className="py-20">
    <div className="container mx-auto px-6">
      <AnimateOnScroll animationClass="animate-fadeInScaleUp">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">About <span className="text-red-600">Us</span></h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mb-12"></div>
      </AnimateOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <AnimateOnScroll animationClass="animate-slideInLeft">
          <div>
            <h3 className="text-3xl font-bold mb-4">What is <span className="text-red-600">TEDx</span>?</h3>
            <p className="text-gray-300 text-lg mb-4">In the spirit of ideas worth spreading, TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. At a TEDx event, TED Talks video and live speakers combine to spark deep discussion and connection. These local, self-organized events are branded TEDx, where x = independently organized TED event.</p>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll animationClass="animate-slideInRight">
          <img src="https://placehold.co/600x400/1a1a1a/e62b1e?text=Community" alt="Community gathering" className="rounded-lg shadow-lg" />
        </AnimateOnScroll>
      </div>
    </div>
  </div>
);

const speakersData = [
    { name: "Dr. Anya Sharma", title: "AI Ethicist", img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", desc: "Dr. Sharma is a leading voice in the responsible development of artificial intelligence." },
    { name: "Rohan Verma", title: "Sustainable Architect", img: "https://placehold.co/400x400/737373/ffffff?text=Speaker+2", desc: "Rohan is revolutionizing urban living with his award-winning green buildings." },
    { name: "Priya Singh", title: "Social Entrepreneur", img: "https://placehold.co/400x400/404040/ffffff?text=Speaker+3", desc: "Priya's non-profit empowers rural artisans by connecting them to global markets." }
];

const SpeakersPage = () => (
    <div className="py-20">
        <div className="container mx-auto px-6">
            <AnimateOnScroll animationClass="animate-fadeInScaleUp">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Our <span className="text-red-600">Speakers</span></h2>
                <div className="w-24 h-1 bg-red-600 mx-auto mb-12"></div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {speakersData.map((speaker, index) => (
                    <AnimateOnScroll key={speaker.name} animationClass="animate-slideInUp" delay={index * 200}>
                        <div className="bg-gray-900 rounded-lg overflow-hidden text-center p-8 transform hover:-translate-y-2 transition-transform duration-300">
                            <img className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-gray-700 object-cover" src={speaker.img} alt={speaker.name} />
                            <h3 className="text-2xl font-bold mb-2">{speaker.name}</h3>
                            <p className="text-red-600 mb-4">{speaker.title}</p>
                            <p className="text-gray-400">{speaker.desc}</p>
                        </div>
                    </AnimateOnScroll>
                ))}
            </div>
        </div>
    </div>
);

const EventsPage = ({ setPage }) => (
  <div className="py-20">
    <div className="container mx-auto px-6">
      <AnimateOnScroll animationClass="animate-fadeInScaleUp">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Our <span className="text-red-600">Event</span></h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mb-12"></div>
      </AnimateOnScroll>
      <AnimateOnScroll animationClass="animate-slideInUp">
      <div className="bg-gray-900 rounded-lg shadow-xl p-8 md:p-12 mb-16">
        <div className="text-center">
          <h3 className="text-4xl font-bold text-red-600 mb-2">Theme: The Next Chapter</h3>
          <p className="text-2xl text-gray-300 mb-6">October 26, 2024</p>
        </div>
      </div>
      </AnimateOnScroll>
      <AnimateOnScroll animationClass="animate-fadeInScaleUp">
        <h3 className="text-3xl font-bold text-center mb-4">Past <span className="text-red-600">Events</span></h3>
        <div className="w-24 h-1 bg-red-600 mx-auto mb-12"></div>
      </AnimateOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimateOnScroll animationClass="animate-slideInLeft">
            <div className="bg-gray-900 p-8 rounded-lg flex flex-col justify-between h-full transform hover:scale-105 transition-transform">
              <div>
                <h4 className="text-2xl font-bold mb-2 text-red-600">2023: Human Bridges</h4>
                <p className="text-gray-400 mb-4">An exploration of connection, empathy, and the ties that bind us in a fragmented world.</p>
              </div>
              <button onClick={() => setPage('past-talk')} className="text-white font-bold self-start hover:text-red-600 transition-colors text-left">Watch Talk: The Ethical Compass of AI &rarr;</button>
            </div>
        </AnimateOnScroll>
        <AnimateOnScroll animationClass="animate-slideInRight">
            <div className="bg-gray-900 p-8 rounded-lg h-full transform hover:scale-105 transition-transform">
              <h4 className="text-2xl font-bold mb-2 text-red-600">2022: Beyond the Horizon</h4>
              <p className="text-gray-400">Focused on exploration and discovery, from oceans to space.</p>
            </div>
        </AnimateOnScroll>
      </div>
    </div>
  </div>
);

const PastTalkPage = ({ setPage }) => (
    <div className="py-20 bg-black">
        <div className="container mx-auto px-6">
            <AnimateOnScroll animationClass="animate-fadeInScaleUp">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">The Ethical Compass of AI</h1>
                    <p className="text-2xl text-gray-300 mb-4">by <span className="font-bold text-white">Dr. Anya Sharma</span></p>
                    <p className="text-lg text-gray-500">Filmed: October 2023 at <span className="font-semibold">TEDxMDI Gurgaon</span></p>
                </div>
            </AnimateOnScroll>
            <AnimateOnScroll animationClass="animate-fadeInScaleUp" delay={200}>
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden shadow-lg">
                        <iframe 
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/eXdVDhOGqoE" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-6xl mx-auto mb-16 items-start">
                <AnimateOnScroll animationClass="animate-slideInLeft">
                    <div>
                        <h3 className="text-3xl font-bold mb-4 border-b-2 border-red-600 pb-2">About the <span className="text-red-600">Talk</span></h3>
                        <p className="text-gray-300 text-lg leading-relaxed">Dr. Anya Sharma navigates the complex moral landscape of artificial intelligence. As AI becomes increasingly integrated into our daily lives, how do we ensure it operates ethically? Dr. Sharma argues for a proactive approach, embedding human values into the core of AI development. This talk is a crucial call to action for technologists, policymakers, and citizens alike to steer the future of AI towards a more equitable and just world.</p>
                    </div>
                </AnimateOnScroll>
                <AnimateOnScroll animationClass="animate-slideInRight">
                    <div>
                        <h3 className="text-3xl font-bold mb-4 border-b-2 border-red-600 pb-2">About the <span className="text-red-600">Speaker</span></h3>
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                             <img className="w-32 h-32 rounded-full mb-4 border-4 border-gray-700 object-cover" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Dr. Anya Sharma" />
                             <p className="text-gray-400">Dr. Sharma is a leading voice in the responsible development of artificial intelligence, advocating for technology that serves humanity.</p>
                        </div>
                    </div>
                </AnimateOnScroll>
            </div>
        </div>
    </div>
);

const ContactPage = () => (
    <div className="py-20">
        <div className="container mx-auto px-6">
            <AnimateOnScroll animationClass="animate-fadeInScaleUp">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Get In <span className="text-red-600">Touch</span></h2>
                <div className="w-24 h-1 bg-red-600 mx-auto mb-12"></div>
            </AnimateOnScroll>
            <AnimateOnScroll animationClass="animate-slideInUp">
                <div className="max-w-3xl mx-auto">
                    <p className="text-center text-lg text-gray-300 mb-8">Have questions, want to partner with us, or suggest a speaker? We'd love to hear from you.</p>
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                            <input type="text" name="name" id="name" className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-600" />
                        </div>
                         <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                            <input type="email" name="email" id="email" className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-600" />
                        </div>
                         <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                            <textarea name="message" id="message" rows="4" className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-600"></textarea>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="bg-red-600 text-white font-bold py-3 px-8 rounded-full uppercase hover:bg-red-700 transition-transform transform hover:scale-105">Send Message</button>
                        </div>
                    </form>
                </div>
            </AnimateOnScroll>
        </div>
    </div>
);


// --- Main App Component ---

export default function App() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'about':
        return <AboutPage />;
      case 'speakers':
        return <SpeakersPage />;
      case 'events':
        return <EventsPage setPage={setPage} />;
      case 'past-talk':
        return <PastTalkPage setPage={setPage} />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="bg-gray-900 text-white" style={{fontFamily: "'Inter', sans-serif"}}>
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeInScaleUp {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes blink {
            50% { opacity: 0; }
        }
        .animate-fadeInScaleUp { opacity: 1; transform: scale(1); }
        .animate-slideInUp { opacity: 1; transform: translateY(0); }
        .animate-slideInLeft { opacity: 1; transform: translateX(0); }
        .animate-slideInRight { opacity: 1; transform: translateX(0); }
        .animate-blink { animation: blink 1s step-end infinite; }
        
        .aspect-w-16 {
            position: relative;
            padding-bottom: 56.25%;
        }
        .aspect-h-9 {
            /* This class is used with aspect-w-16 to maintain ratio */
        }
        .aspect-w-16 > iframe {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
      `}</style>
      <Header setPage={setPage} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
