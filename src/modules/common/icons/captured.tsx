import { cn } from "@lib/util/cn"
import React from "react"
import { IconProps } from "types/icon"

const Captured: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  className,
  ...attributes
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={cn("icon icon-tabler icon-tabler-device-tablet-check", className)} width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...attributes}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M11.5 21h-5.5a1 1 0 0 1 -1 -1v-16a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v9.5"></path>
      <path d="M12.314 16.05a1 1 0 0 0 -1.042 1.635"></path>
      <path d="M15 19l2 2l4 -4"></path>
    </svg>
  )
}

export default Captured
