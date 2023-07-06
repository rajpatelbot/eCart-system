import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { StateInterface } from "../helper/types";
import { deleteCartItem } from "../store/slice/BaseSlice";

export default function Checkoutpage() {
  const dispatch = useDispatch();

  const products = useSelector(
    (state: StateInterface) => state.base.cartProducts
  );

  const totalPrice = products.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleRemove = (id: number) => {
    dispatch(deleteCartItem(id));
  };

  return (
    <div className="flex justify-center">
      <div className="w-full mx-auto max-w-7xl m-auto p-8">
        <div className="flex w-full justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
            {products.map((product) => (
              <div
                key={product.id}
                className="flex mb-4 items-start justify-between">
                <div className="flex items-start">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-32 rounded mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-gray-500">
                      Quantity: {product.quantity}
                    </p>
                    <p className="text-gray-500">Price: ${product.price}</p>
                  </div>
                </div>
                <RxCross1
                  className="ml-10 mt-2 cursor-pointer"
                  onClick={() => handleRemove(product.id)}
                />
              </div>
            ))}
            <div className="text-lg font-semibold mb-4">
              Total Price: ${totalPrice}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
            <form className="flex flex-col gap-3">
              {/* ... form fields here ... */}
              Address form & payment option
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Place Order ${totalPrice}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
