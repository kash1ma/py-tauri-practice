import PizzaCard from "../../components/PizzaCard/PizzaCard";
import pizzas from "../../fakedata/data";
import styles from "./MainPage.module.css"

const MainPage = () => {
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection: "column", width: "100%"}}>
      <p style={{textAlign: "center", fontSize: 60 , color: "#ea7c69"}}>Список</p>
      <div className={styles.pizza_container}>
      {pizzas.map((pizza) => (
       <PizzaCard key={pizza.id} pizza={pizza}/>
      ))}
      </div>
    </div>
  );
};

export default MainPage;
