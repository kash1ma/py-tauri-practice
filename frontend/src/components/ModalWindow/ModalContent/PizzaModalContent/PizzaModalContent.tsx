import { FC } from "react";
import { addToCart } from "../../../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import Button from "../../../../ui/Button/Button";
import { IPizza } from "../../../../fakedata/data";
import styles from "./PizzaModalContent.module.css"
import Input from "../../../../ui/Input/Input";
import { TypesInput } from "../../../../types/enums/InputEnums";
import useInput from "../../../../hooks/useInput";

type IPizzaModalContentProps = {
  pizza: IPizza;
  img: string
};

const PizzaModalContent: FC<IPizzaModalContentProps> = ({ pizza, img }) => {

  const quantity = useInput(1)

  const dispatch = useDispatch();

  return (
    <div className={styles.pizza_modal_container}>
      <img src={img} alt="pizza" />
      {pizza.price}
      {pizza.quanity}
      <Button
        text="добавить в корзину"
        onClick={() => dispatch(addToCart(pizza as any))}
      />
      <Input onChange={quantity.handleChange} initialValue={quantity.value} type={TypesInput.NUMBER}/>
    </div>
  );
};

export default PizzaModalContent;
