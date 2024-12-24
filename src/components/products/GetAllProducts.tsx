import { useState,useEffect } from "react";
import { IProduct } from "../../types/product";
import SingleProductCard from "./singleProductCard";

const GetAllProducts = () => {
    const [product, setProduct] = useState<IProduct[]>([]);
const fetchProducts= async ()=>{
   const res= await fetch('https://fakestoreapi.com/products')
    const data= await res.json()
    setProduct(data)
    console.log(data);
}
useEffect(()=>{
    fetchProducts();
})    

  return (
    <section className="">
        <div className="mx-4 border rounded-md shadow-md grid grid-cols-3 gap-5 ">
        
                {(product as IProduct[]).map((product,i)=>{
                    return(
                        <div key={i}>
                          <SingleProductCard product={product}/>
                        </div>
                    )
                })}
        
        </div>
    </section>
  )
}

export default GetAllProducts