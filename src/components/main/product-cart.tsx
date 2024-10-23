import { useEffect, useState } from "react";
import { IParamsProduct } from "../types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { FormatPrice } from "../helpers/PriceFormat";

export function Product({ img, title, desc, price }: IParamsProduct) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
    <div>
      <Carousel setApi={setApi} className="hover:bg-gray-100 cursor-pointer">
        <CarouselContent className="w-full h-[250px] rounded-md">
          {img.map((el, index) => (
            <CarouselItem
              key={index}
              className="flex items-center justify-between p-10"
            >
              <img src={el} alt="producs img" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="py-2 text-center text-sm text-muted-foreground">
          {current} of {count}
        </div>
      </Carousel>
      <div className="p-2 grid gap-2">
        <p className="text-sm font-bold">{title}</p>
        <p className="text-xs max-h-11 overflow-hidden">{desc}</p>
        <p>{FormatPrice(price)}</p>
      </div>
    </div>
  );
}
