import { MapPinned, Phone } from "lucide-react";

export function Footer() {
  return (
    <div className="w-full p-5 bg-black mt-5">
      <div className="max-w-[1400px] mx-auto grid gap-4">
        <div className="flex items-center justify-between">
          <p className="font-medium text-xl text-white">
            Universam online magazin
          </p>
          <a href="https://t.me/Uuniversalmagazin" target="_blank">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png"
              className="size-10"
              alt="telegram"
            />
          </a>
        </div>
        <div className="flex items-center  gap-3 text-white">
          <Phone size={20} />
          <a href="tel:998992027806">
            <p className="font-medium">+998 (99) 202-78-06</p>
          </a>
        </div>
        <div className="flex items-center  gap-3 text-white">
          <MapPinned />
          <a href="https://maps.app.goo.gl/Dagz8w7w1zwDUDFz9" target="_blank">
            <p className="font-medium">Хорезмская область, Узбекистан</p>
          </a>
        </div>
      </div>
    </div>
  );
}
