import React, { useState, useEffect } from "react"
import "./styles.css"

const App: React.FC = () => {
  const [text, setText] = useState("")
  const [currentBackground, setCurrentBackground] = useState("hsl(0, 0%, 0%)")
  const [targetBackground, setTargetBackground] = useState(generateBackground(""))

  // Generate a new background color based on text input
  function generateBackground(inputText: string): string {
    const hue = (inputText.length * 30) % 360 // Rotate hue based on text length
    const saturation = 60 + (inputText.length % 40) // Adjust saturation
    const lightness = 40 + (inputText.length % 30) // Adjust lightness
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  // Smoothly transition from currentBackground to targetBackground
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prevBackground) => {
        // Parse HSL values from the current and target backgrounds
        const prevMatch = prevBackground.match(/hsl\\((\\d+), (\\d+)%, (\\d+)%\\)/)
        const targetMatch = targetBackground.match(/hsl\\((\\d+), (\\d+)%, (\\d+)%\\)/)

        if (!prevMatch || !targetMatch) return targetBackground // Fallback if parsing fails

        const [prevHue, prevSaturation, prevLightness] = prevMatch.slice(1).map(Number)
        const [targetHue, targetSaturation, targetLightness] = targetMatch.slice(1).map(Number)

        // Smoothly transition each HSL component
        const newHue = approachValue(prevHue, targetHue, 2) // Adjust hue smoothly
        const newSaturation = approachValue(prevSaturation, targetSaturation, 1)
        const newLightness = approachValue(prevLightness, targetLightness, 1)

        // Stop animation when close enough to the target
        if (
          newHue === targetHue &&
          newSaturation === targetSaturation &&
          newLightness === targetLightness
        ) {
          clearInterval(interval)
        }

        return `hsl(${newHue}, ${newSaturation}%, ${newLightness}%)`
      })
    }, 30) // Adjust interval for smooth transitions

    return () => clearInterval(interval)
  }, [targetBackground])

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
