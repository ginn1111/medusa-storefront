import { cn } from "@lib/util/cn"
import { IconProps } from "types/icon"

const Logo = ({ size, color = 'currentColor', ...attributes }: IconProps) => {
  const { className, ...restAttrs } = attributes
  return <svg xmlns="http://www.w3.org/2000/svg"
    aria-label="Acme Store logo" viewBox="0 0 32 28" width={size} height={size} className={cn('fill-black dark:fill-white h-[16px] w-[16px]')} {...restAttrs}>
    <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z">
    </path>
    <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z">
    </path>
  </svg>
}

export default Logo