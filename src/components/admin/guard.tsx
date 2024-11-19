import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { AddStorage, FindStorage } from "../helpers/storage";

export function Guard() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const passwordHash = "2$556^^7***()():__a__d$##M)__I_+++N(**&2$$";
  const nameHash = "2$5$55^^7*(():__a__d$#M)__I_+_N({``2$$";
  const navigate = useNavigate();
  const admin = FindStorage("admin");

  useEffect(() => {
    if (admin) {
      navigate("/admin/dash");
    }
  }, [admin]);

  const Auth = () => {
    let hashPass = passwordHash
      .match(/[a-zA-Z]/g)
      ?.join("")
      .toLocaleLowerCase();

    let hashName = nameHash
      .match(/[a-zA-Z]/g)
      ?.join("")
      .toLocaleLowerCase();

    setName("");
    setPassword("");

    if (hashName === name && hashPass === password) {
      toast({
        title: "успешный вход в систему",
        variant: "default",
      });
      navigate("/admin/dash");
      AddStorage("admin", true);
      return null;
    }
    toast({
      title: "имя администратора или пароль неверны",
      variant: "destructive",
    });
  };

  return (
    <div className="h-[80vh] w-full flex items-center justify-center gap-20">
      <div className="w-fit flex rounded-lg flex-col gap-5 shadow-md bg-[rgb(243,244,246)] p-10">
        <p className="font-bold">Admin</p>
        <input
          className="w-[500px] h-8 px-3 shadow-sm"
          placeholder="admin name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-[500px] h-8 px-3 shadow-sm"
          placeholder="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={Auth} className="ml-auto w-fit shadow-sm">
          Next
        </Button>
      </div>
      <img
        src="https://cdn.dribbble.com/users/76502/screenshots/5251755/jet_animation.gif"
        alt="error"
        className="w-[400px] rounded-lg object-cover shadow-md"
      />
    </div>
  );
}
