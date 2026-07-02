import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { asyncPlaceOrder } from "../store/reducers/orderSlice";
import { clearCart } from "../store/reducers/CartSlice";
import { FALLBACK_IMAGE, handleImgError } from "../utils/img";

const Checkout = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const items = useSelector((state) => state.cart.items);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { status } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;

  if (!currentUser) return <Navigate to="/login" replace />;
  if (items.length === 0) return <Navigate to="/cart" replace />;

  const placeOrder = async (address) => {
    const result = await dispatch(
      asyncPlaceOrder({ userId: currentUser.id, items, address, total })
    );
    if (asyncPlaceOrder.fulfilled.match(result)) {
      dispatch(clearCart());
      toast.success("Order placed successfully!");
      navigate(`/order-confirmation/${result.payload.id}`);
    } else {
      toast.error("Something went wrong placing your order");
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Checkout</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={handleSubmit(placeOrder)}
          className="flex flex-col gap-4 rounded-xl border border-white/10 bg-gray-800/60 p-6"
        >
          <p className="font-medium text-white">Shipping Details</p>

          <div>
            <label className="mb-1 block text-sm text-gray-400">Full Name</label>
            <input
              className="w-full rounded-md border border-white/10 bg-gray-900 p-3 outline-none focus:border-blue-400"
              defaultValue={currentUser.username}
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-400">Phone Number</label>
            <input
              type="tel"
              className="w-full rounded-md border border-white/10 bg-gray-900 p-3 outline-none focus:border-blue-400"
              {...register("phone", {
                required: "Phone number is required",
                pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
              })}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-400">Address</label>
            <textarea
              rows={2}
              className="w-full rounded-md border border-white/10 bg-gray-900 p-3 outline-none focus:border-blue-400"
              {...register("street", { required: "Address is required" })}
            />
            {errors.street && <p className="mt-1 text-sm text-red-400">{errors.street.message}</p>}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm text-gray-400">City</label>
              <input
                className="w-full rounded-md border border-white/10 bg-gray-900 p-3 outline-none focus:border-blue-400"
                {...register("city", { required: "Required" })}
              />
              {errors.city && <p className="mt-1 text-sm text-red-400">{errors.city.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">State</label>
              <input
                className="w-full rounded-md border border-white/10 bg-gray-900 p-3 outline-none focus:border-blue-400"
                {...register("state", { required: "Required" })}
              />
              {errors.state && <p className="mt-1 text-sm text-red-400">{errors.state.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">Pincode</label>
              <input
                className="w-full rounded-md border border-white/10 bg-gray-900 p-3 outline-none focus:border-blue-400"
                {...register("pincode", {
                  required: "Required",
                  pattern: { value: /^[0-9]{6}$/, message: "6-digit pincode" },
                })}
              />
              {errors.pincode && <p className="mt-1 text-sm text-red-400">{errors.pincode.message}</p>}
            </div>
          </div>

          <div className="mt-2 rounded-md border border-white/10 bg-gray-900/60 p-3 text-sm text-gray-400">
            Payment: <span className="text-gray-200">Cash on Delivery</span> — this is a demo
            storefront, no real payment is processed.
          </div>

          <button
            disabled={status === "loading"}
            className="mt-2 w-fit rounded-md bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {status === "loading" ? "Placing order..." : `Place Order — ₹${total}`}
          </button>
        </form>

        <div className="h-fit rounded-xl border border-white/10 bg-gray-800/60 p-5">
          <p className="mb-4 font-medium text-white">Order Summary</p>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
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
          <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-sm text-gray-400">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-400">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-lg font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
