import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductInterface } from "../helper/types";
import { AiOutlineHeart } from "react-icons/ai";
import { useFetch } from "../hook/useFetch";

export default function Checkoutpage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState<number>(1);

  const { data, error, fetchData, isLoading } = useFetch<ProductInterface>();

  useEffect(() => {
    fetchData(`https://dummyjson.com/products/${id}`);
  }, []);

  if (isLoading) {
    return <p>Fetching the product</p>;
  }

  if (error) {
    return <p className="text-center py-10">Something went wrong!!</p>;
  }

  const handleAddToCart = () => {
    console.log("Item added");
  };

  return (
    <section className="pt-12 pb-24 bg-blueGray-100 rounded-b-10xl overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
            <div className="flex -mx-4 flex-wrap items-center justify-between lg:justify-start lg:items-start xl:items-center">
              <div className="w-full sm:w-auto min-w-max px-4 text-center flex sm:flex-col items-center justify-center">
                <img className="h-full w-full" src={data?.thumbnail} alt="" />
                <div className="flex w-full items-center mt-3 justify-between">
                  {data?.images?.map((image, key) => (
                    <img
                      className="h-20 w-26 bg-slate-50"
                      src={image}
                      alt={data?.title}
                      key={key}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="max-w-md mb-6">
              <span className="text-xs text-gray-400 tracking-wider">
                APPLE ${data?.id}
              </span>
              <h2 className="my-6 mb-4 text-2xl md:text-3xl lg:text-4xl font-heading font-medium">
                {data?.title}
              </h2>
              <p className="flex items-center mb-6">
                <span className="mr-2 text-sm text-blue-500 font-medium">
                  $
                </span>
                <span className="text-xl text-blue-500 font-medium">
                  {data?.price}
                </span>
              </p>
              <p className="text-base text-gray-400">{data?.description}</p>
            </div>
            <div className="mb-10">
              <h4 className="mb-3 font-heading font-medium">Qty:</h4>
              <input
                className="w-24 px-3 py-2 text-center bg-white border-2 border-blue-500 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                type="number"
                placeholder="1"
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
              />
            </div>
            <div className="flex flex-wrap -mx-2 mb-12">
              <div className="w-full md:w-2/3 px-2 mb-2 md:mb-0">
                <button
                  className="block py-2 px-2 leading-8 font-heading font-medium tracking-tighter text-base text-white text-center bg-blue-500 focus:ring-2 w-full focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600 rounded-xl"
                  onClick={handleAddToCart}>
                  Add to bag
                </button>
              </div>
              <div className="w-full md:w-1/3 px-2">
                <button className="flex w-full py-2 px-2 items-center justify-center leading-8 font-heading font-medium tracking-tighter text-base text-center bg-white focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl">
                  <span className="mr-2">Wishlist</span>
                  <AiOutlineHeart className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
