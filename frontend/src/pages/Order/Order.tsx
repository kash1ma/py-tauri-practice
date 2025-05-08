import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

const Order = () => {

    const orederItems = useSelector((state: RootState) => state.cart.items)

  return (
    <div>{orederItems.map((item) =>item.name)}</div>
  )
}

export default Order