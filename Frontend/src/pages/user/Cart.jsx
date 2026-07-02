import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
  clearCart,
} from "../../store/reducers/CartSlice";
import ConfirmDialog from "../../components/ConfirmDialog";
import { FALLBACK_IMAGE, handleImgError } from "../../utils/img";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmClear, setConfirmClear] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <span className="text-5xl">🛒</span>
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="max-w-sm text-sm text-gray-500">
          Looks like you haven't added anything yet. Explore our catalog and find something you'll love.
        </p>
        <Link to="/products" className="rounded-md bg-blue-500 px-5 py-2.5 font-medium hover:bg-blue-600">
          Browse Products
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!currentUser) {
      toast.info("Please login to checkout");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Your Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-lg border border-white/10 bg-gray-800/60 p-4 sm:flex-row sm:items-center"
            >
              <img
                src={item.image || FALLBACK_IMAGE}
                onError={handleImgError}
                alt={item.title}
                className="h-20 w-20 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-400">₹{item.price}</p>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-normal">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(decrementQty(item.id))}
                    className="h-8 w-8 rounded-md bg-white/10 hover:bg-white/20"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => dispatch(incrementQty(item.id))}
                    className="h-8 w-8 rounded-md bg-white/10 hover:bg-white/20"
                  >
                    +
                  </button>
                </div>
                <p className="w-20 text-right font-semibold">₹{item.price * item.qty}</p>
                <button
                  onClick={() => {
                    dispatch(removeFromCart(item.id));
                    toast.info("Item removed from cart");
                  }}
                  className="text-sm text-red-400 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => setConfirmClear(true)}
            className="w-fit rounded-md border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
          >
            Clear Cart
          </button>
        </div>

        <div className="h-fit rounded-xl border border-white/10 bg-gray-800/60 p-5">
          <p className="mb-4 font-medium text-white">Order Summary</p>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-400">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>
          {shipping > 0 && (
            <p className="mt-2 text-xs text-blue-400">Add ₹{999 - subtotal} more for free shipping</p>
          )}
          <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-lg font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-5 w-full rounded-md bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmClear}
        title="Clear cart?"
        message="This will remove all items from your cart."
        onCancel={() => setConfirmClear(false)}
        onConfirm={() => {
          dispatch(clearCart());
          setConfirmClear(false);
          toast.info("Cart cleared");
        }}
      />
    </div>
  );
};

export default Cart;
