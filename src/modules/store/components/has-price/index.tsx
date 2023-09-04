import Checkbox from '@modules/common/components/checkbox'
import React from 'react'

type HasPriceProps = {
  hasPrice: boolean;
  onChange: () => void;
}

const HasPrice = ({ hasPrice, onChange }: HasPriceProps) => {
  return (
    <div className="flex gap-2">
      <span className="text-base-semi">Has price</span>
      <Checkbox label='' checked={hasPrice} onChange={onChange} />
    </div>
  )
}

export default HasPrice