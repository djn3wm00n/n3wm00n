"use client"

import { useRef, useEffect, useState } from "react"

export default function VideoFeature() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 })
  const [aspectRatio, setAspectRatio] = useState("16 / 9") // Default aspect ratio

  useEffect(() => {
    // Get original video dimensions when it's loaded
    const handleVideoMetadata = () => {
      if (videoRef.current) {
        const { videoWidth, videoHeight } = videoRef.current
        setVideoSize({ width: videoWidth, height: videoHeight })

        // Calculate and set the exact aspect ratio from the video
        const ratio = `${videoWidth} / ${videoHeight}`
        setAspectRatio(ratio)

        console.log(`Video dimensions: ${videoWidth}x${videoHeight}, Aspect ratio: ${ratio}`)
      }
    }

    if (videoRef.current) {
      // Add event listener for metadata loaded
      videoRef.current.addEventListener("loadedmetadata", handleVideoMetadata)

      // If metadata is already loaded (e.g., from cache)
      if (videoRef.current.readyState >= 2) {
        handleVideoMetadata()
      }

      // Ensure video plays automatically and handle any autoplay restrictions
      const ensureVideoPlays = () => {
        if (videoRef.current) {
          videoRef.current.play().catch((e) => {
            console.log("Video autoplay prevented:", e)
            // Try again with muted option which browsers are more likely to allow
            if (videoRef.current) {
              videoRef.current.muted = true
              videoRef.current.play().catch((e) => {
                console.log("Video autoplay still prevented even when muted:", e)
              })
            }
          })
        }
      }

      ensureVideoPlays()

      // Try to play video again when window gets focus, in case it was paused when tab was inactive
      window.addEventListener("focus", ensureVideoPlays)
    }

    return () => {
      window.removeEventListener("focus", () => {})
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadedmetadata", handleVideoMetadata)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto overflow-hidden border-4 border-yellow-400/70 rounded-sm"
      style={{
        aspectRatio: aspectRatio,
        maxWidth: videoSize.width > 0 ? `${videoSize.width}px` : "100%",
      }}
    >
      <div className="absolute inset-0 vhs-effect">
        <video
          ref={videoRef}
          src="/videos/new-moon-parallax.mp4"
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
        />
        <div className="absolute inset-0 vhs-tracking"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        {/* VHS Overlay Effects - Static, no interaction */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 mix-blend-color-dodge opacity-10 bg-gradient-to-br from-purple-500 via-transparent to-yellow-500"></div>
          <div className="absolute inset-0 vhs-flicker"></div>
        </div>
      </div>
    </div>
  )
}
