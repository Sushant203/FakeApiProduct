import { IProduct } from "../../types/product"

type Props={
 product:IProduct;
}
const SingleProductCard = ({product}: Props) => {
  return (
    <section className="  border flex flex-col items-start justify-items-center">
        <figure className=" max-w-32  mx-auto bg-transparent border-none">
            <img src={product.image} alt={product.title} className="h-auto max-w-full object-cover mix-blend-overlay"/>
           
        </figure>
        {/* title of product */}
       <h2 className="font-2xl font-semibold text-ellipsis overflow-hidden ..."> {product.title}</h2>

        {/* description */}
        {/* <p className="text-xs text-slate-300">{product.description}</p> */}

        {/* price  */}
        <p className="text-xl font-semibold text-price_color">${product.price}</p>
    </section>
  )
}

export default SingleProductCard;