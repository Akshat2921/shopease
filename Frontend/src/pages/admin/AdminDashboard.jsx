import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  asyncGetProducts,
  asyncDeleteProduct,
  setPage,
} from "../../store/reducers/productSlice";
import Pagination from "../../components/Pagination";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loader from "../../components/Loader";
import { FALLBACK_IMAGE, handleImgError } from "../../utils/img";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { items, page, pageSize, totalCount, status } = useSelector((state) => state.products);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(asyncGetProducts({ page }));
  }, [dispatch, page]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin · Products</h1>
          <p className="text-sm text-gray-500">{totalCount} product(s) total</p>
        </div>
        <Link
          to="/admin/create"
          className="w-fit rounded-md bg-blue-500 px-4 py-2 text-sm font-medium hover:bg-blue-600"
        >
          + Add Product
        </Link>
      </div>

      {status === "loading" ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product) => (
                <tr key={product.id} className="border-t border-white/5">
                  <td className="p-3">
                    <img
                      src={product.image || FALLBACK_IMAGE}
                      onError={handleImgError}
                      alt={product.title}
                      className="h-10 w-10 rounded object-cover"
                    />
                  </td>
                  <td className="p-3">{product.title}</td>
                  <td className="p-3 capitalize text-gray-400">{product.category}</td>
                  <td className="p-3">
                    ₹{product.price}
                    {product.discount > 0 && (
                      <span className="ml-1 text-xs text-green-400">-{product.discount}%</span>
                    )}
                  </td>
                  <td className="p-3">
                    {product.stock === 0 ? (
                      <span className="text-red-400">Out of stock</span>
                    ) : (
                      product.stock
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      to={`/admin/edit/${product.id}`}
                      className="mr-3 text-blue-400 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleteId(product.id)}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={(p) => dispatch(setPage(p))}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete product?"
        message="This action cannot be undone."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          dispatch(asyncDeleteProduct(deleteId));
          toast.info("Product deleted");
          setDeleteId(null);
        }}
      />
    </div>
  );
};

export default AdminDashboard;
