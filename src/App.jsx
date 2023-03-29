import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./component/Layout/Layout";
import MainPage from "./pages/MainPage";
import ProductEditPage from "./pages/ProductEditPage";
import ProductViewPage from "./pages/ProductViewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/product" element={<ProductViewPage />} />
          <Route path="/product/edit" element={<ProductEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
