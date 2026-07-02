import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogoutUser } from "../store/reducers/userSlice";
import { CartIcon, HeartIcon, MenuIcon, XIcon } from "./Icons";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block rounded-md px-3 py-3 text-base font-medium transition-colors ${
    isActive ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
  }`;

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.qty, 0)
  );
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  const handleLogout = () => {
    dispatch(asyncLogoutUser());
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-30 -mx-[10%] mb-8 border-b border-white/10 bg-gray-900/95 px-[10%] backdrop-blur">
      <div className="flex items-center justify-between py-4">
        <NavLink to="/" className="text-xl font-bold tracking-tight text-white" onClick={closeMenu}>
          Shop<span className="text-blue-400">Ease</span>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>
          {currentUser?.isAdmin && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
          <NavLink to="/wishlist" className={`${linkClass} relative`}>
            <span className="flex items-center gap-1.5">
              <HeartIcon className="h-4 w-4" />
              Wishlist
              {wishlistCount > 0 && (
                <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] text-white">
                  {wishlistCount}
                </span>
              )}
            </span>
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            <span className="flex items-center gap-1.5">
              <CartIcon className="h-4 w-4" />
              Cart
              {cartCount > 0 && (
                <span className="rounded-full bg-blue-500 px-1.5 py-0.5 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </span>
          </NavLink>

          {currentUser ? (
            <>
              {!currentUser.isAdmin && (
                <NavLink to="/orders" className={linkClass}>
                  Orders
                </NavLink>
              )}
              <NavLink to="/profile" className={linkClass}>
                {currentUser.username}
              </NavLink>
              <button
                onClick={handleLogout}
                className="ml-2 rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-gray-200 hover:bg-white/20 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="ml-2 rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="rounded-md p-2 text-gray-200 hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-white/10 pb-4 pt-2 md:hidden">
          <NavLink to="/" end className={mobileLinkClass} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/products" className={mobileLinkClass} onClick={closeMenu}>
            Products
          </NavLink>
          {currentUser?.isAdmin && (
            <NavLink to="/admin" className={mobileLinkClass} onClick={closeMenu}>
              Admin
            </NavLink>
          )}
          <NavLink to="/wishlist" className={mobileLinkClass} onClick={closeMenu}>
            Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
          </NavLink>
          <NavLink to="/cart" className={mobileLinkClass} onClick={closeMenu}>
            Cart {cartCount > 0 && `(${cartCount})`}
          </NavLink>
          {currentUser ? (
            <>
              {!currentUser.isAdmin && (
                <NavLink to="/orders" className={mobileLinkClass} onClick={closeMenu}>
                  Orders
                </NavLink>
              )}
              <NavLink to="/profile" className={mobileLinkClass} onClick={closeMenu}>
                {currentUser.username}
              </NavLink>
              <button
                onClick={handleLogout}
                className="mt-1 rounded-md bg-white/10 px-3 py-3 text-left text-base font-medium text-gray-200 hover:bg-white/20"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={mobileLinkClass} onClick={closeMenu}>
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="mt-1 rounded-md bg-blue-500 px-3 py-3 text-base font-medium text-white hover:bg-blue-600"
                onClick={closeMenu}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
