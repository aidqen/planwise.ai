import confetti from "canvas-confetti";
import { useRef } from "react"

export function ConfettiButton({ children }) {
  const buttonRef = useRef(null)


  const handleConfetti2 = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.8 },
      colors: [
        '#ff0000',
        '#ff7f00',
        '#ffff00',
        '#00ff00',
        '#0000ff',
        '#4b0082',
        '#8b00ff',
      ],
    })
  }
  return <div ref={buttonRef} onClick={handleConfetti2}>{children}</div>
}
