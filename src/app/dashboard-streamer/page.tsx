'use client'

import NavHeader from '@/components/ui/nav-header'
import LoadingScreen from '@/components/ui/loading-screen'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

// Mock data - replace with real data fetching
const mockStakerHistory = [
  { id: 1, viewer: "CryptoFan99", amount: 500, date: "2024-01-15", outcome: "win" },
  { id: 2, viewer: "BetMaster", amount: 200, date: "2024-01-14", outcome: "loss" },
  { id: 3, viewer: "LuckyStaker", amount: 1000, date: "2024-01-13", outcome: "win" },
]

export default function StreamerDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [earnings, setEarnings] = useState(15750)
  const [totalStakers, setTotalStakers] = useState(127)
  const [activeStakers, setActiveStakers] = useState(42)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleCashout = async () => {
    // Add cashout logic here
    toast.success('Cashout request submitted!')
  }

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <motion.div 
        className="min-h-screen bg-black text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <NavHeader />
        
        <motion.div
          className="max-w-7xl mx-auto p-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Title */}
          <motion.h1
            variants={item}
            className="text-4xl font-bold mb-8"
          >
            Streamer Dashboard
          </motion.h1>

          {/* Earnings Card */}
          <motion.div
            variants={item}
            className="bg-gray-800 rounded-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Available Earnings</h2>
            <div className="flex items-center justify-between">
              <motion.div 
                className="text-5xl font-bold text-green-500"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                ${earnings.toLocaleString()}
              </motion.div>
              <motion.button
                onClick={handleCashout}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cashout
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            variants={item}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-gray-400 mb-2">Total Stakers</h3>
              <p className="text-2xl font-bold">{totalStakers}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-gray-400 mb-2">Active Stakers</h3>
              <p className="text-2xl font-bold text-blue-500">{activeStakers}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-gray-400 mb-2">Win Rate</h3>
              <p className="text-2xl font-bold text-green-500">62%</p>
            </div>
          </motion.div>

          {/* Staker History */}
          <motion.div
            variants={item}
            className="bg-gray-800 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Recent Staker Activity</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400">
                    <th className="pb-4">Viewer</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Outcome</th>
                    <th className="pb-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStakerHistory.map((stake) => (
                    <tr key={stake.id} className="border-t border-gray-700">
                      <td className="py-4">{stake.viewer}</td>
                      <td className="py-4">${stake.amount}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          stake.outcome === 'win' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                        }`}>
                          {stake.outcome}
                        </span>
                      </td>
                      <td className="py-4">{stake.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}
