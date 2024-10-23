import { Corusel } from "./corusel";
import { Product } from "./product-cart";

const test = [
  {
    img: [
      "https://www.asrock.com.tw/Graphics-Card/photo/Radeon%20RX%205700%20XT%20Challenger%20D%208G%20OC(M1).png",
      "https://www.asrock.com.tw/Graphics-Card/photo/Radeon%20RX%205700%20XT%20Challenger%20D%208G%20OC(M2).png",
      "https://www.asrock.com.tw/Graphics-Card/photo/Radeon%20RX%205700%20XT%20Challenger%20D%208G%20OC(M5).png",
      "https://www.asrock.com.tw/Graphics-Card/photo/Radeon%20RX%205700%20XT%20Challenger%20D%208G%20OC(M6).png",
    ],
    title: "AMD Radeon™ RX 5700 XT Challenger D 8G OC",
    desc: "Частота загрузки: Вплоть до 1905 MHz / 14 Gbps Game Clock: Вплоть до 1795 MHz / 14 Gbps Базовая частота: 1580 - 1650 MHz / 14 Gbps",
    price: "12000",
  },
];
export function Main() {
  return (
    <div>
      <Corusel />
      <div className="grid grid-cols-5 mt-10">
        {test.map((el, index) => (
          <Product
            key={index}
            img={el.img}
            desc={el.desc}
            title={el.title}
            price={el.price}
          />
        ))}
      </div>
    </div>
  );
}
