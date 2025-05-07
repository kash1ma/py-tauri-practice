import PizzaCard from "../../components/PizzaCard/PizzaCard";
import styles from "./MainPage.module.css"
import useFetch from "../../hooks/useFetch";
import { IPizza } from "../../fakedata/data";


const MainPage = () => {
  const { data, isLoading, error} = useFetch<IPizza[]>("http://localhost:8000/pizzas/pizzas/", "get")
  
  if(isLoading) return (
    <div className="">Загрузка</div>
  )

  if(error){
    return <div>Ошибка при загрузке пиццы</div>
  }

  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection: "column", width: "100%"}}>
      <p style={{textAlign: "center", fontSize: 60 , color: "#ea7c69"}}>Каталог</p>
      <div className={styles.pizza_container}>
      {data?.data.map((pizza) => (
       <PizzaCard key={pizza.id} pizza={pizza}/>
      ))}
      </div>
    </div>
  );
};

export default MainPage;
