'use client'

import { useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function StreamView() {
  const [count, setCount] = useState<number>(0)
  const [messages, setMessages] = useState<string[]>([])
  const [totalWinnings, setTotalWinnings] = useState<number>(0)
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false)
  
  useEffect(() => {
    const fetchCount = async () => {
      const mockCount = Math.floor(Math.random() * 100)
      setCount(mockCount)
      setTotalWinnings(Math.floor(Math.random() * 10000))
    }
    
    fetchCount()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Navigation */}
        <nav className="flex justify-between mb-6 border-b border-gray-800 pb-4">
          <div>People</div>
          <div>About</div>
          <div>Money Earned</div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Stream Section - Takes up 3 columns */}
          <div className="lg:col-span-3 min-w-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full aspect-video bg-gray-800 rounded-lg relative h-[600px] overflow-hidden"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl">Live Stream</span>
              </div>
              
              {/* Live Count Overlay */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-4 right-4 p-3 bg-gray-900/80 rounded-lg backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Live Count:</span>
                  <span className="text-xl font-mono text-blue-400">{count}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 min-w-0">
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-4"
            >
              {/* Player History Section */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h2 className="text-xl font-bold mb-4">Player History</h2>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm mb-1">Total Winnings</div>
                  <div className="text-2xl font-bold text-green-400">
                    ${totalWinnings.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Chat Section */}
              <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col space-y-4">
                <div className="h-[300px] flex flex-col">
                  <h2 className="text-xl font-bold mb-4">Live Chat</h2>
                  <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                    {messages.length === 0 ? (
                      <p className="text-gray-400 text-center">Discussion on this kino starts!</p>
                    ) : (
                      messages.map((msg, i) => (
                        <div key={i} className="bg-gray-700/50 p-2 rounded">
                          {msg}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                      Send
                    </button>
                  </div>
                </div>

                {/* Stake Button - Now below chat in the same container */}
                <div className="pt-4 border-t border-gray-700">
                  <motion.button 
                    onClick={() => setIsStakeModalOpen(true)}
                    className="relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                    w-full px-8 py-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl 
                    border-2 border-transparent hover:border-blue-400/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl blur-xl"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="relative text-xl font-bold text-white tracking-wider">
                      Place Your Stake
                    </span>
                  </motion.button>
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
                    <input 
                      type="number"
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                      placeholder="0.00"
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                      <span>Min: 0.1 SOL</span>
                      <span>Max: 10 SOL</span>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors font-medium text-lg"
                    onClick={() => setIsStakeModalOpen(false)}
                  >
                    Confirm Stake
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