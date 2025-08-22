"use client"

import { useEffect } from "react"

export default function ChunkErrorHandler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleChunkError = (event: ErrorEvent) => {
      // Check if the error is a ChunkLoadError
      if (event.error && event.error.name === "ChunkLoadError") {
        console.warn("ChunkLoadError detected, reloading page...")
        window.location.reload()
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Check if the rejection is related to chunk loading
      if (event.reason && event.reason.message && event.reason.message.includes("Loading chunk")) {
        console.warn("Chunk loading rejection detected, reloading page...")
        window.location.reload()
      }
    }

    // Listen for global errors
    window.addEventListener("error", handleChunkError)
    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    return () => {
      window.removeEventListener("error", handleChunkError)
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

  return <>{children}</>
}