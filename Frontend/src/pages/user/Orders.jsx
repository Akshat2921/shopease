import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetOrdersByUser } from "../../store/reducers/orderSlice";
import Loader from "../../components/Loader";
import { BoxIcon } from "../../components/Icons";
import { FALLBACK_IMAGE, handleImgError } from "../../utils/img";

const STATUS_STYLES = {
  placed: "bg-blue-500/15 text-blue-300",
  shipped: "bg-yellow-500/15 text-yellow-300",
  delivered: "bg-green-500/15 text-green-300",
};

const Orders = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { items, status } = useSelector((state) => state.orders);

  useEffect(() => {
    if (currentUser) dispatch(asyncGetOrdersByUser(currentUser.id));
  }, [dispatch, currentUser]);

  if (status === "loading") return <Loader label="Loading your orders..." />;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <BoxIcon className="h-12 w-12 text-gray-600" />
        <h2 className="text-xl font-semibold">No orders yet</h2>
        <p className="max-w-sm text-sm text-gray-500">
          Your placed orders will show up here once you check out.
        </p>
        <Link to="/products" className="rounded-md bg-blue-500 px-5 py-2.5 font-medium hover:bg-blue-600">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">My Orders</h1>
      <div className="flex flex-col gap-4">
        {items.map((order) => (
          <div key={order.id} className="rounded-xl border border-white/10 bg-gray-800/60 p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-mono text-sm text-gray-400">Order #{order.id}</p>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_STYLES[order.status] || "bg-gray-600/30 text-gray-300"}`}>
                {order.status}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image || FALLBACK_IMAGE}
                    onError={handleImgError}
                    alt={item.title}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm text-gray-200">{item.title}</p>
                    <p className="text-xs text-gray-500">Qty {item.qty}</p>
                  </div>
                  <p className="text-sm font-medium">₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between border-t border-white/10 pt-3 font-semibold">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
