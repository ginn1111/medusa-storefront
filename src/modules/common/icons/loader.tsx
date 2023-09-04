import { cn } from '@lib/util/cn'
import React from 'react'
import { IconProps } from 'types/icon'

const Loader = ({ className, color = 'currentColor', size = '20', ...attributes }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={cn('icon icon-tabler icon-tabler-refresh-dot', className)} width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...attributes}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
    </svg>
  )
}

export default Loader