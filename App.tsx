import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useInView, useSpring } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  X, 
  Brain, 
  Target, 
  DollarSign, 
  Mail, 
  Globe,
  Smartphone,
  Search,
  Sparkles,
  MapPin,
  ScanLine,
  CheckCircle2,
  Loader2,
  Zap,
  TrendingUp,
  Users,
  Radio,
  Lock,
  Unlock
} from 'lucide-react';
import { Logo } from './components/Logo';
import { SlideLayout, itemVariants } from './components/SlideLayout';
import { SlideData } from './types';

// --- HELPER COMPONENTS ---

const AnimatedCounter: React.FC<{ value: number; suffix?: string; label: string }> = ({ value, suffix = "", label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-xl border border-white/10 w-full h-full min-h-[100px]">
      <div className="text-3xl font-serif text-white font-bold">
        {displayValue}{suffix}
      </div>
      <div className="text-brand-orange text-[10px] uppercase tracking-widest font-bold mt-1 text-center">{label}</div>
    </div>
  );
};

const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    setDisplayedText(""); // Ensure clean start
    const interval = setInterval(() => {
      i++;
      setDisplayedText(text.substring(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 25); 
    return () => clearInterval(interval);
  }, [text, started]);

  return (
    <span className="font-mono text-gray-300">
      {displayedText}
      <span className="animate-pulse inline-block w-1.5 h-4 bg-brand-orange ml-0.5 align-middle"></span>
    </span>
  );
};

// --- SLIDE COMPONENTS ---

const HeroSlide: React.FC = () => (
  <SlideLayout className="text-center">
    <div className="flex flex-col h-full justify-center items-center gap-8 md:gap-10">
      <motion.div variants={itemVariants} className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_0_60px_rgba(255,102,0,0.15)]">
        <Logo className="text-5xl md:text-6xl" />
        <div className="mt-3 flex items-center justify-center gap-3 text-brand-orange font-bold tracking-[0.3em] uppercase text-[10px]">
          <Sparkles size={10} /> Marketing <Sparkles size={10} />
        </div>
      </motion.div>
      
      <div className="space-y-4 px-2">
        <motion.h1 variants={itemVariants} className="font-serif text-5xl md:text-7xl text-white leading-[0.9] tracking-tight">
          The AI <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-300">Advantage</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-xl text-gray-400 font-light tracking-wide">
          For the Modern Men's Store
        </motion.p>
      </div>

      <motion.div variants={itemVariants} className="mt-6 inline-flex items-center gap-3 border border-white/10 bg-white/5 rounded-full px-5 py-2 backdrop-blur-sm">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <p className="text-gray-300 text-xs font-bold uppercase tracking-wider">Presented by Trevor Ruby</p>
      </motion.div>
    </div>
  </SlideLayout>
);

const IntroSlide: React.FC = () => (
  <SlideLayout>
    <div className="flex flex-col h-full justify-center">
      <motion.h2 variants={itemVariants} className="font-serif text-5xl text-white mb-2">
        Who I Am
      </motion.h2>
      <motion.div variants={itemVariants} className="h-1 w-16 bg-brand-orange mb-8"></motion.div>

      <div className="space-y-3 md:space-y-4">
        {[
          { label: "39 Years Old", desc: "Alexandria Native." },
          { label: "17 Years SEO", desc: "Web dev veteran." },
          { label: "25+ Employees", desc: "A dedicated team." },
          { label: "Christian", desc: "Biblical principles." }
        ].map((item, i) => (
          <motion.div variants={itemVariants} key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
            <div className="w-2 h-2 rounded-full bg-brand-orange shrink-0 shadow-[0_0_8px_#ff6600]"></div>
            <div className="flex flex-col text-left">
              <span className="text-white font-bold text-lg leading-none mb-1">{item.label}</span>
              <span className="text-gray-400 font-light text-sm">{item.desc}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

const ShiftSlide: React.FC = () => (
  <SlideLayout className="text-center">
    <div className="flex flex-col h-full justify-center gap-6">
      <motion.div variants={itemVariants}>
        <h2 className="font-serif text-4xl text-white mb-2">The Shift</h2>
        <p className="text-lg text-gray-400">
          From <span className="line-through decoration-brand-orange/50">Search</span> to <span className="text-brand-orange font-bold">Answer</span>
        </p>
      </motion.div>

      <div className="flex flex-col gap-4">
        {/* Old Way */}
        <motion.div variants={itemVariants} className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col opacity-50">
          <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
            <Search size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">mens suits alexandria</span>
          </div>
          <div className="space-y-2 opacity-50">
            <div className="h-2 bg-blue-900/40 rounded w-3/4"></div>
            <div className="h-2 bg-gray-800 rounded w-full"></div>
            <div className="h-2 bg-gray-800 rounded w-5/6"></div>
          </div>
        </motion.div>

        {/* New Way (AI Simulation) */}
        <motion.div variants={itemVariants} className="bg-black/60 p-5 rounded-xl border border-brand-orange/50 flex flex-col shadow-[0_0_30px_rgba(255,102,0,0.1)] relative overflow-hidden flex-1 min-h-[140px]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent"></div>
          <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-3">
            <Sparkles size={14} className="text-brand-orange" />
            <span className="text-xs text-gray-300">Where can I get a fitted suit?</span>
          </div>
          <div className="text-left text-sm leading-relaxed">
             <TypewriterText 
               delay={300}
               text="Weiss & Goldring is the top rated choice. They offer master tailoring..." 
             />
          </div>
        </motion.div>
      </div>

      <motion.p variants={itemVariants} className="text-lg text-gray-300 font-light">
        If you aren't the <span className="text-brand-orange font-bold">Answer</span>, you don't exist.
      </motion.p>
    </div>
  </SlideLayout>
);

const StrategySlide: React.FC = () => (
  <SlideLayout>
    <div className="flex flex-col h-full justify-center">
      <motion.div variants={itemVariants} className="mb-6">
        <h2 className="font-serif text-5xl text-white">Strategy</h2>
        <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-white font-bold italic">"Antigravity"</p>
      </motion.div>

      <motion.p variants={itemVariants} className="text-lg text-gray-300 font-light mb-8">
        Lift your brand into the premium tier while others fight on the ground.
      </motion.p>
      
      <div className="space-y-4">
        {[
          { title: "AI Websites", icon: Globe, text: "Dynamic adaptation." },
          { title: "AI Geo", icon: MapPin, text: "Map pack dominance." },
          { title: "AI Ads", icon: Target, text: "Intent-based bidding." }
        ].map((item, i) => (
          <motion.div variants={itemVariants} key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
              <item.icon size={20} />
            </div>
            <div>
              <div className="font-serif text-xl text-white">{item.title}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">{item.text}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

const CaseStudySlide: React.FC = () => (
  <SlideLayout>
    <div className="flex flex-col h-full justify-center">
      <motion.div variants={itemVariants} className="mb-8 border-b border-gray-800 pb-4">
        <div className="text-brand-orange text-xs font-mono mb-1">CASE STUDY 001</div>
        <h2 className="font-serif text-4xl text-white">Weiss & Goldring</h2>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-xl text-white font-light mb-2">The Gold Standard</h3>
        <p className="text-gray-400 leading-relaxed text-base">
          We built the digital house for Ted's expertise. By using <strong className="text-white">GEO</strong>, they became the definitive answer.
        </p>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3">
         {[
           { label: "Gemini Ranking", val: "#1", icon: Sparkles },
           { label: "Map Pack", val: "#1", icon: MapPin },
           { label: "Local Mindshare", val: "Top", icon: Brain }
         ].map((stat, i) => (
           <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <stat.icon size={18} className="text-gray-500" />
                <span className="text-gray-300 text-sm uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="text-brand-orange font-bold text-2xl">{stat.val}</div>
           </div>
         ))}
      </motion.div>
    </div>
  </SlideLayout>
);

const GoogleAdsSlide: React.FC = () => (
  <SlideLayout>
    <div className="flex flex-col h-full justify-center">
      <motion.div variants={itemVariants} className="mb-6 text-center">
        <div className="p-3 bg-white/5 rounded-full inline-block mb-4">
          <Zap size={32} className="text-brand-orange" />
        </div>
        <h2 className="font-serif text-4xl text-white mb-2">Google Ads 2.0</h2>
        <p className="text-gray-400 text-sm uppercase tracking-widest">AI Smart Bidding</p>
      </motion.div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <motion.div variants={itemVariants}>
             <AnimatedCounter value={98} suffix="%" label="Buyer Intent Accuracy" />
          </motion.div>
        </div>
        <motion.div variants={itemVariants} className="h-full">
           <AnimatedCounter value={24} suffix="/7" label="AI Monitoring" />
        </motion.div>
        <motion.div variants={itemVariants} className="h-full">
           <AnimatedCounter value={40} suffix="%" label="Cost Reduction" />
        </motion.div>
      </div>

      <motion.p variants={itemVariants} className="mt-8 text-center text-gray-300 font-light">
        We pay for <span className="text-white font-bold">customers</span>, not just clickers.
      </motion.p>
    </div>
  </SlideLayout>
);

const FacebookAdsSlide: React.FC = () => (
  <SlideLayout>
    <div className="flex flex-col h-full justify-center">
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="font-serif text-5xl text-white mb-2">Facebook</h2>
        <div className="text-brand-orange text-lg font-bold uppercase tracking-wide">Interaction Bidding</div>
      </motion.div>

      <motion.p variants={itemVariants} className="text-xl text-gray-300 font-light mb-8">
        Don't pay for views. Pay for <span className="text-white border-b-2 border-brand-orange">conversations</span>.
      </motion.p>
      
      <div className="space-y-3">
        {[
          { text: "Comments & Replies", icon: FileText },
          { text: "Direct Messages", icon: Mail },
          { text: "Social Shares", icon: Users }
        ].map((item, i) => (
          <motion.div variants={itemVariants} key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
            <item.icon className="text-brand-orange" size={24} />
            <span className="text-lg text-white">{item.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

const FutureAppsSlide: React.FC = () => (
  <SlideLayout>
    <div className="flex flex-col h-full justify-center">
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="font-serif text-4xl text-white mb-2">The Future</h2>
        <h3 className="text-xl text-brand-orange font-bold uppercase tracking-wide">Your Store. In Their Pocket.</h3>
      </motion.div>
      
      <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-8 font-light">
        We are prototyping luxury apps that keep your customers locked in.
      </motion.p>
      
      <div className="grid gap-4">
        {[
          { title: "AI Stylist", desc: "Matches ties to shirts.", icon: Sparkles },
          { title: "VIP Alerts", desc: "Notify when size arrives.", icon: Zap },
          { title: "Booking", desc: "No phone tag. One tap.", icon: CheckCircle2 }
        ].map((item, i) => (
          <motion.div variants={itemVariants} key={i} className="bg-gradient-to-r from-gray-900 to-black border border-white/10 p-4 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-brand-orange/10 rounded-lg text-brand-orange shrink-0">
              <item.icon size={20} />
            </div>
            <div>
              <strong className="text-white block text-lg font-serif">{item.title}</strong>
              <span className="text-sm text-gray-400">{item.desc}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

const CloseSlide: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  return (
    <SlideLayout className="text-center">
      <div className="flex flex-col h-full justify-center items-center w-full">
        <motion.div variants={itemVariants} className="mb-8 md:mb-10 transform scale-110">
            <Logo className="text-4xl" />
        </motion.div>
        
        {!scanComplete ? (
          <div className="w-full flex flex-col items-center">
            {!scanning ? (
              <>
                <motion.h2 variants={itemVariants} className="font-serif text-5xl text-white mb-6 leading-tight">
                  Ready To <br/><span className="text-brand-orange">Serve</span>
                </motion.h2>
                <motion.p variants={itemVariants} className="text-lg text-gray-300 font-light mb-12 max-w-xs mx-auto">
                  Let's start right here, with you.
                </motion.p>
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startScan}
                  className="w-full max-w-xs group relative inline-flex justify-center items-center gap-3 px-8 py-5 bg-white text-black font-bold text-lg rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  <ScanLine className="w-5 h-5" />
                  <span>Scan Digital Footprint</span>
                </motion.button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xs flex flex-col items-center gap-6 p-8 bg-white/5 border border-brand-orange/50 rounded-2xl backdrop-blur-xl"
              >
                <div className="relative">
                    <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
                </div>
                <div className="text-brand-orange font-mono text-sm animate-pulse tracking-widest">ANALYZING...</div>
                
                <div className="w-full space-y-2">
                    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-brand-orange"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.5, ease: "circOut" }}
                        />
                    </div>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-sm bg-black/60 backdrop-blur-xl border border-brand-orange rounded-3xl p-8 flex flex-col gap-6"
          >
            <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 border border-green-500/50">
                    <CheckCircle2 size={32} />
                </div>
                <span className="text-2xl font-serif text-white">Scan Complete</span>
            </div>
            
            <div className="text-gray-300 text-center border-t border-white/10 pt-4">
                Opportunity detected in <br/><strong className="text-white">AI Search Positioning</strong>.
            </div>

            <div className="flex flex-col gap-3 w-full">
                <a href="mailto:Trevor@founditmarketing.com" className="flex items-center justify-center gap-3 px-6 py-4 bg-brand-orange rounded-xl text-lg text-black font-bold">
                  <Mail size={20} />
                  Email Results
                </a>
            </div>
            
            <button 
                onClick={() => setScanComplete(false)}
                className="mt-2 text-sm text-gray-600 hover:text-white"
            >
                Reset
            </button>
          </motion.div>
        )}
      </div>
    </SlideLayout>
  );
};

// --- MAIN DATA ---

const slides: SlideData[] = [
  {
    id: 'hero',
    component: HeroSlide,
    notes: [
      "Intro: 'Good evening, gentlemen. My name is Trevor Ruby.'",
      "The Hook: 'You run stores that are built on tradition. On handshakes. On quality. I'm not here to change that. I'm here to show you how to protect that tradition using the most advanced technology on earth.'",
      "Context: 'I'm 39, from Alexandria. I've been doing this since the internet was just getting started.'"
    ]
  },
  {
    id: 'intro',
    component: IntroSlide,
    notes: [
      "Faith: 'I want to be clear about who I am. I believe Jesus is Lord. That means when I do business with you, I answer to a higher authority than just the bottom line.'",
      "Team: 'We have 25 employees. We're lean, mean, and effective.'"
    ]
  },
  {
    id: 'shift',
    component: ShiftSlide,
    notes: [
      "The Change: 'For 20 years, people typed 'mens suits' into Google and got 10 blue links. That is over.'",
      "The Now: 'Now, people talk to their phones. They ask Gemini, they ask ChatGPT.'",
      "The Stakes: 'If you aren't optimized for these AI conversations, you don't just lose a click. You simply don't exist.'"
    ]
  },
  {
    id: 'strategy',
    component: StrategySlide,
    notes: [
      "Antigravity: 'It's about using AI to spot trends before they happen. We position you so that when gravity pulls everyone else down into price wars, your brand stays elevated.'",
      "Analogy: 'It's not magic, it's math. But to the customer, it feels like magic.'"
    ]
  },
  {
    id: 'case-study',
    component: CaseStudySlide,
    notes: [
      "Proof: 'Look at Ted. Look at Weiss & Goldring. You know their reputation. We helped translate that reputation to the digital world.'",
      "Demo: 'If you pull out your phone right now and ask Gemini for the best menswear, watch whose name pops up. That isn't an accident. We engineered that.'"
    ]
  },
  {
    id: 'google-ads',
    component: GoogleAdsSlide,
    notes: [
      "Tech Detail: 'In the old days, I'd set a bid for $2.00 a click. Now? I feed the AI your sales data.'",
      "Benefit: 'This saves you money because we aren't advertising to teenagers. We are advertising to men with wallets.'"
    ]
  },
  {
    id: 'facebook-ads',
    component: FacebookAdsSlide,
    notes: [
      "Strategy: 'I don't care if 10,000 people see your ad if nobody cares. I'd rather 100 people see it, and 20 of them send you a message asking 'Do you have this in size 42?'"
    ]
  },
  {
    id: 'future',
    component: FutureAppsSlide,
    notes: [
      "Innovation: 'This is the next frontier. We are building these prototypes right now.'",
      "Loyalty: 'This keeps them loyal. Why go to a big box store when the app on their phone is telling them you have exactly what they need?'"
    ]
  },
  {
    id: 'close',
    component: CloseSlide,
    notes: [
      "Closing: 'I'm not asking you to understand all the code. That's my job. I'm asking you to trust the results.'",
      "Call to Action: 'Let us run a scan on your current digital footprint. Thank you for your time.'"
    ]
  }
];

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);

  // Setup BroadcastChannel for local synchronization
  useEffect(() => {
    // Create channel
    const channel = new BroadcastChannel('found_it_presentation_sync');
    channelRef.current = channel;

    channel.onmessage = (event) => {
      const data = event.data;
      if (data.type === 'SYNC_SLIDE') {
        // If we are NOT the host, we listen to updates
        if (!isHost) {
          setCurrentSlideIndex(data.index);
        }
      }
    };

    return () => {
      channel.close();
    };
  }, [isHost]);

  // If I am host, I broadcast my slide changes
  useEffect(() => {
    if (isHost && channelRef.current) {
      channelRef.current.postMessage({
        type: 'SYNC_SLIDE',
        index: currentSlideIndex,
        timestamp: Date.now()
      });
    }
  }, [currentSlideIndex, isHost]);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1 < slides.length ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  }, []);

  // Keyboard navigation - Only works if Host or if not in synced mode (default)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle host mode with 'H' key (secret shortcut)
      if (e.key === 'h' || e.key === 'H') {
        setIsHost(prev => !prev);
        return;
      }

      // If we are a viewer (and not host), we lock controls to follow the host
      // BUT for this demo, let's allow local control unless specified otherwise,
      // or strictly lock it. Let's strictly lock it if `isHost` is false but we receive messages?
      // Actually, standard behavior: Everyone is a viewer until they become a Host.
      // If you are a Viewer, you can still swipe, but Host overrides you.
      
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'n') {
        setShowNotes(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch navigation
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  // Long press handler for Logo to toggle Host Mode
  const [pressTimer, setPressTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoTouchStart = () => {
    const timer = setTimeout(() => {
      setIsHost(prev => !prev);
      // Optional: Visual feedback like a vibration or toast could go here
    }, 2000); // 2 seconds long press
    setPressTimer(timer);
  };

  const handleLogoTouchEnd = () => {
    if (pressTimer) clearTimeout(pressTimer);
  };

  const CurrentComponent = slides[currentSlideIndex].component;
  const progress = ((currentSlideIndex + 1) / slides.length) * 100;

  return (
    <div 
      className="relative w-full h-[100dvh] bg-black overflow-hidden font-sans text-slate-200"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* 3D Perspective Grid Background */}
      <div className="absolute inset-0 perspective-container pointer-events-none opacity-20">
        <div className="perspective-grid animate-grid-flow"></div>
      </div>
      
      {/* Top Fog/Vignette to fade grid into distance */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-4 z-30 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div 
          className="pointer-events-auto select-none cursor-pointer active:scale-95 transition-transform"
          onMouseDown={handleLogoTouchStart}
          onMouseUp={handleLogoTouchEnd}
          onTouchStart={handleLogoTouchStart}
          onTouchEnd={handleLogoTouchEnd}
        >
             <Logo className="text-xl opacity-90" />
             {isHost && <div className="text-[9px] text-brand-orange font-mono uppercase tracking-widest mt-1 animate-pulse">Host Mode Active</div>}
        </div>
        <div className="flex gap-2 pointer-events-auto">
            {/* Host Status Indicator */}
            {isHost ? (
               <div className="p-2 rounded-full bg-brand-orange/20 border border-brand-orange text-brand-orange">
                  <Radio size={20} className="animate-pulse" />
               </div>
            ) : (
               // If not host, show nothing or lock icon if we wanted to show 'locked to host' state
               null
            )}
            
            <button 
                onClick={() => setShowNotes(!showNotes)}
                className={`p-2 rounded-full transition-colors backdrop-blur-md border border-white/5 ${showNotes ? 'bg-brand-orange text-black' : 'bg-black/40 text-gray-500 hover:text-white'}`}
                title="Speaker Notes"
            >
                <FileText size={20} />
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative w-full h-full flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            className="w-full h-full"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.3 }}
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Controls */}
      <footer className="absolute bottom-0 left-0 w-full z-30 pointer-events-none">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-900/50 backdrop-blur">
          <motion.div 
            className="h-full bg-brand-orange shadow-[0_0_15px_#ff6600]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Navigation Bar */}
        <div className="p-4 flex justify-between items-center bg-black/80 backdrop-blur-xl border-t border-white/5 pointer-events-auto pb-8">
          <div className="text-xs text-gray-500 font-mono flex items-center gap-2">
            <span>{currentSlideIndex + 1} <span className="text-gray-700">/</span> {slides.length}</span>
            <span className="w-px h-3 bg-gray-800"></span>
            <span className="text-gray-600 uppercase tracking-widest text-[10px]">Found It Marketing</span>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className={`p-3 rounded-full transition-all active:scale-95 border ${
                isHost 
                ? 'bg-white/10 text-white hover:bg-white/20 border-white/10' 
                : 'text-gray-600 hover:text-white border-transparent'
              } disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className={`p-3 rounded-full transition-all active:scale-95 border ${
                isHost
                ? 'bg-brand-orange text-black hover:bg-white border-brand-orange shadow-[0_0_20px_rgba(255,102,0,0.4)]'
                : 'bg-white/5 text-brand-orange hover:bg-brand-orange hover:text-black border-brand-orange/30'
              } disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </footer>

      {/* Speaker Notes Overlay */}
      <AnimatePresence>
        {showNotes && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-0 left-0 w-full h-[60vh] bg-zinc-900/95 backdrop-blur-xl border-t border-gray-700/50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden z-40"
          >
            <div className="flex justify-between items-center p-4 border-b border-white/5 bg-black/20">
              <span className="text-brand-orange font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <Brain size={16} /> Speaker Notes
              </span>
              <button onClick={() => setShowNotes(false)} className="text-gray-400 hover:text-white p-2">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto h-full pb-24 space-y-4">
              {slides[currentSlideIndex].notes.map((note, idx) => (
                <div key={idx} className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <p className="text-gray-300 text-base leading-relaxed">
                    {note}
                    </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}