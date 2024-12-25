import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../types/product";

const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;

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

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border flex flex-col items-start justify-items-center p-4 sm:p-6"
          >
            <Link to={`/product/${product.id}`} className="w-full">
              {/* Product Image */}
              <figure className="max-w-32 mx-auto bg-transparent border-none">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-36 w-36 sm:h-48 sm:w-48 object-cover mx-auto"
                />
              </figure>

              {/* Title of the product */}
              <h2 className="text-lg sm:text-xl font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                {product.title}
              </h2>

              {/* Product Price */}
              <p className="text-md sm:text-lg font-semibold text-price_color mt-2">
                ${product.price}
              </p>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls flex justify-center mt-6 space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="text-sm sm:text-base px-3 sm:px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`text-sm sm:text-base px-3 sm:px-4 py-2 rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="text-sm sm:text-base px-3 sm:px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ProductList;
