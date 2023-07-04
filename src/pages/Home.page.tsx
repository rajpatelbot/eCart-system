import { useEffect } from "react";
import { useFetch } from "../hook/useFetch";
import { ProductInterface, responseInterface } from "../helper/types";
import { Link } from "react-router-dom";

export default function Homepage() {
  const { data, fetchData, isLoading, error } = useFetch<responseInterface>();

  useEffect(() => {
    fetchData("https://dummyjson.com/products");
  }, []);

  const products: ProductInterface[] = data?.products || [];

  if (isLoading) {
    return <p className="text-center py-10">Loading the product data...</p>;
  }

  if (error) {
    return <p className="text-center py-10">Something went wrong!!</p>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          All products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data ? (
            products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700 font-bold">
                      <Link to={`/product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No product details found...</p>
          )}
        </div>
      </div>
    </div>
  );
}
