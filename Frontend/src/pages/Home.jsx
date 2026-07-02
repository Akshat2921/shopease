import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetProducts } from "../store/reducers/productSlice";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const CATEGORY_TILES = [
  { key: "clothing", label: "Clothing", emoji: "👕" },
  { key: "electronics", label: "Electronics", emoji: "🎧" },
  { key: "home", label: "Home", emoji: "🏠" },
  { key: "footwear", label: "Footwear", emoji: "👟" },
  { key: "accessories", label: "Accessories", emoji: "🕶️" },
  { key: "sports", label: "Sports", emoji: "🏏" },
  { key: "beauty", label: "Beauty", emoji: "💄" },
  { key: "books", label: "Books", emoji: "📚" },
  { key: "toys", label: "Toys", emoji: "🧸" },
  { key: "grocery", label: "Grocery", emoji: "🛒" },
];

const PERKS = [
  { title: "Free Shipping", desc: "On all orders over ₹999", icon: "🚚" },
  { title: "Easy Returns", desc: "7-day hassle-free returns", icon: "↩️" },
  { title: "Secure Checkout", desc: "Your data stays protected", icon: "🔒" },
  { title: "24/7 Support", desc: "We're here whenever you need us", icon: "💬" },
];

const Home = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(asyncGetProducts({ page: 1 }));
  }, [dispatch]);

  return (
    <div>
      <section className="flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-blue-500/20 via-gray-800 to-gray-800 px-6 py-16 text-center sm:py-20">
        <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300">
          New arrivals every week
        </span>
        <h1 className="text-4xl font-bold sm:text-5xl">
          Everyday essentials, <span className="text-blue-400">delivered.</span>
        </h1>
        <p className="max-w-xl text-gray-400">
          Electronics, fashion, home & more — browse a curated catalog across 10 categories and
          check out in seconds.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/products"
            className="rounded-md bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600 transition-colors"
          >
            Shop Now
          </Link>
          <Link
            to="/products?category=electronics"
            className="rounded-md border border-white/15 px-6 py-3 font-medium text-gray-200 hover:bg-white/5 transition-colors"
          >
            Explore Electronics
          </Link>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-6 text-2xl font-semibold">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORY_TILES.map((cat) => (
            <Link
              key={cat.key}
              to={`/products?category=${cat.key}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-gray-800/60 p-5 text-center transition-colors hover:border-blue-400/50 hover:bg-gray-800"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-sm font-medium text-gray-200">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <Link to="/products" className="text-sm text-blue-400 hover:underline">
            View all →
          </Link>
        </div>

        {status === "loading" ? (
          <Loader label="Loading products..." />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PERKS.map((perk) => (
          <div
            key={perk.title}
            className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-gray-800/40 p-6 text-center"
          >
            <span className="text-2xl">{perk.icon}</span>
            <p className="font-medium text-white">{perk.title}</p>
            <p className="text-sm text-gray-400">{perk.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
