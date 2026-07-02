import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { asyncGetProductById } from "../store/reducers/productSlice";
import { addToCart } from "../store/reducers/CartSlice";
import { toggleWishlist } from "../store/reducers/wishlistSlice";
import { asyncGetReviews, asyncAddReview } from "../store/reducers/reviewSlice";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import ReviewForm from "../components/ReviewForm";
import StarDisplay from "../components/StarRating";
import { HeartIcon } from "../components/Icons";
import { FALLBACK_IMAGE, handleImgError } from "../utils/img";
import axios from "../api/axiosconfig";

// Keyed by product id from the parent, so switching products remounts this
// component and its qty state naturally resets to 1 (no effect needed).
const QtyAddToCart = ({ stock, outOfStock, onAdd }) => {
  const [qty, setQty] = useState(1);

  return (
    <>
      <div className="flex items-center rounded-md border border-white/10">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="h-11 w-11 text-lg text-gray-300 hover:bg-white/5"
        >
          −
        </button>
        <span className="w-10 text-center">{qty}</span>
        <button
          onClick={() => setQty((q) => Math.min(stock || 99, q + 1))}
          className="h-11 w-11 text-lg text-gray-300 hover:bg-white/5"
        >
          +
        </button>
      </div>

      <button
        onClick={() => onAdd(qty)}
        disabled={outOfStock}
        className="rounded-md bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600 transition-colors disabled:cursor-not-allowed disabled:bg-gray-600"
      >
        {outOfStock ? "Sold out" : "Add to Cart"}
      </button>
    </>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, status } = useSelector((state) => state.products);
  const currentUser = useSelector((state) => state.user.currentUser);
  const isWishlisted = useSelector((state) =>
    product ? state.wishlist.items.some((item) => item.id === product.id) : false
  );
  const reviews = useSelector((state) => state.reviews.items);

  const [related, setRelated] = useState([]);

  useEffect(() => {
    dispatch(asyncGetProductById(id));
    dispatch(asyncGetReviews(id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, id]);

  useEffect(() => {
    if (!product) return;
    axios
      .get(`/products?category=${product.category}&_limit=5`)
      .then((res) => setRelated(res.data.filter((p) => p.id !== product.id).slice(0, 4)))
      .catch(() => setRelated([]));
  }, [product]);

  if (status === "loading" || !product || product.id !== id) return <Loader label="Loading product..." />;

  const hasDiscount = product.discount > 0;
  const finalPrice = hasDiscount ? Math.round(product.price * (1 - product.discount / 100)) : product.price;
  const outOfStock = product.stock === 0;

  const handleAddToCart = (qty) => {
    for (let i = 0; i < qty; i++) dispatch(addToCart(product));
    toast.success(`${qty} × ${product.title} added to cart`);
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
    toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", {
      icon: isWishlisted ? "💔" : "❤️",
    });
  };

  const handleReviewSubmit = async ({ rating, comment }) => {
    if (!currentUser) {
      toast.error("Please login to write a review");
      return;
    }
    await dispatch(
      asyncAddReview({
        productId: product.id,
        userId: currentUser.id,
        username: currentUser.username,
        rating,
        comment,
      })
    );
    toast.success("Review submitted!");
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : product.rating?.rate ?? 0;

  return (
    <div>
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-gray-500">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-blue-400">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="capitalize hover:text-blue-400">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-300 line-clamp-1">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-800">
          <img
            src={product.image || FALLBACK_IMAGE}
            onError={handleImgError}
            alt={product.title}
            className="h-full w-full object-cover"
          />
          {hasDiscount && (
            <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-sm font-semibold text-white shadow">
              -{product.discount}%
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-wide text-blue-400">{product.category}</span>
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <div className="flex items-center gap-2">
            <StarDisplay rating={avgRating} className="h-5 w-5" />
            <span className="text-gray-500">
              {avgRating.toFixed(1)} ({reviews.length || product.rating?.count || 0} reviews)
            </span>
          </div>
          <p className="text-gray-400">{product.description}</p>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">₹{finalPrice}</span>
            {hasDiscount && <span className="text-lg text-gray-500 line-through">₹{product.price}</span>}
          </div>

          <p className={`text-sm font-medium ${outOfStock ? "text-red-400" : "text-green-400"}`}>
            {outOfStock ? "Out of stock" : `In stock — ${product.stock} available`}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <QtyAddToCart
              key={product.id}
              stock={product.stock}
              outOfStock={outOfStock}
              onAdd={handleAddToCart}
            />

            <button
              onClick={handleWishlist}
              className={`flex items-center gap-2 rounded-md border px-4 py-3 font-medium transition-colors ${
                isWishlisted
                  ? "border-red-400/50 bg-red-500/10 text-red-300"
                  : "border-white/10 text-gray-300 hover:bg-white/5"
              }`}
            >
              <HeartIcon filled={isWishlisted} className="h-5 w-5" />
              {isWishlisted ? "Wishlisted" : "Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-semibold">Customer Reviews</h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
          <ReviewForm onSubmit={handleReviewSubmit} />

          <div className="flex flex-col gap-4">
            {reviews.length === 0 && (
              <p className="text-gray-500">No reviews yet — be the first to share your thoughts!</p>
            )}
            {reviews.map((r) => (
              <div key={r.id} className="rounded-xl border border-white/10 bg-gray-800/40 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white">{r.username}</p>
                  <span className="text-xs text-gray-500">{r.date}</span>
                </div>
                <StarDisplay rating={r.rating} className="mt-1 h-3.5 w-3.5" />
                <p className="mt-2 text-sm text-gray-400">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold">You might also like</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
