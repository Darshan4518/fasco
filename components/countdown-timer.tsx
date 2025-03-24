"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: Date
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex space-x-4">
      <div className="flex flex-col items-center">
        <div className="bg-gray-100 w-12 h-12 flex items-center justify-center text-xl font-bold">{timeLeft.days}</div>
        <span className="text-xs text-gray-500 mt-1">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-gray-100 w-12 h-12 flex items-center justify-center text-xl font-bold">{timeLeft.hours}</div>
        <span className="text-xs text-gray-500 mt-1">Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-gray-100 w-12 h-12 flex items-center justify-center text-xl font-bold">
          {timeLeft.minutes}
        </div>
        <span className="text-xs text-gray-500 mt-1">Mins</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-gray-100 w-12 h-12 flex items-center justify-center text-xl font-bold">
          {timeLeft.seconds}
        </div>
        <span className="text-xs text-gray-500 mt-1">Secs</span>
      </div>
    </div>
  )
}

