import { useDispatch, useSelector } from "react-redux";
import { WishListStateInterface } from "../helper/types";
import {
  deleteWishlistItem,
  emptyWishlist,
} from "../store/slice/WishlistSlice";

export default function Wishlistpage() {
  const dispatch = useDispatch();

  const wishListProducts = useSelector(
    (state: WishListStateInterface) => state.wishList.wishlistProducts
  );

  const handleWishlistItem = (id: number) => {
    dispatch(deleteWishlistItem(id));
  };

  const handleEmptyWishlist = () => {
    dispatch(emptyWishlist());
  };

  return (
    <div className="mx-auto max-w-7xl py-10">
      <h1 className="text-2xl font-bold mb-4">
        Your Wishlist ({wishListProducts.length})
      </h1>
      {wishListProducts.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {wishListProducts.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={item.thumbnail}
                          alt={item.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${item.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => handleWishlistItem(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-gray-100">
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={handleEmptyWishlist}>
              Empty Wishlist
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg font-semibold">Wishlist is empty</p>
      )}
    </div>
  );
}
