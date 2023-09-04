import { useProductActions } from "@lib/context/product-context"
import { useStore } from "@lib/context/store-context"
import { LineItem } from "@medusajs/medusa"
import OptionSelect from "@modules/products/components/option-select"
import { isEqual } from "lodash"
import { useCart, useCreateLineItem, useDeleteLineItem } from "medusa-react"
import { toast } from "sonner"

type LineItemOptionsProps = { item: Omit<LineItem, 'beforeInsert'> & { id: string } }

const LineItemOptions = ({ item }: LineItemOptionsProps) => {
  const { product, options, variantRecord } = useProductActions()
  const { cart, setCart } = useCart()
  const { resetCart } = useStore()
  const addLineItem = useCreateLineItem(cart?.id!)
  const deleteLineItem = useDeleteLineItem(cart?.id!)

  const handleUpdateOptions = async (option: Record<string, string>) => {

    const newOptions = { ...options, ...option };
    let variantId: string | undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], newOptions)) {
        variantId = key
      }
    }

    const variant = product.variants.find((v) => v.id === variantId)
    if (!variant) {
      toast.error('Product do not exist!')
      return;
    }
    let stage: string | undefined
    try {
      await deleteLineItem.mutateAsync({ lineId: item.id })
      stage = 'deleted'
      const { cart } = await addLineItem.mutateAsync({
        variant_id: variant.id!,
        quantity: variant.inventory_quantity! >= item.quantity ? item.quantity : variant.inventory_quantity!
      })
      setCart(cart)
    } catch (error: any) {
      console.log(error.response)
      if (error.response.data.code = 'insufficient_inventory') {
        if(error.response.data.type === 'not_allowed') {
          toast.error('Variant is out of stock!')
        } else {
          toast.error('Variant not available in your region!')
        }
      }       if (stage === 'deleted') {
        try {
          const { cart } = await addLineItem.mutateAsync({
            variant_id: item.variant_id!,
            quantity: item.quantity
          })
          setCart(cart)
        } catch {
          toast.error('Ops, something went wrong!')
          resetCart()
        }
      }
    }
  }

  return (
    <div className="text-small-regular text-gray-700">
      {product.variants.length > 1 && (
        <div className="w-full grid grid-cols-2 xl:grid-cols-3">
          {(product.options || []).map((option) => {
            return (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={variantRecord[item.variant_id!][option.id]}
                  updateOption={handleUpdateOptions}
                  title={option.title}
                  containerClassName="xl:grid-cols-3 small:grid-cols-2"
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LineItemOptions
