import { cn } from "@lib/util/cn"
import React from "react"
import { IconProps } from "types/icon"

const Truck: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  className,
  ...attributes
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={cn('icon icon-tabler icon-tabler-truck-delivery', className)} width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...attributes}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
      <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
      <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
      <path d="M3 9l4 0"></path>
    </svg>
  )
}

export default Truck
