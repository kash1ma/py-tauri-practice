import React, { FC, useRef } from "react";
import styles from "./ModalCart.module.css";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../features/cart/cartSlice";
import Button from "../../ui/Button/Button";

interface IModalCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCart: FC<IModalCartProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div
      ref={overlayRef}
      className={`${styles.modalOverlay} ${isOpen ? styles.open : ""}`}
      onClick={handleClickOutside}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modalContainer}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <div style={{marginTop: 50}}>
          <h2>Корзина</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price}₽ x {item.quantity}
                <Button text="удалить" onClick={() => dispatch(removeFromCart(item.id))}/>
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
          <Button text="очистить корзину" onClick={() => dispatch(clearCart())} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalCart;
