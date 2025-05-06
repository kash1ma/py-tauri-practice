import PizzaCard from "../../components/PizzaCard/PizzaCard";
import pizzas from "../../fakedata/data";
import styles from "./MainPage.module.css"
import useFetch from "../../hooks/useFetch";

interface Test {
  name: string
}

const MainPage = () => {
  // const { data, isLoading, error} = useFetch<Test>("", "get")
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection: "column", width: "100%"}}>
      <p style={{textAlign: "center", fontSize: 60 , color: "#ea7c69"}}>Каталог</p>
      <div className={styles.pizza_container}>
      {pizzas.map((pizza) => (
       <PizzaCard key={pizza.id} pizza={pizza}/>
      ))}
      </div>
    </div>
  );
};

export default MainPage;
