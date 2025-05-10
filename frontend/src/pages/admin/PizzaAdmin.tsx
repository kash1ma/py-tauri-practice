import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Table, { Column } from "../../components/Table/Table";
import Button from "../../ui/Button/Button";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import UsersAdminCrud from "../../components/ModalWindow/ModalContent/UsersAdminCrud/UsersAdminCrud";

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
  const [isOpenModal, setIsModalOpen] = useState(false);

  useEffect(() => {
    sendRequset("http://localhost:8000/pizzas", "get");
    console.log(pizzas);
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
    { key: "decription", title: "Описание", dataIndex: "description" },
    { key: "price_cents", title: "Цена", dataIndex: "price_cents" },
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
          <Button
            text="Изменить"
            otherButtonStyles={{ backgroundColor: "blue" }}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      ),
    },
  ];

  return (

    <div ref={tableContRef} style={{ maxHeight: "100vh", overflow: "auto" }}>
      <h2 style={{color: "rgb(234, 124, 105)", padding: "10px", fontSize: "50px"}}>Админ-панель <br/>Пиццы</h2>

      {isLoading && <p>Загрузка...</p>}
      <div
        ref={tableContRef}
        style={{
          flex: 1,
          overflowY: "scroll",
        }}
      >
        {pizzas && <Table<Pizza> data={pizzas} columns={columns} rowKey="id" />}
      </div>
      {/* {isOpenModal && (<ModalWindow isOpen={isOpenModal} onClose={() => setIsModalOpen(false)} size="large" children={<UsersAdminCrud data={} />}/>)} */}
    </div>
  );
};

export default PizzaAdmin;
