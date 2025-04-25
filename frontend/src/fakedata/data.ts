export interface IPizza {
  id: number;
  name: string;
  price: number;
  decription: string;
  quantity: number;
}

const pizzas: IPizza[] = [
  {
    id: 1,
    name: "Маргарита",
    price: 450,
    decription: "Классическая пицца с томатным соусом, моцареллой и базиликом.",
    quantity: 1,
  },
  {
    id: 2,
    name: "Пепперони",
    price: 550,
    decription: "Пицца с острыми колбасками пепперони и сыром моцарелла.",
    quantity: 1,
  },
  {
    id: 3,
    name: "Четыре сыра",
    price: 600,
    decription:
      "Сочетание четырех сыров: моцарелла, дорблю, пармезан и чеддер.",
      quantity: 1,
  },
  {
    id: 4,
    name: "Гавайская",
    price: 520,
    decription: "Пицца с ветчиной и ананасами на томатной основе.",
    quantity: 1,
  },
  {
    id: 5,
    name: "Мясная",
    price: 650,
    decription:
      "Пицца с говядиной, ветчиной, беконом и охотничьими колбасками.",
      quantity: 1,
  },
  {
    id: 6,
    name: "Вегетарианская",
    price: 500,
    decription: "Пицца с болгарским перцем, томатами, оливками и шампиньонами.",
    quantity: 1,
  },
  {
    id: 7,
    name: "Барбекю",
    price: 670,
    decription: "Пицца с курицей, беконом, луком и соусом барбекю.",
    quantity: 1,
  },
  {
    id: 8,
    name: "Морская",
    price: 700,
    decription: "Пицца с креветками, кальмарами, мидиями и чесночным соусом.",
    quantity: 1,
  },
  {
    id: 9,
    name: "Острый мексиканец",
    price: 620,
    decription: "Пицца с острым перцем халапеньо, фаршем и кукурузой.",
    quantity: 1,
  },
  {
    id: 10,
    name: "Грибная",
    price: 530,
    decription: "Пицца с шампиньонами, луком и сливочным соусом.",
    quantity: 1,
  },
  {
    id: 11,
    name: "Цыпленок ранч",
    price: 640,
    decription: "Пицца с курицей, томатами, луком и соусом ранч.",
    quantity: 1,
  },
  {
    id: 12,
    name: "Прошутто",
    price: 690,
    decription: "Пицца с прошутто, рукколой и пармезаном.",
    quantity: 1,
  },
  {
    id: 13,
    name: "Карбонара",
    price: 660,
    decription: "Пицца с беконом, сливочным соусом, яйцом и сыром.",
    quantity: 1,
  },
  {
    id: 14,
    name: "Трюфельная",
    price: 800,
    decription: "Пицца с трюфельным маслом, грибами и сыром страчателла.",
    quantity: 1,
  },
  {
    id: 15,
    name: "Неаполитанская",
    price: 590,
    decription: "Пицца с томатами, моцареллой, анчоусами и каперсами.",
    quantity: 1,
  },
];

export default pizzas;
