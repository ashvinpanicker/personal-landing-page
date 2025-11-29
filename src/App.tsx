import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip';
import {
  Heart,
  // Copy,
  // Check,
  Loader2
} from 'lucide-react';
import { useData } from './hooks/useData';
import './App.css';

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};


function App() {
  const { data, loading } = useData();
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  // const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const shuffledSubtitles = useMemo(() => {
    if (!data?.subtitles) return [];
    return shuffleArray(data.subtitles);
  }, [data]);

  useEffect(() => {
    if (shuffledSubtitles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % shuffledSubtitles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [shuffledSubtitles]);

  // const copyToClipboard = async (text: string, name: string) => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     setCopiedAddress(name);
  //     setTimeout(() => setCopiedAddress(null), 2000);
  //   } catch (err) {
  //     console.error('Failed to copy:', err);
  //   }
  // };

  if (loading || !data) {
    return (
      <div className="p-10 bg-gradient-to-br rounded-lg from-slate-50 via-blue-50 to-slate-100 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <div className="text-slate-500 font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen rounded-lg bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <img
                src="/AP2.webp"
                alt="Ashvin Panicker"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover shadow-2xl ring-4 ring-white/50"
              />
            </motion.div>

            <div className="space-y-3">
              <motion.h1
                className="text-4xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent px-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {data.profile.title}
              </motion.h1>

              <div className="h-16 sm:h-20 flex items-center justify-center px-4">
                <div className="text-xl sm:text-2xl md:text-4xl text-slate-700 font-medium text-center">
                  <span>I am </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentSubtitle}
                      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                      transition={{ duration: 0.5 }}
                      className="inline-block"
                    >
                      {shuffledSubtitles[currentSubtitle].link ? (
                        <a
                          href={shuffledSubtitles[currentSubtitle].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition-colors duration-300 underline decoration-dotted cursor-pointer"
                        >
                          {shuffledSubtitles[currentSubtitle].text}
                        </a>
                      ) : (
                        shuffledSubtitles[currentSubtitle].text
                      )}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {data.cta && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex justify-center"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:text-white font-bold py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <a href={data.cta.url} target="_blank" rel="noopener noreferrer">
                    {data.cta.text}
                  </a>
                </Button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="pt-4"
            >
              <p className="text-slate-600 mb-6 text-base sm:text-lg">Connect with me</p>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center px-4">
                {data.socialLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.08, duration: 0.3 }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="lg"
                          asChild
                          className={`transition-all duration-300 hover:scale-110 hover:shadow-lg ${link.color} bg-white/80 backdrop-blur-sm`}
                        >
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <img src={link.icon} alt={link.name} className="w-5 h-5" />
                            <span className="hidden sm:inline">{link.name}</span>
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="sm:hidden">
                        <p>{link.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="pt-8"
            >
              <p className="text-slate-600 mb-4 text-base sm:text-lg">Send me some coin</p>
              <div className="flex flex-wrap gap-3 justify-center items-center px-4">
                {data.paymentAddresses.map((payment, index) => (
                  <motion.div
                    key={payment.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.3 }}
                  >
                    <button
                      onClick={() => copyToClipboard(payment.address, payment.name)}
                      className={`px-4 py-2 rounded-lg border-2 border-slate-300 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg ${payment.color} flex items-center gap-2`}
                    >
                      <img src={payment.icon} alt={payment.name} className="w-5 h-5 object-contain" />
                      <span className="font-medium text-slate-700">{payment.name}</span>
                      {copiedAddress === payment.name ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
              <p className="text-slate-500 text-xs sm:text-sm mt-3 px-4">Click to copy address</p>
            </motion.div> */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="pt-8 sm:pt-12 flex justify-center items-center gap-2 text-slate-500 text-sm sm:text-base px-4"
            >
              <span>Made with</span>
              <Heart className="w-4 h-4 fill-red-500 text-red-500 animate-pulse" />
              <span>by</span>
              <a
                href="https://ashvinpanicker.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-blue-600 transition-colors duration-300 underline decoration-dotted"
              >
                Ashvin
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default App;
