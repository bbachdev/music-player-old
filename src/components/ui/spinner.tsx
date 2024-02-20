import { tailspin } from 'ldrs'
import { useTheme } from '../providers/ThemeProvider'

interface SpinnerProps {
  size?: number
  stroke?: number
  color?: string
}

export default function Spinner({ size = 20, stroke = 5, color }: SpinnerProps) {
  tailspin.register()
  const fallbackColor = useTheme().theme === "dark" ? "white" : "black"

  const spinnerColor = color || fallbackColor
  return (
    <l-tailspin size={size} stroke={stroke} speed="0.9" color={spinnerColor}></l-tailspin>
  )
}