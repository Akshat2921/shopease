import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { asyncGetProductById, asyncUpdateProduct } from "../../store/reducers/productSlice";
import ProductForm from "./ProductForm";
import Loader from "../../components/Loader";

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct: product, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(asyncGetProductById(id));
  }, [dispatch, id]);

  const handleUpdate = async (formData) => {
    await dispatch(
      asyncUpdateProduct({
        ...product,
        ...formData,
        price: Number(formData.price),
        discount: Number(formData.discount) || 0,
        stock: Number(formData.stock) || 0,
      })
    );
    toast.success("Product updated");
    navigate("/admin");
  };

  if (status === "loading" || !product || product.id !== id) return <Loader />;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit Product</h1>
      <ProductForm defaultValues={product} onSubmit={handleUpdate} submitLabel="Save Changes" />
    </div>
  );
};

export default UpdateProduct;
