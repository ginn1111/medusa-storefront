import { cn } from "@lib/util/cn"
import { Order } from "@medusajs/medusa"
import { formatAmount } from "medusa-react"

type OrderSummaryProps = {
  order: Order
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (typeof amount !== 'number' && !amount) {
      return
    }

    return formatAmount({ amount, region: order.region, includeTaxes: false })
  }

  const isRefund = order?.refunded_total > 0
  const hasTaxes = order?.tax_total && order?.tax_total > 0

  return (
    <div>
      <h2 className="text-base-semi">Order Summary</h2>
      <div className="text-small-regular text-gray-700 my-2">
        <div className="flex items-center justify-between text-base-regular text-gray-900 mb-2">
          <span>Subtotal</span>
          <span>{getAmount(order.subtotal)}</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {order.discount_total > 0 && (
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>- {getAmount(order.discount_total)}</span>
            </div>
          )}
          {order.gift_card_total > 0 && (
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>- {getAmount(order.gift_card_total)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>{getAmount(order.shipping_total)}</span>
          </div>
          {isRefund &&
            <div className="flex items-center justify-between">
              <span>Refunded</span>
              <span>- {getAmount(order.refunded_total)}</span>
            </div>
          }
          {!!hasTaxes &&
            <div className="flex items-center justify-between">
              <span>Taxes</span>
              <span>{getAmount(order.tax_total)}</span>
            </div>
          }

        </div>
        <div className="h-px w-full border-b border-gray-200 border-dashed my-4" />
        <div className='flex items-center justify-between text-base-regular text-gray-900 mb-2'>
          <span>Total</span>
          <span className={cn({ 'text-rose-500 line-through': isRefund })}>{getAmount(order.total)}</span>
        </div>

        <div className='flex items-center justify-end text-base-regular text-gray-900 mb-2'>
          {isRefund &&
            <span>{getAmount(order.total - order.refunded_total)}</span>}
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
