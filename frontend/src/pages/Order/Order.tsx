import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { clearCart, selectCost } from "../../features/cart/cartSlice"
import Input from "../../ui/Input/Input"
import useInput from "../../hooks/useInput"
import { TypesInput } from "../../types/enums/InputEnums"
import Button from "../../ui/Button/Button"
import { useState } from "react"

const Order = () => {
  const orderItems = useSelector((state: RootState) => state.cart.items)
  const totalPrice = useSelector(selectCost)
  const dispatch = useDispatch()
  const { value: adress, handleChange: setAdress } = useInput("")
  const [isDeliver, setIsDeliver] = useState(false)

  return (
    <div>
      {isDeliver ? (
        <p>Ваш заказ готовится</p>
      ) : (
        <>
          <p>Итоговая цена: {totalPrice} ₽</p>
          <p>Список пицц:</p>
          <ul>
            {orderItems.map((item) => (
              <li key={item.id}>{item.name} x {item.quantity}</li>

            ))}
          </ul>
          <Input
            type={TypesInput.TEXT}
            placeholder="Введите адрес"
            initialValue={adress}
            onChange={setAdress}
          />
          <Button text="Заказать" onClick={() => {setIsDeliver(true);dispatch(clearCart())}} />
        </>
      )}
    </div>
  )
}

export default Order
