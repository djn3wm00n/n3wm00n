"use client"

import { useRef, useEffect } from "react"

interface VinylPlayerProps {
  isPlaying: boolean
  currentTrack: { title: string } | null
}

export default function VinylPlayer({ isPlaying, currentTrack }: VinylPlayerProps) {
  const vinylRef = useRef<HTMLDivElement>(null)
  const armRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (vinylRef.current) {
      if (isPlaying) {
        vinylRef.current.style.animationPlayState = "running"
      } else {
        vinylRef.current.style.animationPlayState = "paused"
      }
    }

    if (armRef.current) {
      if (isPlaying) {
        armRef.current.style.transform = "rotate(0deg)" // Arm off the vinyl when playing (reversed)
      } else {
        armRef.current.style.transform = "rotate(25deg)" // Arm on the vinyl when stopped (reversed)
      }
    }
  }, [isPlaying])

  return (
    <div className="flex justify-center items-center w-full">
      <div className="vinyl-player-container relative w-80 h-80 md:w-96 md:h-96">
        {/* Turntable base */}
        <div className="vinyl-player-base absolute inset-0 bg-black/80 rounded-md border border-yellow-400/30">
          {/* Turntable platter */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
            {/* Vinyl record */}
            <div
              ref={vinylRef}
              className={`vinyl-record w-[90%] h-[90%] rounded-full bg-black relative ${isPlaying ? "animate-spin-slow" : ""}`}
              style={{
                animationDuration: "2s",
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
              }}
            >
              {/* Vinyl edge */}
              <div className="absolute inset-0 rounded-full border-8 border-gray-800"></div>

              {/* Center hole */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 rounded-full bg-yellow-400 flex items-center justify-center">
                <div className="w-1/3 h-1/3 rounded-full bg-black"></div>
              </div>

              {/* Vinyl grooves - keeping these for better visibility */}
              <div className="absolute inset-0 vinyl-grooves rounded-full"></div>

              {/* Cross-shaped visual indicators for rotation */}
              <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gray-600 rounded-full"></div>
              <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gray-600 rounded-full"></div>
              <div className="absolute left-[10%] top-1/2 transform -translate-y-1/2 w-8 h-2 bg-gray-600 rounded-full"></div>
              <div className="absolute right-[10%] top-1/2 transform -translate-y-1/2 w-8 h-2 bg-gray-600 rounded-full"></div>
            </div>
          </div>

          {/* Tonearm */}
          <div className="absolute top-[20%] right-[15%] w-[40%] h-[10%]">
            <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-gray-700 border border-gray-600 z-10"></div>
            <div
              ref={armRef}
              className="absolute top-3 right-3 w-[80%] h-2 bg-gray-700 rounded-full origin-right transform rotate-0 transition-transform duration-700"
              style={{ transformOrigin: "right center" }}
            >
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-yellow-400"></div>
            </div>
          </div>

          {/* Turntable controls */}
          <div className="absolute bottom-[10%] right-[10%] flex space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-500 border border-gray-600"></div>
            <div className="w-8 h-3 rounded-sm bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
