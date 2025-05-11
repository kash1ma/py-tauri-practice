import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { selectCost } from "../../features/cart/cartSlice"

const Order = () => {

    const orderItems = useSelector((state: RootState) => state.cart.items)
    const totalPrice = useSelector(selectCost)

  return (
    <>
    {totalPrice}
    <div>{orderItems.map((item) =>item.name)} </div>
    </>
  )
}

export default Order