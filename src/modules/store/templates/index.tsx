"use client"

import { StoreGetProductsParams } from "@medusajs/medusa"
import InfiniteProducts from "@modules/products/components/infinite-products"
import RefinementList from "@modules/store/components/refinement-list"
import { useState } from "react"
import SortBy from "../components/sort-by"
import HasPrice from "../components/has-price"

const StoreTemplate = () => {
  const [params, setParams] = useState<StoreGetProductsParams>({})
  const [sort, setSort] = useState<'desc' | 'inc'>('desc');
  const [hasPrice, setHasPrice] = useState(false);

  const handleToggleSort = () => {
    setSort(prev => prev === 'inc' ? 'desc' : 'inc')
  }

  const handleToggleHasPrice = () => setHasPrice(prev => !prev)

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6">
      <div className="px-8 py-4  small:pr-0 small:pl-8 small:min-w-[250px] sticky top-[50px]">
        <HasPrice hasPrice={hasPrice} onChange={handleToggleHasPrice} />
        <SortBy sort={sort} onClick={handleToggleSort} />
        <RefinementList refinementList={params} setRefinementList={setParams} />
      </div>
      <InfiniteProducts params={params} sort={sort} hasPrice={hasPrice} />
    </div>
  )
}

export default StoreTemplate
