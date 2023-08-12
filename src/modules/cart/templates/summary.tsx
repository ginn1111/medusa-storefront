import { Cart } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import CartTotals from "@modules/common/components/cart-totals"
import { useShippingOptions } from "medusa-react"
import Link from "next/link"

type SummaryProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const Summary = ({ cart }: SummaryProps) => {

  const { shipping_options, isLoading } = useShippingOptions({ region_id: cart?.region_id })

  const isDisabled = !shipping_options?.length
  const buttonTitle = isDisabled ? 'Do not have any shipping options for your region :(' : 'Go to checkout'

  return (
    <div className="grid grid-cols-1 gap-y-6">
      <CartTotals cart={cart} />
      <Link href="/checkout">
        <Button disabled={isDisabled} isLoading={isLoading}>{buttonTitle}</Button>
      </Link>
    </div>
  )
}

export default Summary
