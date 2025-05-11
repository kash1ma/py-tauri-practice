import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { clearCart, selectCost } from "../../features/cart/cartSlice"
import Input from "../../ui/Input/Input"
import useInput from "../../hooks/useInput"
import { TypesInput } from "../../types/enums/InputEnums"
import Button from "../../ui/Button/Button"
import { useState } from "react"
import styles from "./Order.module.css"

const Order = () => {
  const orderItems = useSelector((state: RootState) => state.cart.items)
  const totalPrice = useSelector(selectCost)
  const dispatch = useDispatch()
  const { value: adress, handleChange: setAdress } = useInput("")
  const [isDeliver, setIsDeliver] = useState(false)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Оформление заказа</h1>
      
      {isDeliver ? (
        <div className={styles.deliveryMessage}>
          <p>Ваш заказ готовится и будет доставлен по адресу:</p>
          <p><strong>{adress}</strong></p>
          <p>Спасибо за заказ!</p>
        </div>
      ) : (
        <>
          <p className={styles.totalPrice}>Итоговая цена: {totalPrice} ₽</p>
          
          <p className={styles.pizzaListTitle}>Состав заказа:</p>
          <ul className={styles.pizzaList}>
            {orderItems.map((item) => (
              <li key={item.id} className={styles.pizzaItem}>
                <span>{item.name} ({item.size} см)</span>
                <span>x {item.quantity}</span>
              </li>
            ))}
          </ul>
          
          <div className={styles.inputContainer}>
            <Input
              type={TypesInput.TEXT}
              placeholder="Введите адрес доставки"
              initialValue={adress}
              onChange={setAdress}
            />
          </div>
          
          <Button 
            text="Подтвердить заказ" 
            onClick={() => {
              setIsDeliver(true);
              dispatch(clearCart());
            }}
            otherButtonStyles={{
              backgroundColor: "#ff7b25",
              color: "#121212",
              padding: "1rem",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "1.1rem",
              width: "100%"
            }}
          />
        </>
      )}
    </div>
  )
}

export default Order