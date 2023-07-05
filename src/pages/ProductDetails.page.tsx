import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { addCartItems } from "../store/slice/BaseSlice";
import { useFetch } from "../hook/useFetch";
import { CartProductsInterface, WishListStateInterface } from "../helper/types";
import { AiOutlineHeart } from "react-icons/ai";
import {
  addToWishlist,
  deleteWishlistItem,
} from "../store/slice/WishlistSlice";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, fetchData, isLoading } = useFetch<CartProductsInterface>();
  const [quantity, setQuantity] = useState<number>(1);
  const [wishlist, setWishlist] = useState<boolean>(false);
  const [currWishlist, setCurrWishlist] = useState<number>(1);

  const wishListProducts = useSelector(
    (state: WishListStateInterface) => state.wishList.wishlistProducts
  );

  useEffect(() => {
    fetchData(`https://dummyjson.com/products/${id}`);
  }, []);

  useEffect(() => {
    const currentWishlistedItem = wishListProducts.findIndex(
      (list) => list.id === data?.id
    );

    setCurrWishlist(currentWishlistedItem);
  }, [data, wishListProducts]);

  const handleAddToCart = () => {
    if (data) {
      const newItem: CartProductsInterface = {
        ...data,
        quantity: quantity,
        wishlist: false,
      };
      dispatch(addCartItems(newItem));
    }
  };

  const handleToWishlist = () => {
    setWishlist(!wishlist);

    if (data && !wishlist) {
      const newWishlistProduct = { ...data, wishlist: true };
      dispatch(addToWishlist(newWishlistProduct));
    }

    if (data && wishlist) {
      dispatch(deleteWishlistItem(data.id));
    }
  };

  return (
    <section className="pt-12 pb-24 bg-blueGray-100 rounded-b-10xl overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        {!isLoading ? (
          data ? (
            <div className="flex flex-wrap -mx-4">
              <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                <div className="flex -mx-4 flex-wrap items-center justify-between lg:justify-start lg:items-start xl:items-center">
                  <div className="w-full sm:w-auto min-w-max px-4 text-center flex sm:flex-col items-center justify-center">
                    <img className="h-full w-full" src={data.thumbnail} />
                    <div className="flex w-full items-center mt-3 justify-between">
                      {data.images.map((image, key) => (
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
                    APPLE ${data.id}
                  </span>
                  <h2 className="my-6 mb-4 text-2xl md:text-3xl lg:text-4xl font-heading font-medium">
                    {data?.title}
                  </h2>
                  <p className="flex items-center mb-6">
                    <span className="mr-2 text-sm text-blue-500 font-medium">
                      $
                    </span>
                    <span className="text-xl text-blue-500 font-medium">
                      {data.price}
                    </span>
                  </p>
                  <p className="text-base text-gray-400">{data.description}</p>
                </div>
                <div className="mb-10">
                  <h4 className="mb-3 font-heading font-medium">Qty:</h4>
                  <input
                    className="w-24 px-3 py-2 text-center bg-white border-2 border-blue-500 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                    type="number"
                    placeholder="1"
                    value={quantity}
                    min={1}
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
                    <button
                      className="flex w-full py-2 px-2 items-center justify-center leading-8 font-heading font-medium tracking-tighter text-base text-center bg-white focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl"
                      onClick={handleToWishlist}>
                      <span className="mr-2">Wishlist</span>
                      {currWishlist !== -1 ? (
                        <FcLike className="text-xl" />
                      ) : (
                        <AiOutlineHeart className="text-xl" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Nothing found!!</p>
          )
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </section>
  );
}
