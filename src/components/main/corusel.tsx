import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { Slide, Zoom } from "react-awesome-reveal";
import { DialogProduct } from "./product-dialog";
import { IProduct } from "../types";
import { api } from "../api/axios";
import { urls } from "../api/urls";

export function Corusel() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>();
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    api(urls.product.get)
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  }, []);

  if (!data) return <p>loading ...</p>;
  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        className="bg-gray-100 cursor-pointer"
      >
        <CarouselContent className="w-full min-h-[300px] rounded-md m-0">
          {data.slice(0, 3).map((el, index) => (
            <CarouselItem
              onClick={() => [setOpen(true), setProduct(el)]}
              key={index}
              className="flex flex-col md:flex-row items-center justify-between p-6 md:p-10 gap-4 md:gap-8 overflow-hidden"
            >
              <div className="grid gap-3 text-center md:text-left">
                <Slide>
                  <p className="font-bold text-sm md:text-xl lg:text-2xl md:max-w-[80%]">
                    {el.title}
                  </p>
                </Slide>
                <Slide delay={300}>
                  <p className="font-thin text-xs md:text-base lg:text-lg md:max-w-[70%]">
                    {el.desc}
                  </p>
                </Slide>
              </div>
              <Zoom className="h-full">
                <img
                  className="object-contain h-full max-h-[200px] sm:max-h-[300px] md:max-h-[350px] min-h-[200px] min-w-[200px]"
                  src={el?.img?.[0]}
                  alt="catalog img"
                />
              </Zoom>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <DialogProduct product={product!} isOpen={open} setOpen={setOpen} />
    </>
  );
}
