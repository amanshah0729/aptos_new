'use client'

import {WalletButton} from '@/components/solana/solana-provider'
import { RiPokerSpadesFill } from 'react-icons/ri'

const videos = [
  { id: 1, title: "Nature Scenery", author: "NatureFilms" },
  { id: 2, title: "City Timelapse", author: "UrbanExplorer" },
  { id: 3, title: "Cooking Tutorial", author: "ChefMaster" },
  { id: 4, title: "Fitness Workout", author: "FitLife" },
  { id: 5, title: "Travel Vlog", author: "Wanderlust" },
  { id: 6, title: "Tech Review", author: "TechGuru" },
]

export default function VideoFeed() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[2000px] w-full mx-auto">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <RiPokerSpadesFill className="text-3xl" />
            <h1 className="text-2xl font-bold">Fuck The House!</h1>
          </div>
          <WalletButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
          {videos.map((video) => (
            <div key={video.id} className="bg-gray-800/50 rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-700 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
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
                      onClick={() => console.log(`Staking for video ${video.id}`)}
                    >
                      Stake
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

