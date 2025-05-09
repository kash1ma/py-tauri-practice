import { FC, useState } from "react";
import { IPizza } from "../../fakedata/data";
import styles from "./PizzaCard.module.css";
import Button from "../../ui/Button/Button";
import Pizza from "../../assets/pizza.webp"
import ModalWindow from "../ModalWindow/ModalWindow";
import PizzaModalContent from "../ModalWindow/ModalContent/PizzaModalContent/PizzaModalContent.js"

type PizzaCardProps  = {
  pizza: IPizza;
};

const PizzaCard: FC<PizzaCardProps> = ({ pizza }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <div className={styles.pizza_card}>
      <div className={styles.pizza_container}>
        <div className={styles.image_container}>
          <img 
            loading="lazy" 
            className={styles.pizza_image} 
            src={Pizza} 
            alt={pizza.name} 
          />
        </div>
        <div className={styles.pizza_info}>
          <p>{pizza.name}</p>
          <p>{pizza.decription}</p>
          <p>От {pizza.price_cents} Рублей</p>
        </div>
        <Button
          text="Выбрать"
          onClick={() => setIsOpenModal(true)}
          otherButtonStyles={{
            padding: "18px",
            width: "100%",
            background: "linear-gradient(to right, #ff7b00, #ff9e3f)",
            color: "#1a1a1a",
            fontWeight: "600",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            boxShadow: "0 4px 8px rgba(255, 158, 63, 0.3)"
          }}
        />
        {isOpenModal && (
          <ModalWindow 
            size="large" 
            isOpen={isOpenModal} 
            onClose={() => setIsOpenModal(false)} 
            children={<PizzaModalContent img={Pizza} pizza={pizza}/>}
          />
        )}   
      </div>
    </div>
  );
};

export default PizzaCard;