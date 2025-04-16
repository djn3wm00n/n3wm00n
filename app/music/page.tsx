"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Volume1, Instagram, Youtube } from "lucide-react"
import VinylPlayer from "@/components/vinyl-player"
import { Slider } from "@/components/ui/slider"

interface Track {
  id: number
  title: string
  duration?: string
  audioSrc: string
  fileName?: string
}

export default function MusicPage() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch tracks from API
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/audio")
        if (!response.ok) throw new Error("Failed to fetch tracks")

        const data = await response.json()

        // If no tracks are found, use fallback tracks
        if (data.tracks.length === 0) {
          const fallbackTracks = [
            { id: 1, title: "Song 1", duration: "3:45", audioSrc: "/audio/song1.mp3" },
            { id: 2, title: "Song 2", duration: "4:12", audioSrc: "/audio/song2.mp3" },
            { id: 3, title: "Song 3", duration: "3:30", audioSrc: "/audio/song3.mp3" },
            { id: 4, title: "Song 4", duration: "3:58", audioSrc: "/audio/song4.mp3" },
            { id: 5, title: "Song 5", duration: "4:25", audioSrc: "/audio/song5.mp3" },
          ]
          setTracks(fallbackTracks)
        } else {
          setTracks(data.tracks)
        }
      } catch (error) {
        console.error("Error fetching tracks:", error)
        // Use fallback tracks if API fails
        const fallbackTracks = [
          { id: 1, title: "Song 1", duration: "3:45", audioSrc: "/audio/song1.mp3" },
          { id: 2, title: "Song 2", duration: "4:12", audioSrc: "/audio/song2.mp3" },
          { id: 3, title: "Song 3", duration: "3:30", audioSrc: "/audio/song3.mp3" },
          { id: 4, title: "Song 4", duration: "3:58", audioSrc: "/audio/song4.mp3" },
          { id: 5, title: "Song 5", duration: "4:25", audioSrc: "/audio/song5.mp3" },
        ]
        setTracks(fallbackTracks)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTracks()
  }, [])

  // Initialize audio element and set up event listeners
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()

      // Set initial volume
      audioRef.current.volume = volume

      // Add event listeners for audio metadata
      audioRef.current.addEventListener("loadedmetadata", handleMetadataLoaded)
      audioRef.current.addEventListener("ended", handleTrackEnded)
      audioRef.current.addEventListener("error", handleAudioError)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadedmetadata", handleMetadataLoaded)
        audioRef.current.removeEventListener("ended", handleTrackEnded)
        audioRef.current.removeEventListener("error", handleAudioError)
        audioRef.current.pause()
      }

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  // Handle track changes
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      // Stop any existing progress tracking
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }

      try {
        // Set new track source
        audioRef.current.src = currentTrack.audioSrc
        audioRef.current.load()

        // If we should be playing, start playback
        if (isPlaying) {
          const playPromise = audioRef.current.play()
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error("Playback error:", error)
              setIsPlaying(false)
            })
          }
        }

        // Start tracking progress
        progressIntervalRef.current = setInterval(() => {
          if (audioRef.current && !isDragging) {
            setCurrentTime(audioRef.current.currentTime)
          }
        }, 1000)
      } catch (error) {
        console.error("Error setting audio source:", error)
        setIsPlaying(false)
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [currentTrack, isPlaying])

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Handle play/pause state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Playback error:", error)
            setIsPlaying(false)
          })
        }
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  // Event handlers
  const handleMetadataLoaded = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)

      // Update track duration in the tracks list
      if (currentTrack) {
        const formattedDuration = formatTime(audioRef.current.duration)
        setTracks((prevTracks) =>
          prevTracks.map((track) => (track.id === currentTrack.id ? { ...track, duration: formattedDuration } : track)),
        )
      }
    }
  }

  const handleTrackEnded = () => {
    playNextTrack()
  }

  const handleAudioError = (e: Event) => {
    console.error("Audio error:", e)
    setIsPlaying(false)

    // Try to play the next track if there's an error
    if (currentTrack) {
      playNextTrack()
    }
  }

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying)
    } else if (tracks.length > 0) {
      setCurrentTrack(tracks[0])
      setIsPlaying(true)
    }
  }

  const playNextTrack = () => {
    if (currentTrack && tracks.length > 0) {
      const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id)
      const nextIndex = (currentIndex + 1) % tracks.length
      setCurrentTrack(tracks[nextIndex])
      setIsPlaying(true)
    } else if (tracks.length > 0) {
      setCurrentTrack(tracks[0])
      setIsPlaying(true)
    }
  }

  const playPrevTrack = () => {
    if (currentTrack && tracks.length > 0) {
      const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id)

      // If we're more than 3 seconds into the song, restart it instead of going to previous
      if (currentTime > 3) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          setCurrentTime(0)
        }
        return
      }

      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length
      setCurrentTrack(tracks[prevIndex])
      setIsPlaying(true)
    } else if (tracks.length > 0) {
      setCurrentTrack(tracks[0])
      setIsPlaying(true)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleProgressChange = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)

    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleProgressDragStart = () => {
    setIsDragging(true)
  }

  const handleProgressDragEnd = () => {
    setIsDragging(false)
  }

  // Helper functions
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return "0:00"

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Get volume icon based on current volume
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="h-5 w-5" />
    if (volume < 0.5) return <Volume1 className="h-5 w-5" />
    return <Volume2 className="h-5 w-5" />
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
          <div className="flex flex-col justify-center items-center">
            <VinylPlayer isPlaying={isPlaying} currentTrack={currentTrack} />

            {/* Progress bar */}
            <div className="w-full mt-8 px-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{currentTrack?.duration || formatTime(duration)}</span>
              </div>
              <Slider
                value={[currentTime]}
                min={0}
                max={duration || 100}
                step={1}
                onValueChange={handleProgressChange}
                onValueCommitStart={handleProgressDragStart}
                onValueCommitEnd={handleProgressDragEnd}
                className="w-full"
              />
            </div>

            {/* Playback controls */}
            <div className="flex justify-center space-x-4 mt-6">
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

            {/* Volume control */}
            <div className="flex items-center justify-center mt-6 w-full px-4">
              <Button
                onClick={toggleMute}
                variant="ghost"
                size="icon"
                className="mr-2 text-yellow-400 hover:bg-transparent hover:text-yellow-500"
              >
                {getVolumeIcon()}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-48"
              />
            </div>
          </div>

          <div className="bg-black/50 border border-yellow-400/50 p-6 rounded-sm">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">TRACKLIST</h2>

            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-pulse text-yellow-400">Loading tracks...</div>
              </div>
            ) : tracks.length === 0 ? (
              <div className="text-center py-8">
                <p>No audio files found.</p>
                <p className="text-sm text-yellow-400 mt-2">
                  Add MP3 files to the /public/audio/ folder to see them here.
                </p>
              </div>
            ) : (
              <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
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
                    <span>{track.duration || "--:--"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-16 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/djn3wm00n?igsh=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>

            {/* SoundCloud - Simple Cloud */}
            <a
              href="https://soundcloud.com/n3w-m00n"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="SoundCloud"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1" />
                <path
                  d="M7,14 C7,12.5 8.5,11 10,11 C10,9.5 11.5,8 13,8 C14.5,8 16,9.5 16,11 C17.5,11 19,12.5 19,14 L7,14 Z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>

            {/* Spotify - Three curved lines */}
            <a
              href="https://open.spotify.com/artist/38LzOlMU6bp1o0VONCN719?si=YkSC2nppR7OfLO5ZPLARSg"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Spotify"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1" />
                <path
                  d="M7,9 C12,7.5 17,9 17,9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M7,12 C12,10.5 17,12 17,12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M7,15 C12,13.5 17,15 17,15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </a>

            {/* Apple Music - Two eighth notes */}
            <a
              href="https://music.apple.com/us/artist/n3w-m00n/1743804011"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Apple Music"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1" />
                <g transform="translate(6, 6)">
                  <circle cx="2" cy="10" r="1.5" fill="currentColor" />
                  <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                  <path d="M3,10 L3,4 L11,3 L11,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3,4 L11,3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </g>
              </svg>
            </a>

            {/* YouTube Music */}
            <a
              href="https://music.youtube.com/channel/UCb7517TATFU0x4s-Ecr1cMQ?si=kfhEHqyoqtOmhgLm"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="YouTube Music"
            >
              <Youtube className="h-6 w-6" />
            </a>
          </div>
          <p className="text-sm opacity-70 tracking-wide text-center">
            © {new Date().getFullYear()} n3w m00n · ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </main>
  )
}
