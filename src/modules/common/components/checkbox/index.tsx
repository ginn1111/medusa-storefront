import React from "react"

type CheckboxProps = {
  checked?: boolean
  onChange?: (...args: unknown[]) => void
  label: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
}) => {
  return (
    <button
      className="text-base-regular flex items-center gap-x-2 flex-shrink-0"
      role="checkbox"
      type="button"
      aria-checked={checked}
      onClick={onChange}
    >
      <div
        role="checkbox"
        aria-checked={checked}
        className="border border-gray-900 w-5 h-5 flex items-center justify-center flex-shrink-0"
      >
        {checked ? "✓" : null}
      </div>

      <span className="line-clamp-1">{label}</span>
    </button>
  )
}

export default Checkbox
