import { FC } from 'react'
import { IPizza } from '../../fakedata/data'
import styles from "./PizzaCard.module.css"
import Button from '../../ui/Button/Button'

type PizzaCardProps = {
    pizza: IPizza
}

const PizzaCard: FC<PizzaCardProps> = ({pizza}) => {
  return (
    <div className={styles.pizza_card}>
      <p>{pizza.decription}</p>
      <p>{pizza.name}</p>
      <p>{pizza.price}</p>
      <Button text='добавить в корзину'/>
    </div>
  )
}

export default PizzaCard
