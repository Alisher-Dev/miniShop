import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/header/header";
import { Main } from "./components/main/main";

function App() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/category" element={null} />
        <Route path="/" element={null} />
      </Routes>
    </div>
  );
}

export default App;
