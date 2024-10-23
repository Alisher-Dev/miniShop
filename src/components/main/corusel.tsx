import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../ui/button";
import { useRef } from "react";

const test = [
  {
    title: "Everything you need to help you sell your AMD-powered systems.",
    desc: "For build and sales support, find model specifications, explore sales tools for product features, highlights, and competitive comparisons, and learn more by taking product training courses. To help drive your marketing efforts, download AMD product logos and badges and leverage AMD co-branded marketing materials featuring your own product images and logos.",
    image:
      "https://www.amd.com/content/dam/amd/en/images/products/desktops/desktop-radeon-6700xt-transparent.png",
  },
  {
    title: "GeForce RTX™ 4070 Ti SUPER AERO OC 16G",
    desc: "The metal back plate not only provides an aesthetical shape, but also enhances the structure of the graphics card to provide complete protection.",
    image:
      "https://static.gigabyte.com/StaticFile/Image/Global/f21f68f9a7cc5402a7d1559ca7cfa684/Product/39116/Png",
  },
];

export function Corusel() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  return (
    <Carousel plugins={[plugin.current]} className="bg-gray-100 cursor-pointer">
      <CarouselContent className="w-full h-[420px] rounded-md">
        {test.map((el, index) => (
          <CarouselItem
            key={index}
            className="flex items-center justify-between p-10"
          >
            <div className="grid gap-3">
              <p className="font-bold text-xl max-w-[80%]">{el.title}</p>
              <p className="font-thin text-base max-w-[70%]">{el.desc}</p>
              <Button className="w-fit px-8">more info</Button>
            </div>
            <img className="h-full" src={el.image} alt="catalog img" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
