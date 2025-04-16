"use client"
import { Mail, MessageSquare, Phone, Instagram, Youtube } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-12">
      <div className="container max-w-6xl px-4 z-10">
        <header className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-center glitch-text" data-text="Contact">
            Contact
          </h1>
        </header>

        <div className="bg-black/50 border border-yellow-400/50 p-6 rounded-sm max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">GET IN TOUCH</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="w-6 h-6 text-yellow-400 mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-bold">Email</h3>
                <p className="text-gray-300">djn3wm00n@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="w-6 h-6 text-yellow-400 mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-bold">Phone</h3>
                <p className="text-gray-300">+1 (555) n3w-m00n</p>
              </div>
            </div>

            <div className="flex items-start">
              <MessageSquare className="w-6 h-6 text-yellow-400 mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-bold">Social Media</h3>
                <p className="text-gray-300">@djn3wm00n on all platforms</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 border border-yellow-400/30 bg-black/30 rounded-sm">
            <p className="text-yellow-400 font-bold">BOOKING INQUIRIES</p>
            <p className="mt-2">For booking and collaboration inquiries, please email djn3wm00n@gmail.com</p>
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

            {/* Apple Music - Improved icon to match Apple Music logo */}
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
          <p className="text-sm opacity-70 tracking-wide text-center">
            © {new Date().getFullYear()} n3w m00n · ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </main>
  )
}
