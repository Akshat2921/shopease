import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="-mx-[10%] mt-20 border-t border-white/10 bg-gray-900/60 px-[10%] py-10">
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
      <div>
        <p className="text-lg font-bold text-white">
          Shop<span className="text-blue-400">Ease</span>
        </p>
        <p className="mt-2 max-w-xs text-sm text-gray-400">
          Everyday essentials — electronics, fashion, home & more, delivered to your door.
        </p>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-white">Shop</p>
        <div className="flex flex-col gap-2 text-sm text-gray-400">
          <Link to="/products" className="hover:text-blue-400">All Products</Link>
          <Link to="/wishlist" className="hover:text-blue-400">Wishlist</Link>
          <Link to="/cart" className="hover:text-blue-400">Cart</Link>
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-white">Account</p>
        <div className="flex flex-col gap-2 text-sm text-gray-400">
          <Link to="/login" className="hover:text-blue-400">Login</Link>
          <Link to="/register" className="hover:text-blue-400">Register</Link>
          <Link to="/orders" className="hover:text-blue-400">My Orders</Link>
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-white">Support</p>
        <p className="text-sm text-gray-400">This is a demo storefront built for a portfolio project.</p>
        <p className="mt-2 text-sm text-gray-400">No real payments are processed.</p>
      </div>
    </div>

    <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
      © {new Date().getFullYear()} ShopEase. Built with React, Redux Toolkit & Tailwind.
    </div>
  </footer>
);

export default Footer;
