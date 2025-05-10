import { FC, useEffect, useRef, useState } from "react";
import { addToCart } from "../../../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../ui/Button/Button";
import { IPizza } from "../../../../fakedata/data";
import styles from "./PizzaModalContent.module.css";
import useInput from "../../../../hooks/useInput";
import Select from "../../../../ui/Select/Select";
import { useMemo } from "react";
import { CartItem } from "../../../../features/cart/types";
import handleCloseModal from "../../../../helpers/closeModal";
import { RootState } from "../../../../app/store";

type IPizzaModalContentProps = {
  pizza: IPizza;
  img: string;
};

const PizzaModalContent: FC<IPizzaModalContentProps> = ({ pizza, img }) => {
  const quantity = useInput(1);
  const [currentSize, setCurrentSize] = useState(25);
  const containerPizza = useRef<HTMLDivElement>(null);
  const isAuth = useSelector((state: RootState) => state.auth.success);

  useEffect(() => {
    containerPizza.current?.focus();
  }, []);

  const dispatch = useDispatch();
  const options = [
    { value: 25, label: "25 см" },
    { value: 30, label: "30 см" },
    { value: 35, label: "35 см" },
  ];

  const handleAddToCart = () => {
    const pizzaToAdd: CartItem = {
      ...pizza,
      price: price,
      size: currentSize,
      quantity: Number(quantity.value),
      id: pizza.name + currentSize,
    };
    dispatch(addToCart(pizzaToAdd));
  };

  const price = useMemo(() => {
    let newPrice = pizza.price_cents;
    if (currentSize === 30) {
      newPrice += 200;
    } else if (currentSize === 35) {
      newPrice += 400;
    }
    return newPrice;
  }, [currentSize, pizza.price_cents]);

  const totalPrice = useMemo(() => {
    return price * Number(quantity.value);
  }, [price, quantity.value]);

  return (
    <div
      tabIndex={0}
      ref={containerPizza}
      className={styles.pizzaModalContainer}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
          handleAddToCart();
          handleCloseModal();
        }
      }}
    >
      <img src={img} alt="pizza" className={styles.pizzaImage} />
      <h3 className={styles.sizeTitle}>Выберите размер пиццы</h3>
      <Select
        options={options}
        onChange={(e) => setCurrentSize(Number(e.target.value))}
      />
      <p className={styles.priceText}>Цена: {totalPrice} ₽</p>
      <Button
        text={isAuth ? "Добавить в корзину" : "Войдите, чтобы добавить товар"}
        onClick={() => {
          handleAddToCart();
          handleCloseModal();
        }}
        otherButtonStyles={
          isAuth
            ? {
                backgroundColor: "#ff7b25",
                color: "#121212",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "600",
                transition: "all 0.2s ease",
              }
            : {
                backgroundColor: "gray",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "not-allowed",
              }
        }
        isDisabled={!isAuth}
      />
    </div>
  );
};

export default PizzaModalContent;