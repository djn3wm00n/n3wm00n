"use client"

import { useRef, useEffect, useState } from "react"

export default function VideoFeature() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 })
  const [aspectRatio, setAspectRatio] = useState("16 / 9") // Default aspect ratio
  const [scale, setScale] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Get original video dimensions when it's loaded
    const handleVideoMetadata = () => {
      if (videoRef.current) {
        const { videoWidth, videoHeight } = videoRef.current
        setVideoSize({ width: videoWidth, height: videoHeight })

        // Calculate and set the exact aspect ratio from the video
        const ratio = `${videoWidth} / ${videoHeight}`
        setAspectRatio(ratio)

        // Mark video as loaded
        setIsLoaded(true)

        // Calculate initial scale
        calculateScale()

        console.log(`Video dimensions: ${videoWidth}x${videoHeight}, Aspect ratio: ${ratio}`)
      }
    }

    // Calculate scale based on viewport size
    const calculateScale = () => {
      if (videoRef.current && containerRef.current) {
        const { videoWidth, videoHeight } = videoRef.current

        // Get available viewport height (accounting for other elements)
        // We'll use 70vh as a reasonable target for the video height to avoid cropping
        const targetHeight = window.innerHeight * 0.7

        // Calculate how much we need to scale down to fit in the viewport
        const heightRatio = targetHeight / videoHeight

        // Limit the maximum width to the container width
        const containerWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth * 0.9
        const widthRatio = containerWidth / videoWidth

        // Use the smaller ratio to ensure it fits both dimensions
        const newScale = Math.min(heightRatio, widthRatio, 1) // Don't scale up, only down

        // Apply scale with a small delay to ensure DOM is ready
        setTimeout(() => {
          setScale(newScale)
          console.log(`Scaling video by ${newScale}`)
        }, 50)
      }
    }

    // Handle window resize
    const handleResize = () => {
      calculateScale()
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
      window.addEventListener("resize", handleResize)

      // Additional resize check after a delay to handle initial rendering issues
      setTimeout(calculateScale, 500)
    }

    return () => {
      window.removeEventListener("focus", () => {})
      window.removeEventListener("resize", handleResize)
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadedmetadata", handleVideoMetadata)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative mx-auto overflow-hidden border-4 border-yellow-400/70 rounded-sm"
      style={{
        aspectRatio: aspectRatio,
        width: videoSize.width > 0 ? `${videoSize.width * scale}px` : "100%",
        height: videoSize.height > 0 ? `${videoSize.height * scale}px` : "auto",
        maxWidth: "100%",
        visibility: isLoaded ? "visible" : "hidden", // Hide until loaded to prevent flash of incorrect size
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
          onLoadedData={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 vhs-tracking"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        {/* VHS Overlay Effects - Static, no interaction */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 mix-blend-color-dodge opacity-10 bg-gradient-to-br from-purple-500 via-transparent to-yellow-500"></div>
          <div className="absolute inset-0 vhs-flicker"></div>
        </div>
      </div>

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-yellow-400 animate-pulse">Loading...</div>
        </div>
      )}
    </div>
  )
}
