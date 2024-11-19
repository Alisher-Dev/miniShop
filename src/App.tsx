import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/header/header";
import { Main } from "./components/main/main";
import { Footer } from "./components/footer/footer";
import { Cart } from "./components/cart/cart";
import { Toaster } from "./components/ui/toaster";
import { Guard } from "./components/admin/guard";
import { Admin } from "./components/admin/admin";

function App() {
  return (
    <>
      <div className="max-w-[1400px] mx-auto">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Guard />} />
          <Route path="/admin/dash" element={<Admin />} />
        </Routes>
        <Toaster />
      </div>
      <Footer />
    </>
  );
}

export default App;
