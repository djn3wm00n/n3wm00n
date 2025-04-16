"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div ref={menuRef} className="fixed top-4 left-4 z-50">
      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 bg-black/70 border-2 border-yellow-400/70 rounded-sm hover:bg-yellow-400/20 transition-colors"
        aria-label="Menu"
      >
        <Menu className="w-6 h-6 text-yellow-400" />
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-48 bg-black/90 border-2 border-yellow-400/70 rounded-sm overflow-hidden">
          <div className="menu-glitch-container">
            <nav className="py-2">
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/"
                    className={`block px-4 py-2 hover:bg-yellow-400/20 transition-colors ${
                      pathname === "/" ? "text-yellow-400" : "text-white"
                    }`}
                  >
                    HOME
                  </Link>
                </li>
                <li>
                  <Link
                    href="/music"
                    className={`block px-4 py-2 hover:bg-yellow-400/20 transition-colors ${
                      pathname === "/music" ? "text-yellow-400" : "text-white"
                    }`}
                  >
                    MUSIC
                  </Link>
                </li>
                <li>
                  <a
                    href="https://linktr.ee/djn3wm00n"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 hover:bg-yellow-400/20 transition-colors text-white"
                  >
                    LINKTREE
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={`block px-4 py-2 hover:bg-yellow-400/20 transition-colors ${
                      pathname === "/contact" ? "text-yellow-400" : "text-white"
                    }`}
                  >
                    CONTACT ME
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* VHS Effect Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 vhs-tracking opacity-20"></div>
            <div className="absolute inset-0 vhs-flicker"></div>
          </div>
        </div>
      )}
    </div>
  )
}
