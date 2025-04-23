import { FC } from "react";
import { IPizza } from "../../fakedata/data";
import styles from "./PizzaCard.module.css";
import Button from "../../ui/Button/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

type PizzaCardProps = {
  pizza: IPizza;
};

const PizzaCard: FC<PizzaCardProps> = ({ pizza }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.pizza_card}>
      <p>{pizza.decription}</p>
      <p>{pizza.name}</p>
      <p>{pizza.price}</p>
      <Button
        text="добавить в корзину"
        onClick={() => dispatch(addToCart(pizza))}
      />
      <p>Выберите кол-во: {pizza.quanity}</p>
    </div>
    
  );
};

export default PizzaCard;
