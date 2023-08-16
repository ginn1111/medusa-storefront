import { cn } from "@lib/util/cn"
import { onlyUnique } from "@lib/util/only-unique"
import { ProductOption } from "@medusajs/medusa"
import clsx from "clsx"
import React from "react"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
  containerClassName?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  containerClassName = ''
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <div className='flex flex-col gap-y-3'>
      <span className="text-base-semi">Select {title}</span>
      <div className={cn('grid grid-cols-3 gap-2 lg:grid-cols-6', containerClassName)}>
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption({ [option.id]: v })}
              key={v}
              className={clsx(
                "border-gray-200 border text-xsmall-regular h-[50px] transition-all duration-200",
                { "border-gray-900": v === current }
              )}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
