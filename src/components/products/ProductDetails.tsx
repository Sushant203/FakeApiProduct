import { useState, useEffect } from "react";
import {Link, useParams } from "react-router-dom";
import { IProduct } from "../../types/product";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>(); 
  const [product, setProduct] = useState<IProduct | null>(null);
  const [error, setError] = useState(false)

  // Fetch product data based on the ID
  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      setError(true);
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(); // Fetch product only if `id` exists
    }
  }, [id]);

  // Display loading state if data is not available yet
  if (!product) {
    return <div>Loading...</div>;
  }

  // Check if images array exists and has items before accessing it
  const imageSrc = product.images && product.images.length > 0 ? product.images[0] : "";

  return (
    <section className="p-6">
      <Link to="/">Back to Products</Link>
      <h1 className="text-3xl font-bold">{product.title}</h1>
      {imageSrc && (
        <figure>
          <img src={imageSrc} alt={product.title} className="w-full max-w-md" />
        </figure>
      )}
      <p>{product.description}</p>
      <p className="text-xl font-semibold text-price_color">${product.price}</p>
      <p className="text-sm">Category: {product.category}</p>
      <p className="text-sm">Rating: {product.rating}</p>
    </section>
  );
};

export default ProductDetails;
