import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Table, { Column } from "../../components/Table/Table";
import Button from "../../ui/Button/Button";

type Pizza = {
  id: number;
  name: string;
  description: string;
  price_cents: string;
};

const PizzaAdmin = () => {
  const { data, isLoading, sendRequset } = useFetch<Pizza[]>();
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const tableContRef = useRef<HTMLDivElement>(null);
  const pizzas = Array.isArray(data) ? data : [];

  useEffect(() => {
    sendRequset("http://localhost:8000/pizzas", "get");
    console.log(pizzas)
  }, []);

  useEffect(() => {
    if (tableContRef.current && scrollPosition > 0) {
      tableContRef.current.scrollTop = scrollPosition;
    }
  }, [data]);

  const handleDelete = async (pizza: Pizza) => {
    if (tableContRef.current) {
      setScrollPosition(tableContRef.current.scrollTop);
    }
    
    await sendRequset(`http://localhost:8000/pizzas/${pizza.id}`, "delete");
    await sendRequset("http://localhost:8000/pizzas", "get");
  };

  const columns: Column<Pizza>[] = [
    { key: "id", title: "ID", dataIndex: "id" },
    { key: "name", title: "Название", dataIndex: "name" },
    { key: "decription", title: "Описание", dataIndex: "description"},
    { key: "price_cents", title: "Цена", dataIndex: "price_cents"},
    {
      key: "actions",
      title: "Действия",
      render: (_, pizza) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            onClick={() => handleDelete(pizza)}
            text="Удалить"
            otherButtonStyles={{ backgroundColor: "red", color: "white" }}
          />
        </div>
      ),
    },
  ];

  return (
    <div ref={tableContRef} style={{ maxHeight: "100vh", overflow: "auto" }}>
      <h2>Админ-панель</h2>
      {isLoading && <p>Загрузка...</p>}
      {pizzas && (
        <Table<Pizza>
          data={pizzas}
          columns={columns}
          rowKey="id"
        />
      )}
    </div>
  );
};

export default PizzaAdmin;