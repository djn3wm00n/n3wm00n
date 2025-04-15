"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"

export default function InteractiveGif() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }

    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - left) / dimensions.width) * 100
      const y = ((e.clientY - top) / dimensions.height) * 100
      setPosition({ x, y })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current && e.touches[0]) {
      const { left, top } = containerRef.current.getBoundingClientRect()
      const x = ((e.touches[0].clientX - left) / dimensions.width) * 100
      const y = ((e.touches[0].clientY - top) / dimensions.height) * 100
      setPosition({ x, y })
    }
  }

  // Calculate distortion effect based on mouse position
  const distortionX = Math.min(Math.max((position.x - 50) / 50, -1), 1) * 10
  const distortionY = Math.min(Math.max((position.y - 50) / 50, -1), 1) * 10
  const brightness = 100 + Math.abs(distortionX) * 10

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-xl aspect-video overflow-hidden border-4 border-yellow-400/70 rounded-sm"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <div
        className="absolute inset-0 vhs-effect"
        style={{
          transform: `perspective(1000px) rotateX(${distortionY}deg) rotateY(${distortionX}deg)`,
          filter: `brightness(${brightness}%) contrast(110%)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Image
          src="/placeholder.svg?height=480&width=640"
          alt="90s VHS Style Video"
          width={640}
          height={480}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 vhs-tracking"></div>
      </div>
    </div>
  )
}
