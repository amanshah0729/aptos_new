'use client'

import { useEffect, useState, useRef } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { motion, AnimatePresence } from 'framer-motion'
import NavHeader from '@/components/ui/nav-header'
import { useSearchParams } from 'next/navigation'
import { LivestreamPlayer } from '@/components/livestream/livestream-player'
import { useStakingSol } from '@/hooks/useStakingSol'
import { VaultBalance } from '@/components/vault/vault-balance'
import { IconCurrencySolana } from '@tabler/icons-react'

// Sample chat messages to randomly pull from
const SAMPLE_MESSAGES = [
  // General reactions
  "Just joined the stream! 🎉",
  "This is getting intense 👀",
  "Can't believe what I'm seeing",
  "LETS GOOOOO",
  "🚀🚀🚀",
  "gg",
  "wow",
  "insane",
  "THIS IS IT",
  
  // Game-specific comments
  "Count going up fast",
  "Anyone else seeing this pattern?",
  "I'm calling 5 next",
  "It's gonna crash soon",
  "Hold strong everyone 💎",
  "Perfect timing to join",
  "Easy money today",
  "The trend is clear",
  "Who's winning so far?",
  
  // Questions and discussions
  "What's everyone's strategy?",
  "New meta?",
  "How long have you been playing?",
  "First time here, this is awesome",
  "Anyone else from yesterday's stream?",
  "What's the max today?",
  "Did anyone catch that last round?",
  
  // Reactions to events
  "Called it!",
  "No way!!",
  "That was close",
  "Big win incoming",
  "RIP to those who sold early",
  "Perfect exit",
  "Should have waited",
  "This is the way",
  
  // Emotes and short reactions
  "🔥",
  "💎🙌",
  "📈",
  "🎯",
  "👀",
  "🚀",
  "💪",
  "LFG!!!",
  "W",
];

const SAMPLE_USERNAMES = [
  // Gaming style names
  "Player123", "ProGamer99", "StreamNinja", "GamingLegend",
  // Crypto style names
  "CryptoWhale", "DiamondHands", "MoonWatcher", "Hodler_Pro",
  // Betting style names
  "LuckyStaker", "BetMaster", "WinnerCircle", "HighRoller",
  // Strategy style names
  "AlphaSeeker", "PatternHunter", "DataWizard", "TrendSpotter",
  // Fun names
  "Rocket_Man", "ChartWatcher", "CoolCat", "StreamLord",
  "BigBrain", "WiseTrader", "StatsGuru", "MathGenius"
];

export default function StreamPage() {
  const searchParams = useSearchParams()
  const videoUrl = searchParams.get('videoUrl') || ''
  const title = searchParams.get('title') || ''
  const author = searchParams.get('author') || ''
  const startTime = Number(searchParams.get('startTime')) || 0
  const endTime = Number(searchParams.get('endTime')) || undefined
  const trueCount = Number(searchParams.get('trueCount')) || 0

  const [count, setCount] = useState<number>(0)
  const [messages, setMessages] = useState<Array<{ id: number; username: string; text: string; timestamp: Date }>>([])
  const [totalWinnings, setTotalWinnings] = useState<number>(0)
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false)
  
  // Add ref for chat container
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  // Add fake messages periodically
  useEffect(() => {
    const addMessage = () => {
      const randomMessage = SAMPLE_MESSAGES[Math.floor(Math.random() * SAMPLE_MESSAGES.length)]
      const randomUsername = SAMPLE_USERNAMES[Math.floor(Math.random() * SAMPLE_USERNAMES.length)]
      
      setMessages(prev => [
        ...prev.slice(-49),
        {
          id: Date.now(),
          username: randomUsername,
          text: randomMessage,
          timestamp: new Date()
        }
      ])
    }

    // Add initial messages
    for (let i = 0; i < 8; i++) {
      setTimeout(() => addMessage(), i * 200)
    }

    // Add new message every 0.5-2 seconds
    const interval = setInterval(() => {
      const delay = Math.random() * (2000 - 500) + 500 // Random delay between 0.5-2 seconds
      setTimeout(addMessage, delay)
    }, 1000)

    // Occasionally add burst of messages (simulating exciting moments)
    const burstInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance of burst
        for (let i = 0; i < Math.floor(Math.random() * 3) + 2; i++) {
          setTimeout(addMessage, i * 100)
        }
      }
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(burstInterval)
    }
  }, [])

  const { mutate: stake, isPending } = useStakingSol()
  const { publicKey } = useWallet()

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavHeader />
      <div className="flex-1 max-w-[2000px] w-full mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* Main Stream Section */}
          <div className="lg:col-span-3 min-w-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-[calc(100vh-140px)] bg-gray-800 rounded-lg relative overflow-hidden"
            >
              <div className="w-full h-full flex items-center justify-center">
                <LivestreamPlayer 
                  videoUrl={videoUrl}
                  title={title}
                  startTime={startTime}
                  endTime={endTime}
                  className="w-full aspect-video relative"
                />
              </div>
              
              {/* Live Count Overlay */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-4 right-4 p-3 bg-gray-900/80 rounded-lg backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">True Count:</span>
                  <span className={`text-xl font-mono ${trueCount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {trueCount}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 min-w-0">
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-4 h-[calc(100vh-140px)] flex flex-col overflow-hidden"
            >
              {/* Player History Section */}
              <div className="bg-gray-800/50 rounded-lg p-4 shrink-0">
                <h2 className="text-xl font-bold mb-4">Player History</h2>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm mb-1">Total Winnings</div>
                  <div className="text-2xl font-bold text-green-400">
                    ${totalWinnings.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Chat Section */}
              <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col min-h-0 flex-1">
                <h2 className="text-xl font-bold mb-2 shrink-0">Live Chat</h2>
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto min-h-0 space-y-1 mb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
                >
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          scale: 1,
                          transition: {
                            opacity: { duration: 0.2, ease: "easeOut" },
                            y: { duration: 0.2, ease: "easeOut" },
                            scale: { duration: 0.15, ease: "easeOut" }
                          }
                        }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
                        className="bg-gray-700/50 py-1 px-2 rounded text-sm origin-bottom"
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: 1,
                            transition: { duration: 0.2, delay: 0.1 }
                          }}
                        >
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-blue-400 font-medium">{msg.username}</span>
                            <span className="text-gray-400">
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="text-white text-sm">{msg.text}</div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Chat Input and Stake Button Container */}
                <div className="shrink-0">
                  <div className="flex gap-2 mb-4">
                    <input 
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors text-sm">
                      Send
                    </button>
                  </div>

                  {/* Stake Button */}
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex flex-col space-y-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsStakeModalOpen(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <IconCurrencySolana size={20} />
                          Place Your Stake
                        </span>
                      </motion.button>
                      <div className="flex items-center justify-center">
                        <VaultBalance />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stake Modal */}
      <AnimatePresence>
        {isStakeModalOpen && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStakeModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
            >
              <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Place Your Stake</h3>
                  <button 
                    onClick={() => setIsStakeModalOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-center text-lg mb-4">
                      Stake Amount: 0.1 SOL
                    </div>
                    <VaultBalance />
                    <div className="text-sm text-gray-400 text-center mb-4">
                      {!publicKey && "Please connect your wallet to stake"}
                    </div>
                  </div>
                  
                  <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      stake()
                      setIsStakeModalOpen(false)
                    }}
                    disabled={!publicKey || isPending}
                  >
                    {isPending ? 'Processing...' : 'Confirm Stake (0.1 SOL)'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}