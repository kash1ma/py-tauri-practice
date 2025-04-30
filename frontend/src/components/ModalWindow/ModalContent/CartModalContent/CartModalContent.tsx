import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartCount,
  selectCost,
} from "../../../../features/cart/cartSlice";
import Button from "../../../../ui/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../app/store";
import Input from "../../../../ui/Input/Input";
import { TypesInput } from "../../../../types/enums/InputEnums";
import styles from "./CartModal.module.css";

const CartModalContent = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const pizzaCount = useSelector(selectCartCount);
  const cost = useSelector(selectCost);
  const dispatch = useDispatch();
  return (
    <div style={{ marginTop: 50 }}>
      <div className={styles.cart_header}>
        <h2>Корзина</h2>
        <Button
          otherButtonStyles={{}}
          text="очистить корзину"
          onClick={() => dispatch(clearCart())}
        />
      </div>
      Сумма: {cost} <br />
      Количество: {pizzaCount}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}₽ x {item.quantity}
            <br />
            Размер: {item.size} см
            <Button
              text="удалить"
              onClick={() => dispatch(removeFromCart(item.id))}
            />
            <Input
              min={1}
              type={TypesInput.NUMBER}
              initialValue={item.quantity}
              onChange={(e) => {
                let value = Number(e.target.value);
                if (value === 0) {
                  value = 1;
                } else {
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: Number(e.target.value),
                    })
                  );
                }
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartModalContent;
