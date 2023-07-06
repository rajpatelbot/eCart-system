import { useDispatch, useSelector } from "react-redux";
import { StateInterface } from "../helper/types";
import { deleteCartItem } from "../store/slice/BaseSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Cartpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state: StateInterface) => state.base.cartProducts
  );

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  const handleDeleteCartItem = (id: number) => {
    dispatch(deleteCartItem(id));
  };

  return (
    <div className="mx-auto max-w-7xl py-10">
      <h1 className="text-2xl font-bold mb-4">
        Your Cart ({cartItems.length})
      </h1>
      {cartItems.length > 0 ? (
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
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cartItems.map((item) => (
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
                        <Link
                          to={`/product/${item.id}`}
                          className="text-sm font-medium text-gray-900 underline">
                          {item.title}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${item.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${item.price * item.quantity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteCartItem(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-gray-100">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal:</span>
              <span className="font-bold">${calculateSubtotal()}</span>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => navigate("/checkout")}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg font-semibold">Cart is empty</p>
      )}
    </div>
  );
}
