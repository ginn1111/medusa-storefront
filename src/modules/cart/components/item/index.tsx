import { ProductProvider } from "@lib/context/product-context"
import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options-cart"
import LineItemPrice from "@modules/common/components/line-item-price"
import NativeSelect from "@modules/common/components/native-select"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import { useProduct } from "medusa-react"

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
}

const Item = ({ item, region }: ItemProps) => {
  const { updateItem, deleteItem } = useStore()
  const { product } = useProduct(item.variant.product_id)

  if (!product) return null;

  return (
    <ProductProvider product={product!}>
      <div className="grid grid-cols-[122px_1fr] gap-x-4">
        <div className="w-[122px]">
          <Thumbnail thumbnail={item.thumbnail} size="full" />
        </div>
        <div className="text-base-regular flex flex-col gap-y-8">
          <div className="flex items-start justify-between">
            <div className="flex flex-col flex-1">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <LineItemOptions item={item} />
            </div>
            <NativeSelect
              value={item.quantity}
              onChange={(value) =>
                updateItem({
                  lineId: item.id,
                  quantity: parseInt(value.target.value),
                })
              }
              className="max-h-[35px] w-[75px]"
            >
              {Array.from(
                [
                  ...Array(
                    item.variant.inventory_quantity > 0
                      ? item.variant.inventory_quantity
                      : 10
                  ),
                ].keys()
              )
                .slice(0, 10)
                .map((i) => {
                  const value = i + 1
                  return (
                    <option value={value} key={i}>
                      {value}
                    </option>
                  )
                })}
            </NativeSelect>
          </div>
          <div className="flex items-end justify-between text-small-regular flex-1">
            <div>
              <button
                className="flex items-center gap-x-1 text-gray-500"
                onClick={() => deleteItem(item.id)}
              >
                <Trash size={14} />
                <span>Remove</span>
              </button>
            </div>
            <div>
              <LineItemPrice item={item} region={region} />
            </div>
          </div>
        </div>
      </div>
    </ProductProvider>

  )
}

export default Item
