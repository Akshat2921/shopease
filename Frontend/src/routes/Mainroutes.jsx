import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";
import ProtectedRoute from "./ProtectedRoute";

// Route-level code splitting: each page is only downloaded when the user
// actually navigates to it, instead of bundling everything into main.js.
const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Login = lazy(() => import("../pages/Login").then((m) => ({ default: m.Login })));
const Register = lazy(() => import("../pages/Register").then((m) => ({ default: m.Register })));
const Cart = lazy(() => import("../pages/user/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const OrderConfirmation = lazy(() => import("../pages/OrderConfirmation"));
const Orders = lazy(() => import("../pages/user/Orders"));
const Wishlist = lazy(() => import("../pages/user/Wishlist"));
const ProfileUser = lazy(() => import("../pages/user/ProfileUser"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const UpdateProduct = lazy(() => import("../pages/admin/UpdateProduct"));
const PageNotFound = lazy(() => import("../PageNotFound"));

export const Mainroutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-confirmation/:orderId"
          element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <ProtectedRoute requireAdmin>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <ProtectedRoute requireAdmin>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};
