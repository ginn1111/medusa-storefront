import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { formatAmount } from "medusa-react"
import { ProductPreviewType } from "types/global"
import { CalculatedVariant } from "types/medusa"

const transformProductPreview = (
  product: PricedProduct,
  region: Region
): ProductPreviewType => {
  const variants = product.variants as unknown as CalculatedVariant[]

  let cheapestVariant = undefined

  if (variants?.length > 0) {
    cheapestVariant = variants.reduce((acc, curr) => {
      if (acc.calculated_price > curr.calculated_price) {
        return curr
      }
      return acc
    }, variants[0])
  }

  const productInfo = {
    id: product.id!,
    title: product.title!,
    handle: product.handle!,
    thumbnail: product.thumbnail!,
  }
  if (!cheapestVariant?.original_price) {
    return {
      ...productInfo,
      price: {
        calculated_price: "Not available in your region",
        original_price: "Not available in your region",
        price_type: "default",
        difference: "0",
      },
    }
  }

  return {
    ...productInfo,
    originalPrice: cheapestVariant.original_price,
    price: cheapestVariant
      ? {
          calculated_price: formatAmount({
            amount: cheapestVariant.calculated_price,
            region: region,
            includeTaxes: false,
          }),
          original_price: formatAmount({
            amount: cheapestVariant.original_price,
            region: region,
            includeTaxes: false,
          }),
          difference: getPercentageDiff(
            cheapestVariant.original_price,
            cheapestVariant.calculated_price
          ),
          price_type: cheapestVariant.calculated_price_type,
        }
      : undefined,
  }
}

export default transformProductPreview
