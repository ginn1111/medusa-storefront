import { cn } from '@lib/util/cn'
import ChevronDown from '@modules/common/icons/chevron-down'
import React from 'react'

type SortByProps = {
  sort: 'inc' | 'desc'
  onClick: () => void
}

const SortBy = ({ sort, onClick }: SortByProps) => {
  const title = sort === 'inc' ? 'Decrease' : 'Increase'
  return (
    <div>
      <span className="text-base-semi">Sort</span>
      <div className='flex items-center gap-2 cursor-pointer' onClick={onClick}>
        <span className="text-base-regular pl-2">
          {title}
        </span>
        <ChevronDown className={cn('transition-transform duration-300', {
          'rotate-180': sort === 'inc'
        })} />
      </div>
    </div>
  )
}

export default SortBy