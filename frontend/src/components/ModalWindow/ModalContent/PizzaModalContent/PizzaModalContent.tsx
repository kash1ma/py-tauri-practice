import { FC, useState } from "react";
import { addToCart } from "../../../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import Button from "../../../../ui/Button/Button";
import { IPizza } from "../../../../fakedata/data";
import styles from "./PizzaModalContent.module.css"
import Input from "../../../../ui/Input/Input";
import { TypesInput } from "../../../../types/enums/InputEnums";
import useInput from "../../../../hooks/useInput";
import Select from "../../../../ui/Select/Select";

type IPizzaModalContentProps = {
  pizza: IPizza;
  img: string
};

const PizzaModalContent: FC<IPizzaModalContentProps> = ({ pizza, img }) => {

  const quantity = useInput(1)
  const [currentSize, setCurrentSize] = useState(25)

  const dispatch = useDispatch();
  const options = [
    { value: currentSize, label: '25 cм' },
    { value: 30, label: '30 см' },
    { value: 35, label: '35 см' },
  ];

  return (
    <div className={styles.pizza_modal_container}>
      <img src={img} alt="pizza" />
      <h3>Выберите Размер Пиццы</h3>
      <Select options={options} onChange={(e) => setCurrentSize(Number(e.target.value))}/>
      <p>Цена : {}</p>
      <Input onChange={quantity.handleChange} initialValue={quantity.value} type={TypesInput.NUMBER}/>
      <Button
        text="добавить в корзину"
        onClick={() => dispatch(addToCart(pizza as any))}
      />
    </div>
  );
};

export default PizzaModalContent;
