import { StoreGetProductsParams } from "@medusajs/medusa"
import Checkbox from "@modules/common/components/checkbox"
import { useCollections } from "medusa-react"
import { ChangeEvent } from "react"

type RefinementListProps = {
  refinementList: StoreGetProductsParams
  setRefinementList: (refinementList: StoreGetProductsParams) => void
}

const RefinementList = ({
  refinementList,
  setRefinementList,
}: RefinementListProps) => {
  const { collections, isLoading } = useCollections({ offset: 0, limit: 100 })

  const handleCollectionChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const collectionIds = refinementList.collection_id || []

    const exists = collectionIds.includes(id)

    if (!exists) {
      setRefinementList({
        ...refinementList,
        collection_id: [...collectionIds, id],
      })

      return
    }

    if (exists) {
      setRefinementList({
        ...refinementList,
        collection_id: collectionIds.filter((c) => c !== id),
      })

      return
    }

    return
  }

  return (
    <>
      <div className="flex gap-x-3 small:flex-col small:gap-y-3 small:items-center !items-start">
        <span className="text-base-semi">Collections</span>
        <ul className="text-base-regular flex items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2 small:overflow-x-auto disabled-scrollbar max-h-[400px] overflow-y-auto">
          {collections?.map((c) => (
            <li key={c.id} className="flex-shrink-0">
              <Checkbox
                checked={refinementList.collection_id?.includes(
                  c.id
                )}
                label={c.title}
                onChange={(e: any) => handleCollectionChange(e, c.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default RefinementList
