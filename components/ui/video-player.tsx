"use client"

import * as React from "react"
import { useRef, useState, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  poster?: string
  src: string
  className?: string
}

export function VideoPlayer({ poster, src, className, ...props }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isDragging, setIsDragging] = useState(false)

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        if (playing) {
          videoRef.current.pause()
          setPlaying(false)
        } else {
          await videoRef.current.play()
          setPlaying(true)
        }
      } catch (error) {
        console.error('Error toggling play:', error)
      }
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      setLoading(false)
    }
  }

  const handlePlay = () => {
    setPlaying(true)
  }

  const handlePause = () => {
    setPlaying(false)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted
      setMuted(!muted)
    }
  }

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setPlaying(true)
    }
  }

  const handlePlayButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    togglePlay()
  }

  const handleVideoClick = () => {
    togglePlay()
  }

  // Custom progress bar handlers
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return
    
    const rect = progressRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const progressWidth = rect.width
    const newTime = (clickX / progressWidth) * duration
    
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleProgressMouseDown = () => {
    setIsDragging(true)
  }

  const handleProgressMouseUp = () => {
    setIsDragging(false)
  }

  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !progressRef.current || !videoRef.current) return
    
    const rect = progressRef.current.getBoundingClientRect()
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const progressWidth = rect.width
    const newTime = (clickX / progressWidth) * duration
    
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="relative group bg-black rounded-lg overflow-hidden w-full">
      <video
        ref={videoRef}
        className={cn("w-full h-auto max-h-[70vh] object-contain cursor-pointer", className)}
        poster={poster}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={handlePlay}
        onPause={handlePause}
        onClick={handleVideoClick}
        {...props}
      />
      
      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Center play button */}
      {!playing && !loading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <button
            type="button"
            className="h-20 w-20 rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-110 transition-all duration-200 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
            onClick={handlePlayButtonClick}
          >
            <Play className="h-10 w-10 ml-1" />
          </button>
        </div>
      )}

      {/* Controls overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 via-transparent to-transparent z-30 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
          {/* Custom Progress Bar */}
          <div className="mb-3">
            <div
              ref={progressRef}
              className="relative h-1.5 bg-white/20 rounded-full cursor-pointer group/progress hover:h-2 transition-all duration-200"
              onClick={handleProgressClick}
              onMouseDown={handleProgressMouseDown}
              onMouseUp={handleProgressMouseUp}
              onMouseMove={handleProgressMouseMove}
            >
              {/* Progress track */}
              <div 
                className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-150 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
              
              {/* Progress thumb */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-all duration-200 hover:scale-125"
                style={{ left: `calc(${progressPercentage}% - 6px)` }}
              />
              
              {/* Hover preview */}
              <div className="absolute top-0 left-0 h-full bg-white/40 rounded-full transition-all duration-150 ease-out opacity-0 group-hover/progress:opacity-100" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            {/* Time display */}
            <span className="text-sm text-white font-medium tracking-wide">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
