import { FC } from "react";
import { addToCart } from "../../../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import Button from "../../../../ui/Button/Button";
import { IPizza } from "../../../../fakedata/data";

type IPizzaModalContentProps = {
  pizza: IPizza;
  img: string
};

const PizzaModalContent: FC<IPizzaModalContentProps> = ({ pizza, img }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: 100 }}>
      <img src={img} alt="" />
      {pizza.price}
      {pizza.quanity}
      <Button
        text="добавить в корзину"
        onClick={() => dispatch(addToCart(pizza as any))}
      />
    </div>
  );
};

export default PizzaModalContent;
