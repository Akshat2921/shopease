import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../store/reducers/CartSlice";
import { toggleWishlist } from "../store/reducers/wishlistSlice";
import { HeartIcon } from "./Icons";
import StarDisplay from "./StarRating";
import { FALLBACK_IMAGE, handleImgError } from "../utils/img";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const isWishlisted = useSelector((state) =>
    state.wishlist.items.some((item) => item.id === product.id)
  );

  const hasDiscount = product.discount > 0;
  const finalPrice = hasDiscount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;
  const outOfStock = product.stock === 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
    toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", {
      icon: isWishlisted ? "💔" : "❤️",
    });
  };

  return (
    <div className="group relative flex flex-col rounded-xl border border-white/10 bg-gray-800/60 overflow-hidden hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
      <Link to={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-gray-900">
        <img
          src={product.image || FALLBACK_IMAGE}
          alt={product.title}
          loading="lazy"
          decoding="async"
          onError={handleImgError}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white shadow">
            -{product.discount}%
          </span>
        )}
        {outOfStock && (
          <span className="absolute inset-x-0 bottom-0 bg-black/70 py-1.5 text-center text-xs font-medium text-gray-200">
            Out of stock
          </span>
        )}
      </Link>

      <button
        onClick={handleWishlist}
        aria-label="Toggle wishlist"
        className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition-colors ${
          isWishlisted ? "bg-red-500/90 text-white" : "bg-black/40 text-gray-200 hover:bg-black/60"
        }`}
      >
        <HeartIcon filled={isWishlisted} className="h-4 w-4" />
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs uppercase tracking-wide text-blue-400">{product.category}</span>
        <Link to={`/products/${product.id}`} className="line-clamp-2 font-medium text-white hover:text-blue-300">
          {product.title}
        </Link>
        <div className="flex items-center gap-1.5 text-sm">
          <StarDisplay rating={product.rating?.rate ?? 0} className="h-3.5 w-3.5" />
          <span className="text-gray-500">({product.rating?.count ?? 0})</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">₹{finalPrice}</span>
            {hasDiscount && (
              <span className="text-xs text-gray-500 line-through">₹{product.price}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600 transition-colors disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            {outOfStock ? "Sold out" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
