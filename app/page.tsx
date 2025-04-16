"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Youtube } from "lucide-react"
import VideoFeature from "@/components/video-feature"
import { useEffect, useState } from "react"

export default function Home() {
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    // Set initial window height
    setWindowHeight(window.innerHeight)

    // Update window height on resize
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="container max-w-6xl px-4 py-4 z-10">
        <header className="mb-6 glitch-container">
          <h1 className="text-5xl md:text-7xl font-bold text-center glitch-text" data-text="n3w m00n">
            n3w m00n
          </h1>
          <p className="text-lg md:text-xl text-center mt-2 text-yellow-400 tracking-wider flicker-text">
            MUSICIAN / DIGITAL ARTIST / PRODUCER
          </p>
        </header>

        <div className="flex justify-center mb-6">
          <VideoFeature />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-black/50 border border-yellow-400/50 p-4 rounded-sm transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold mb-2 text-yellow-400">LATEST RELEASE</h2>
            <p className="text-lg mb-4">"Slow" - Nina Lim - Coming May 9th!</p>
            <a href="https://distrokid.com/hyperfollow/ninalim/slow" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                PRESAVE
              </Button>
            </a>
          </div>
          <div className="bg-black/50 border border-yellow-400/50 p-4 rounded-sm transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold mb-2 text-yellow-400">UPCOMING SHOWS</h2>
            <p className="text-lg">Coming soon - stay tuned!</p>
          </div>
        </div>

        <div className="text-center mb-6">
          <Link href="/music">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-6 py-4 rounded-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-5 w-5"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="2" />
                <path d="M12 14a7.5 7.5 0 0 0 0-4" />
              </svg>
              LISTEN NOW
            </Button>
          </Link>
        </div>

        <footer className="flex flex-col items-center mt-4">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
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

            {/* Apple Music - Two eighth notes in a circle */}
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
                <g transform="translate(7, 6)">
                  {/* Eighth note 1 */}
                  <circle cx="2.5" cy="10" r="1.5" fill="currentColor" />
                  <path d="M2.5,10 L2.5,4" stroke="currentColor" strokeWidth="1.5" fill="none" />

                  {/* Eighth note 2 */}
                  <circle cx="7.5" cy="10" r="1.5" fill="currentColor" />
                  <path d="M7.5,10 L7.5,4" stroke="currentColor" strokeWidth="1.5" fill="none" />

                  {/* Beam connecting the notes */}
                  <path d="M2.5,4 L7.5,4" stroke="currentColor" strokeWidth="1.5" fill="none" />
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
          <p className="text-xs opacity-70 tracking-wide">
            © {new Date().getFullYear()} n3w m00n · ALL RIGHTS RESERVED
          </p>
        </footer>
      </div>
    </main>
  )
}
