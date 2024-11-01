import { ChevronLeft, Trash2 } from "lucide-react";
import { FormatPrice } from "../helpers/PriceFormat";
import { Button } from "../ui/button";
import { useStore } from "../helpers/store";
import { AddStorage } from "../helpers/storage";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Cart() {
  const cart = useStore((state) => state.cart);
  const remove = useStore((state) => state.removeCart);
  const clear = useStore((state) => state.clearCart);
  const navigate = useNavigate();
  const [telefon, setTelefon] = useState("");
  const { toast } = useToast();

  const removeCart = (desc: string) => {
    remove(cart.filter((el) => el.desc === desc)[0]);
    AddStorage("cart", JSON.stringify(cart.filter((el) => el.desc !== desc)));
  };

  const totalPrice = () => {
    let price = 0;
    cart.map((el) => {
      price += +el.price;
    });
    return price;
  };

  const Order = (delevery: string) => {
    let orderProduct = `
🛒 Заказ на доставку
    
📦 Доставка: ${delevery}
💰 Общая цена: ${FormatPrice(totalPrice().toString())}

😉 Номер телефона клиента: ${telefon}
    
📝 Продукты: 
  ${cart
    .map(
      (el, index) =>
        `${index + 1}. *имя: ${el.title}\n *Описание: ${
          el.desc
        }\n *Цена: ${FormatPrice(el.price.toString())}`
    )
    .join("\n\n")}`;

    if (!cart.length || telefon.length < 8) {
      return toast({
        title: "телефон не указан или товар не выбран",
        variant: "destructive",
      });
    } else {
      api(
        "",
        {
          chat_id: 1994937115,
          text: orderProduct,
        },
        "POST",
        "telegram"
      ).then(
        (res) =>
          res.status === 200 &&
          (clear(), window.localStorage.clear(), setTelefon(""))
      );
    }
  };

  return (
    <div className="min-h-[75vh]">
      <Button onClick={() => navigate("/")} variant="outline" className="mb-2">
        <ChevronLeft />
      </Button>
      <div className="w-full rounded-md grid  grid-cols-1 gap-2 lg:grid-cols-3">
        <div className="border border-gray grid gap-3 rounded-md p-2 md:gap-5 col-span-2">
          {!cart[0] && (
            <p className="m-auto font-bold text-sm md:text-lg">корзина чиста</p>
          )}
          {cart.map((el, index) => (
            <div key={index} className="flex gap-3 md:gap-5 items-center">
              <div className="w-24 h-20 md:w-40 md:h-32">
                <img
                  src={el.img[0]}
                  alt="product"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="w-full">
                <p className="text-xs md:text-sm lg:text-base font-semibold max-h-5 overflow-hidden">
                  {el.title?.length > 70
                    ? el.title.substring(0, 68) + "..."
                    : el.title}
                </p>
                <p className="hidden sm:block text-xs lg:text-sm my-2 max-h-15 overflow-hidden">
                  {el.desc?.length > 83
                    ? el.desc.substring(0, 80) + "..."
                    : el.desc}
                </p>
                <p className="text-xs md:text-sm lg:text-base font-semibold">
                  {FormatPrice(el.price)}
                </p>
              </div>
              <Button onClick={() => removeCart(el.desc)}>
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
        <div className="border border-gray grid gap-3 rounded-md p-2 h-fit">
          <p className="text-sm md:text-base lg:text-base font-semibold text-center md:text-left">
            общая цена: {FormatPrice(totalPrice().toString())}
          </p>
          <div className="w-full">
            <label>оставьте номер телефона</label>
            <input
              type="number"
              className="border border-slate-500 py-1.5 px-2 rounded-sm w-full"
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              placeholder="оставьте номер телефона"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button onClick={() => Order("kerak emas")}>заказать</Button>
            <Button onClick={() => Order("kerak")}>заказать с доставкой</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
