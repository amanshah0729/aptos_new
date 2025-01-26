'use client'

import NavHeader from '@/components/ui/nav-header'
import LoadingScreen from '@/components/ui/loading-screen'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const videos = [
  { id: 1, title: "Nature Scenery", author: "NatureFilms" },
  { id: 2, title: "City Timelapse", author: "UrbanExplorer" },
  { id: 3, title: "Cooking Tutorial", author: "ChefMaster" },
  { id: 4, title: "Fitness Workout", author: "FitLife" },
  { id: 5, title: "Travel Vlog", author: "Wanderlust" },
  { id: 6, title: "Tech Review", author: "TechGuru" },
]

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

export default function VideoFeed() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1350)

    return () => clearTimeout(timer)
  }, [])

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
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={item}
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => router.push('/stream')}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="aspect-video bg-gray-900 relative">
                <motion.div 
                  className="absolute bottom-2 right-2 bg-red-600 px-2 py-1 rounded text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { delay: 0.5, duration: 0.3 }
                  }}
                >
                  LIVE
                </motion.div>
              </div>
              <motion.div 
                className="p-4"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: 0.2, duration: 0.3 }
                }}
              >
                <h2 className="font-semibold text-lg mb-1">{video.title}</h2>
                <p className="text-sm text-gray-400">{video.author}</p>
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">True Count:</span>
                      <motion.span 
                        className={`font-mono text-lg ${Math.random() < 0.5 ? 'text-red-500' : 'text-green-500'}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: 0.3, duration: 0.3 }
                        }}
                      >
                        {Math.floor(Math.random() * 21) - 10}
                      </motion.span>
                    </div>
                    <motion.button 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log(`Staking for video ${video.id}`)
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { delay: 0.4, duration: 0.3 }
                      }}
                    >
                      Stake
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  )
}

