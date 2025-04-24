import { FC, useState } from "react";
import { IPizza } from "../../fakedata/data";
import styles from "./PizzaCard.module.css";
import Button from "../../ui/Button/Button";


import Pizza from "../../assets/pizza.jpg"
import ModalWindow from "../ModalWindow/ModalWindow";
import PizzaModalContent from "../ModalWindow/ModalContent/PizzaModalContent/PizzaModalContent.js"

type PizzaCardProps  = {
  pizza: IPizza;
};

const PizzaCard: FC<PizzaCardProps> = ({ pizza }) => {


  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <div className={styles.pizza_card}>
    <img loading="lazy" style={{width:180, height:180, marginTop:10}} src={Pizza} alt="pizza" />
      <p>{pizza.name}</p>
      <p style={{color: "white"}}>{pizza.decription}</p>
      <p>От {pizza.price} Рублей</p>
      <Button
        text="Выбрать"
        // onClick={() => dispatch(addToCart(pizza as any))}
        onClick={() => setIsOpenModal(true)}
      />
      {isOpenModal && (<ModalWindow size="large" isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} children={<PizzaModalContent img={Pizza} pizza={pizza}/>}/>)}   
    </div>
    
  );
};

export default PizzaCard;
