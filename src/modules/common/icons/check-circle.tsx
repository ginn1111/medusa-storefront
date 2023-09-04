import { cn } from '@lib/util/cn'
import React from 'react'
import { IconProps } from 'types/icon'

const CheckCircle = ({ size = '20', color = 'currentColor', className, ...attributes }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={cn("icon icon-tabler icon-tabler-circle-check", className)} width={size} height={size} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...attributes}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
      <path d="M9 12l2 2l4 -4"></path>
    </svg>
  )
}

export default CheckCircle