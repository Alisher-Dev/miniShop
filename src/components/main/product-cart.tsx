import { useEffect, useState } from "react";
import { IParamsProduct } from "../types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { FormatPrice } from "../helpers/PriceFormat";
import { Check, ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";
import { DialogProduct } from "./product-dialog";
import { AddStorage } from "../helpers/storage";
import { useStore } from "../helpers/store";

export function Product({ img, title, desc, price }: IParamsProduct) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const cart = useStore((state) => state.cart);
  const add = useStore((state) => state.addCart);

  const addCarts = () => {
    add({ desc, img, price, title });
    AddStorage("cart", JSON.stringify([...cart, { desc, img, price, title }]));
  };

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <div className="hover:shadow-md transition-all rounded-md cursor-pointer">
        <div onClick={() => setOpen(!open)}>
          <Carousel setApi={setApi} className="hover:bg-gray-100 rounded-md">
            <CarouselContent className="w-full h-[250px] relative m-0 ">
              {img.map((el, index) => (
                <CarouselItem
                  key={index}
                  className="flex items-center justify-between p-10 hover:scale-110 transition-all"
                >
                  <img
                    src={el}
                    className="w-full h-full object-contain"
                    alt="producs img"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="py-2 text-center text-sm text-muted-foreground absolute top-1 left-2">
              {current} / {count}
            </div>
          </Carousel>
          <div className="p-2 grid gap-2">
            <p className="text-sm font-bold max-h-11 overflow-hidden">
              {title}
            </p>
            <p className="text-xs max-h-12 overflow-hidden">{desc}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 p-2">
          <p>{FormatPrice(price)}</p>
          {cart.map((el) => el.desc).includes(desc) ? (
            <Button>
              <Check />
            </Button>
          ) : (
            <Button onClick={addCarts}>
              <ShoppingBasket />
            </Button>
          )}
        </div>
      </div>
      <DialogProduct
        desc={desc}
        img={img}
        title={title}
        price={price}
        isOpen={open}
        setOpen={setOpen}
      />
    </>
  );
}
