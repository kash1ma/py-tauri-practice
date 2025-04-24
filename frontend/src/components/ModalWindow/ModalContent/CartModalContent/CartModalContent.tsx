import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../../../features/cart/cartSlice";
import Button from "../../../../ui/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../app/store";

const CartModalContent = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  return (
    <div style={{ marginTop: 50 }}>
      <h2>Корзина</h2>
      <Button text="очистить корзину" onClick={() => dispatch(clearCart())} />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}₽ x {item.quantity}
            <Button
              text="удалить"
              onClick={() => dispatch(removeFromCart(item.id))}
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                dispatch(
                  updateQuantity({
                    id: item.id,
                    quantity: Number(e.target.value),
                  })
                )
              }
              min={1}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartModalContent;
