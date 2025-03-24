"use client"

import { useState } from "react"

interface ColorSelectorProps {
  colors: string[]
  selectedColor: string
  onChange?: (color: string) => void
}

export default function ColorSelector({ colors, selectedColor, onChange }: ColorSelectorProps) {
  const [selected, setSelected] = useState(selectedColor)

  const handleColorChange = (color: string) => {
    setSelected(color)
    if (onChange) {
      onChange(color)
    }
  }

  return (
    <div className="flex gap-1">
      {colors.map((color) => (
        <div
          key={color}
          className={`w-5 h-5 rounded-full cursor-pointer border ${
            selected === color ? "ring-1 ring-black ring-offset-1" : ""
          }`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorChange(color)}
        />
      ))}
    </div>
  )
}

