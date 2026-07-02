import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearLastOrder } from "../store/reducers/orderSlice";
import { CheckCircleIcon } from "../components/Icons";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const lastOrder = useSelector((state) => state.orders.lastOrder);

  useEffect(() => {
    return () => dispatch(clearLastOrder());
  }, [dispatch]);

  const order = lastOrder && lastOrder.id === orderId ? lastOrder : null;

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15 text-green-400">
        <CheckCircleIcon className="h-9 w-9" />
      </span>
      <h1 className="text-2xl font-semibold">Order placed successfully!</h1>
      <p className="text-gray-400">
        Thank you for shopping with ShopEase. Your order id is{" "}
        <span className="font-mono text-blue-400">{orderId}</span>.
      </p>

      {order && (
        <div className="mt-4 w-full rounded-xl border border-white/10 bg-gray-800/60 p-6 text-left">
          <p className="mb-3 font-medium text-white">Order Summary</p>
          <div className="flex flex-col gap-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-400">
                <span>{item.title} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between border-t border-white/10 pt-3 font-semibold">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Delivering to {order.address.fullName}, {order.address.city}, {order.address.state} –{" "}
            {order.address.pincode}
          </p>
        </div>
      )}

      <div className="mt-4 flex gap-3">
        <Link to="/products" className="rounded-md bg-blue-500 px-5 py-2.5 font-medium hover:bg-blue-600">
          Continue Shopping
        </Link>
        <Link to="/orders" className="rounded-md border border-white/10 px-5 py-2.5 font-medium text-gray-300 hover:bg-white/5">
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
