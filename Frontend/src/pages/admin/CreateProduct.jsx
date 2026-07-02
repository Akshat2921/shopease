import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { asyncCreateProduct } from "../../store/reducers/productSlice";
import ProductForm from "./ProductForm";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    const product = {
      ...formData,
      id: nanoid(),
      price: Number(formData.price),
      discount: Number(formData.discount) || 0,
      stock: Number(formData.stock) || 0,
      rating: { rate: 0, count: 0 },
    };
    await dispatch(asyncCreateProduct(product));
    toast.success("Product created");
    navigate("/admin");
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add New Product</h1>
      <ProductForm onSubmit={handleCreate} submitLabel="Create Product" />
    </div>
  );
};

export default CreateProduct;
