import { Cart } from "@medusajs/medusa"
import { formatAmount } from "medusa-react"
import React from "react"

type CartTotalsProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const CartTotals: React.FC<CartTotalsProps> = ({ cart }) => {
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
    shipping_tax_total,
    item_tax_total,
  } = cart
  console.log("🚀 ~ file: index.tsx:20 ~ cart:", cart)

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: cart.region,
      includeTaxes: false,
    })
  }

  return (
    <div>
      <div className="text-small-regular text-gray-700">
        <div className="flex items-center justify-between text-base-regular text-gray-900 mb-2">
          <span>Subtotal</span>
          <span>{getAmount(subtotal)}</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {!!discount_total && (
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>- {getAmount(discount_total)}</span>
            </div>
          )}
          {!!gift_card_total && (
            <div className="flex items-center justify-between">
              <span>Gift card</span>
              <span>- {getAmount(gift_card_total)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>{getAmount(shipping_total)}</span>
          </div>
          <div className="flex flex-col justify-between">
            <TaxLine title="Taxes (total)" fmtAmount={getAmount(tax_total)} />
            <ul className="pl-5">
              {shipping_tax_total !== 0 && <TaxLine title="Shipping" fmtAmount={getAmount(shipping_tax_total)} />}
              {item_tax_total !== 0 && <TaxLine title="Items" fmtAmount={getAmount(item_tax_total)} />}
            </ul>
          </div>
        </div>
        <div className="h-px w-full border-b border-gray-200 border-dashed my-4" />
        <div className="flex items-center justify-between text-base-regular text-gray-900 mb-2">
          <span>Total</span>
          <span>{getAmount(total)}</span>
        </div>
      </div>
    </div>
  )
}

type TaxLineProps = {
  title: string;
  fmtAmount: string;
}

const TaxLine: React.FC<TaxLineProps> = ({ title, fmtAmount }) => {
  return <li className="flex items-center justify-between">
    <span>{title}</span>
    <span>{fmtAmount}</span>
  </li>
}

export default CartTotals
