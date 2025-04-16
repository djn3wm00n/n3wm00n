import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { promisify } from "util"

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

export async function GET() {
  try {
    const audioDir = path.join(process.cwd(), "public", "audio")
    const files = await readdir(audioDir)

    // Filter for audio files
    const audioFiles = files.filter((file) => file.endsWith(".mp3") || file.endsWith(".wav") || file.endsWith(".ogg"))

    // Sort files by name
    audioFiles.sort()

    // Create track objects
    const tracks = audioFiles.map((file, index) => {
      return {
        id: index + 1,
        title: file.replace(/\.[^/.]+$/, ""), // Remove file extension
        fileName: file,
        audioSrc: `/audio/${file}`,
      }
    })

    return NextResponse.json({ tracks })
  } catch (error) {
    console.error("Error reading audio directory:", error)
    return NextResponse.json({ tracks: [] }, { status: 500 })
  }
}
