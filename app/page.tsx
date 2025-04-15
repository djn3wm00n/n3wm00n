"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Disc3, Cloud } from "lucide-react"
import VideoFeature from "@/components/video-feature"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="container max-w-6xl px-4 py-10 z-10">
        <header className="mb-12 glitch-container">
          <h1 className="text-6xl md:text-8xl font-bold text-center glitch-text" data-text="n3w m00n">
            n3w m00n
          </h1>
          <p className="text-xl md:text-2xl text-center mt-4 text-yellow-400 tracking-wider flicker-text">
            MUSICIAN / DIGITAL ARTIST / PRODUCER
          </p>
        </header>

        <div className="flex justify-center mb-16">
          <VideoFeature />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/50 border border-yellow-400/50 p-6 rounded-sm transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">LATEST RELEASE</h2>
            <p className="text-xl mb-6">"Slow" - Nina Lim - out now!</p>
            <a href="https://distrokid.com/hyperfollow/ninalim/slow" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                LISTEN NOW
              </Button>
            </a>
          </div>
          <div className="bg-black/50 border border-yellow-400/50 p-6 rounded-sm transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">UPCOMING SHOWS</h2>
            <p className="text-xl">Coming soon - stay tuned!</p>
          </div>
        </div>

        <div className="text-center mb-12">
          <Link href="/music">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-xl px-8 py-6 rounded-sm">
              <Disc3 className="mr-2 h-6 w-6" />
              ENTER THE MUSIC ZONE
            </Button>
          </Link>
        </div>

        <footer className="flex flex-col items-center mt-16">
          <div className="flex space-x-6 mb-8">
            <a
              href="https://www.instagram.com/djn3wm00n?igsh=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Instagram className="h-8 w-8" />
            </a>
            <a href="https://soundcloud.com/n3w-m00n" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Cloud className="h-8 w-8" />
            </a>
          </div>
          <p className="text-sm opacity-70 tracking-wide">
            © {new Date().getFullYear()} n3w m00n · ALL RIGHTS RESERVED
          </p>
        </footer>
      </div>
    </main>
  )
}
