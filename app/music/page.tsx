"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react"
import VinylPlayer from "@/components/vinyl-player"

interface Track {
  id: number
  title: string
  duration: string
  audioSrc: string
}

export default function MusicPage() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Updated tracks with simplified titles
  const tracks: Track[] = [
    { id: 1, title: "Song 1", duration: "3:45", audioSrc: "/audio/song1.mp3" },
    { id: 2, title: "Song 2", duration: "4:12", audioSrc: "/audio/song2.mp3" },
    { id: 3, title: "Song 3", duration: "3:30", audioSrc: "/audio/song3.mp3" },
  ]

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    if (currentTrack) {
      // Set a flag to track if we've attempted to load the audio
      let audioLoaded = false

      // Add error handling for audio loading
      const handleError = () => {
        console.log("Audio file not found or not supported:", currentTrack.audioSrc)
        setIsPlaying(false)
        audioLoaded = false
      }

      audioRef.current.onerror = handleError

      try {
        audioRef.current.src = currentTrack.audioSrc
        audioLoaded = true

        if (isPlaying && audioLoaded) {
          audioRef.current.play().catch((e) => {
            console.error("Audio playback error:", e)
            setIsPlaying(false)
          })
        }
      } catch (error) {
        console.error("Error setting audio source:", error)
        setIsPlaying(false)
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.onerror = null
      }
    }
  }, [currentTrack, isPlaying])

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    if (currentTrack) {
      if (isPlaying) {
        audioRef.current?.pause()
        setIsPlaying(false)
      } else {
        if (audioRef.current) {
          audioRef.current.play().catch((e) => {
            console.error("Audio playback error:", e)
            alert("Audio file not found or not supported. Please add audio files to the project.")
            setIsPlaying(false)
          })
          setIsPlaying(true)
        }
      }
    } else if (tracks.length > 0) {
      setCurrentTrack(tracks[0])
      // Don't set isPlaying to true here, let the useEffect handle it
    }
  }

  const playNextTrack = () => {
    if (currentTrack && tracks.length > 0) {
      const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id)
      const nextIndex = (currentIndex + 1) % tracks.length
      setCurrentTrack(tracks[nextIndex])
      setIsPlaying(true)
    }
  }

  const playPrevTrack = () => {
    if (currentTrack && tracks.length > 0) {
      const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id)
      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length
      setCurrentTrack(tracks[prevIndex])
      setIsPlaying(true)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-12">
      <div className="container max-w-6xl px-4 z-10">
        <header className="mb-8 flex justify-between items-center">
          <Link href="/">
            <Button
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              <Home className="mr-2 h-5 w-5" />
              HOME
            </Button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-center glitch-text" data-text="Music">
            Music
          </h1>
          <div className="w-[100px]"></div> {/* Spacer for centering */}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div className="flex justify-center items-center">
            <VinylPlayer isPlaying={isPlaying} currentTrack={currentTrack} />
          </div>

          <div className="bg-black/50 border border-yellow-400/50 p-6 rounded-sm">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">TRACKLIST</h2>

            <div className="space-y-4 mb-8">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => handleTrackSelect(track)}
                  className={`flex justify-between p-3 cursor-pointer hover:bg-yellow-400/20 transition-colors ${
                    currentTrack?.id === track.id ? "bg-yellow-400/30 border-l-4 border-yellow-400" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-4">{track.id}.</span>
                    <span className="text-xl">{track.title}</span>
                  </div>
                  <span>{track.duration}</span>
                </div>
              ))}
              <div className="mt-4 p-3 text-yellow-400 text-sm border border-yellow-400/30 bg-black/30">
                Note: Add MP3 files to the /public/audio/ folder named song1.mp3, song2.mp3, and song3.mp3
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <Button
                onClick={playPrevTrack}
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                <SkipBack className="h-6 w-6" />
              </Button>
              <Button
                onClick={togglePlayPause}
                variant="outline"
                size="icon"
                className="h-16 w-16 rounded-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </Button>
              <Button
                onClick={playNextTrack}
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex items-center justify-center mt-6">
              <Volume2 className="h-5 w-5 mr-2 text-yellow-400" />
              <div className="w-48 h-2 bg-gray-700 rounded-full">
                <div className="w-3/4 h-full bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
