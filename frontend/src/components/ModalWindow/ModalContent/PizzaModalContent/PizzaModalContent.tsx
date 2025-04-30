import { FC, useEffect, useRef, useState } from "react";
import { addToCart } from "../../../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import Button from "../../../../ui/Button/Button";
import { IPizza } from "../../../../fakedata/data";
import styles from "./PizzaModalContent.module.css";
import Input from "../../../../ui/Input/Input";
import { TypesInput } from "../../../../types/enums/InputEnums";
import useInput from "../../../../hooks/useInput";
import Select from "../../../../ui/Select/Select";
import { useMemo } from "react";
import { CartItem } from "../../../../features/cart/types";
import handleCloseModal from "../../../../helpers/closeModal";

type IPizzaModalContentProps = {
  pizza: IPizza;
  img: string;
};

const PizzaModalContent: FC<IPizzaModalContentProps> = ({ pizza, img }) => {
  const quantity = useInput(1);
  const [currentSize, setCurrentSize] = useState(25);
  const containerPizza = useRef<HTMLDivElement>(null)

  useEffect(() => {
    containerPizza.current?.focus()
  }, [])

  const dispatch = useDispatch();
  const options = [
    { value: 25, label: "25 cм" },
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
    let newPrice = pizza.price;
    if (currentSize === 30) {
      newPrice += 200;
    } else if (currentSize === 35) {
      newPrice += 400;
    }
    return newPrice;
  }, [currentSize, pizza.price]);

  const totalPrice = useMemo(() => {
    return price * Number(quantity.value);
  }, [price, quantity.value]);

  return (
    <div tabIndex={0} ref={containerPizza} className={styles.pizza_modal_container} onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        handleAddToCart();
        handleCloseModal()
      }
    }}>
      
      <img src={img} alt="pizza" />
      <h3>Выберите Размер Пиццы</h3>
      <Select
        options={options}
        onChange={(e) => setCurrentSize(Number(e.target.value))}
      />
      <p>Цена : {totalPrice}</p>
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          let value = Number(e.target.value);
          if (value === 0) {
            value = 1;
          }
          quantity.handleChange({
            ...e,
            target: {
              ...e.target,
              value: String(value),
            },
          });
        }}
        initialValue={quantity.value}
        type={TypesInput.NUMBER}
        min={1}
      />
      <Button
        text="добавить в корзину"
        onClick={() => {
          handleAddToCart();
          handleCloseModal();
        }}
      />
    </div>
  );
};

export default PizzaModalContent;
