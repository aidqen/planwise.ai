'use client'

import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)
        
        // Set initial value
        setMatches(media.matches)

        // Create event listener
        const listener = (e) => setMatches(e.matches)
        
        // Start listening for changes
        media.addEventListener('change', listener)

        // Clean up
        return () => media.removeEventListener('change', listener)
    }, [query])

    return matches
}

// Preset queries
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
