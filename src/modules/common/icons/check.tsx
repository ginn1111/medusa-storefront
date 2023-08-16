import { cn } from "@lib/util/cn"
import React from "react"
import { IconProps } from "types/icon"

const Check: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  className,
  ...attributes
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={cn('icon icon-tabler icon-tabler-check', className)} width={size} height={size} viewBox="0 0 24 24" strokeWidth="2" stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...attributes}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M5 12l5 5l10 -10"></path>
    </svg>
  )
}

export default Check
