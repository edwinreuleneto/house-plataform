import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  duration?: number
  formatter?: (value: number) => string
}

const AnimatedNumber = ({ value, duration = 0.5, formatter }: AnimatedNumberProps) => {
  const [display, setDisplay] = useState(value)
  const prevValue = useRef(value)

  useEffect(() => {
    const controls = animate(prevValue.current, value, {
      duration,
      onUpdate: latest => {
        setDisplay(latest)
      },
    })
    prevValue.current = value
    return () => controls.stop()
  }, [value, duration])

  const formatted = formatter
    ? formatter(display)
    : Math.round(display).toString()

  return <span>{formatted}</span>
}

export default AnimatedNumber
