'use client'

import NavHeader from '@/components/ui/nav-header'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const videos = [
  { id: 1, title: "Nature Scenery", author: "NatureFilms" },
  { id: 2, title: "City Timelapse", author: "UrbanExplorer" },
  { id: 3, title: "Cooking Tutorial", author: "ChefMaster" },
  { id: 4, title: "Fitness Workout", author: "FitLife" },
  { id: 5, title: "Travel Vlog", author: "Wanderlust" },
  { id: 6, title: "Tech Review", author: "TechGuru" },
]

export default function VideoFeed() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <NavHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => router.push('/stream')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="aspect-video bg-gray-900 relative">
              <div className="absolute bottom-2 right-2 bg-red-600 px-2 py-1 rounded text-sm">
                LIVE
              </div>
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-1">{video.title}</h2>
              <p className="text-sm text-gray-400">{video.author}</p>
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">True Count:</span>
                    <span className={`font-mono text-lg ${Math.random() < 0.5 ? 'text-red-500' : 'text-green-500'}`}>
                      {Math.floor(Math.random() * 21) - 10}
                    </span>
                  </div>
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation() // Prevent triggering the parent div's onClick
                      console.log(`Staking for video ${video.id}`)
                    }}
                  >
                    Stake
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

