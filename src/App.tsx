import { BrowserRouter , Route, Routes,  } from "react-router-dom"

import SingleProductCard from "./components/products/ProductCard"
import ProductDetails from "./components/products/ProductDetails"


function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SingleProductCard />}/>
      <Route path="/product/:id" element={<ProductDetails />}/>
    </Routes>
     </BrowserRouter>

    </>
  )
}

export default App
