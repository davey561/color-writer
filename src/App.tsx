import React, { useState, useEffect } from "react"
import "./styles.css"

const App: React.FC = () => {
  const [text, setText] = useState(() => {
    // Load text from localStorage on initialization
    return localStorage.getItem("editor-text") || ""
  })
  const [currentBackground, setCurrentBackground] = useState("hsl(0, 0%, 10%)")
  const [targetBackground, setTargetBackground] = useState(generateBackground(text))

  // Generate a new background color based on text input
  function generateBackground(inputText: string): string {
    const hue = (inputText.length * 5) % 360 // Extremely small hue change for subtle shifts
    const saturation = 15 + (inputText.length % 5) // Lower saturation for minimal shifts
    const lightness = 10 + (inputText.length % 2) // Keep lightness low for uniform darkness
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  // Smoothly transition from currentBackground to targetBackground
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prevBackground) => {
        // Parse HSL values from the current and target backgrounds
        const prevMatch = prevBackground.match(/hsl\((\d+), (\d+)%, (\d+)%\)/)
        const targetMatch = targetBackground.match(/hsl\((\d+), (\d+)%, (\d+)%\)/)

        if (!prevMatch || !targetMatch) return targetBackground // Fallback if parsing fails

        const [prevHue, prevSaturation, prevLightness] = prevMatch.slice(1).map(Number)
        const [targetHue, targetSaturation, targetLightness] = targetMatch.slice(1).map(Number)

        // Smoothly transition each HSL component with even smaller steps
        const newHue = approachValue(prevHue, targetHue, 0.01) // Extremely small step for hue
        const newSaturation = approachValue(prevSaturation, targetSaturation, 0.005)
        const newLightness = approachValue(prevLightness, targetLightness, 0.005)

        return `hsl(${newHue}, ${newSaturation}%, ${newLightness}%)`
      })
    }, 0) // No timeout delay

    return () => clearInterval(interval)
  }, [targetBackground])

  // Save text to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("editor-text", text)
  }, [text])

  // Helper function to approach a target value smoothly
  const approachValue = (current: number, target: number, step: number): number => {
    if (current < target) return Math.min(current + step, target)
    if (current > target) return Math.max(current - step, target)
    return current
  }

  // Handle text input changes
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value
    setText(input)
    setTargetBackground(generateBackground(input))
  }

  return (
    <div
      className="editor-container"
      style={{ background: currentBackground, transition: "background 0.2s linear" }}
    >
      <textarea
        className="editor"
        value={text}
        onChange={handleChange}
        placeholder="Start typing..."
        autoFocus
      />
    </div>
  )
}

export default App
