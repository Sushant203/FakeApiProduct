import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../types/product";

const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products); 
      console.log(data.products); // For debugging
    } catch (error) {
      console.error("Failed to load the data", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border flex flex-col items-start justify-items-center">
            <Link to={`/product/${product.id}`} className="w-full">
              {/* Product Image */}
              <figure className="max-w-32 mx-auto bg-transparent border-none">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-48 w-48 object-cover"
                />
              </figure>

              {/* Title of the product */}
              <h2 className="font-2xl font-semibold text-ellipsis overflow-hidden whitespace-nowrap ...">
                {product.title}
              </h2>

              {/* Product Price */}
              <p className="text-xl font-semibold text-price_color">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
