import React, { useState, useEffect } from "react"
import "./styles.css"

const App: React.FC = () => {
  const [text, setText] = useState("")
  const [background, setBackground] = useState(generateBackground(""))

  // Generate a smooth transition-friendly background based on text
  function generateBackground(inputText: string): string {
    const colors = Array.from({ length: 20 }, (_, index) => {
      const charCode = inputText.charCodeAt(index % inputText.length) || 100
      const hue = (charCode * 7) % 360
      const saturation = 50 + (charCode % 50)
      const lightness = (charCode % 30) / 2
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    })
    return `radial-gradient(circle, ${colors.join(", ")})`
  }

  // Debounced update to smooth out transitions
  useEffect(() => {
    const timeout = setTimeout(() => {
      setBackground(generateBackground(text))
    }, 150)
    return () => clearTimeout(timeout)
  }, [text])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  return (
    <div className="editor-container" style={{ background, transition: "background 2s ease" }}>
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
