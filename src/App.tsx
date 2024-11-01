import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/header/header";
import { Main } from "./components/main/main";
import { Footer } from "./components/footer/footer";
import { Cart } from "./components/cart/cart";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <div className="max-w-[1400px] mx-auto">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={null} />
        </Routes>
        <Toaster />
      </div>
      <Footer />
    </>
  );
}

export default App;
