import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductCard from "../../components/ProductCard";
import { HeartIcon } from "../../components/Icons";
import { clearWishlist } from "../../store/reducers/wishlistSlice";

const Wishlist = () => {
  const items = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <HeartIcon className="h-12 w-12 text-gray-600" />
        <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
        <p className="max-w-sm text-sm text-gray-500">
          Tap the heart icon on any product to save it here for later.
        </p>
        <Link to="/products" className="rounded-md bg-blue-500 px-5 py-2.5 font-medium hover:bg-blue-600">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Wishlist</h1>
        <button
          onClick={() => {
            dispatch(clearWishlist());
            toast.info("Wishlist cleared");
          }}
          className="rounded-md border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
        >
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
