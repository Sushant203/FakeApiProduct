import {useState} from "react";
import { IProduct } from "../../types/product"

type Props = {
    product: Pick<IProduct, 'id' | 'title'>,   
}
type PaginationProps={
    products: Props[]
}

const Pagination = ({products}:PaginationProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    // we have to show 8 products per page therefore
    const productsPerPage=8;

    //to calculate the total no. of pages we will have
    const totalPages= Math.ceil(products.length / productsPerPage);

    //to show the products of currrent page
    const indexOfLastProduct = currentPage* productsPerPage;
    const indexOfFirstProduct= indexOfLastProduct - productsPerPage;
    const currentProducts= products.slice(indexOfFirstProduct,indexOfLastProduct);

    //To handle the page change
    const handlePageChange= (pageNumber : number)=>{
        setCurrentPage(pageNumber);
    }
  return (
    <section>
        <ol className="flex items-center gap-6">
            {currentProducts.map((item)=>(
                <li key={item.product.id}>{item.product.title}</li>
            ))}
        </ol>

        {/* pagination control */}
        <div>
            <button
            disabled={currentPage === 1}
            onClick={()=>handlePageChange(currentPage - 1)}>prev</button>
            {[...Array(totalPages)].map((_,index)=>(
                <button
                key={index}
                className={currentPage === index+1 ? "active":""}
                onClick={()=>handlePageChange(index+1)}>
                    {index+1}
                </button>
            ))}

            <button 
            disabled={currentPage === totalPages}
            onClick={()=> handlePageChange(currentPage +1)}>
                Next
            </button>
        </div>
    </section>
  )
}

export default Pagination