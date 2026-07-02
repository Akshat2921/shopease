import { useForm } from "react-hook-form";
import { FALLBACK_IMAGE, handleImgError } from "../../utils/img";

const CATEGORIES = [
  "clothing",
  "electronics",
  "home",
  "footwear",
  "accessories",
  "sports",
  "beauty",
  "books",
  "toys",
  "grocery",
];

const ProductForm = ({ defaultValues, onSubmit, submitLabel }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: defaultValues || {
      title: "",
      price: "",
      discount: 0,
      stock: 10,
      category: "clothing",
      image: "",
      description: "",
    },
  });

  const imageUrl = watch("image");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-2xl flex-col gap-4 rounded-xl border border-white/10 bg-gray-800/60 p-6"
    >
      <div>
        <label className="mb-1 block text-sm text-gray-400">Title</label>
        <input
          className="w-full rounded-md border border-white/10 bg-gray-900 p-3 outline-none focus:border-blue-400"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm text-gray-400">Price (₹)</label>
          <input
            type="number"
            step="0.01"
            className="w-full rounded-md border border-white/10 bg-gray-900 p-3 outline-none focus:border-blue-400"
            {...register("price", { required: "Price is required", min: { value: 0, message: "Must be positive" } })}
          />
          {errors.price && <p className="mt-1 text-sm text-red-400">{errors.price.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-400">Discount (%)</label>
          <input
            type="number"
            min={0}
            max={90}
            className="w-full rounded-md border border-white/10 bg-gray-900 p-3 outline-none focus:border-blue-400"
            {...register("discount", { min: { value: 0, message: "Can't be negative" }, max: { value: 90, message: "Max 90%" } })}
          />
          {errors.discount && <p className="mt-1 text-sm text-red-400">{errors.discount.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-400">Stock (units)</label>
          <input
            type="number"
            min={0}
            className="w-full rounded-md border border-white/10 bg-gray-900 p-3 outline-none focus:border-blue-400"
            {...register("stock", { required: "Stock is required", min: { value: 0, message: "Can't be negative" } })}
          />
          {errors.stock && <p className="mt-1 text-sm text-red-400">{errors.stock.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-400">Category</label>
        <select
          className="w-full rounded-md border border-white/10 bg-gray-900 p-3 outline-none focus:border-blue-400"
          {...register("category", { required: true })}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c[0].toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <label className="mb-1 block text-sm text-gray-400">Image URL</label>
          <input
            className="w-full rounded-md border border-white/10 bg-gray-900 p-3 outline-none focus:border-blue-400"
            placeholder="https://..."
            {...register("image", { required: "Image URL is required" })}
          />
          {errors.image && <p className="mt-1 text-sm text-red-400">{errors.image.message}</p>}
          <p className="mt-1 text-xs text-gray-500">
            Tip: use a real image link. If it fails to load, a placeholder is shown automatically.
          </p>
        </div>
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-white/10 bg-gray-900">
          <img
            src={imageUrl || FALLBACK_IMAGE}
            onError={handleImgError}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-400">Description</label>
        <textarea
          rows={4}
          className="w-full rounded-md border border-white/10 bg-gray-900 p-3 outline-none focus:border-blue-400"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
        )}
      </div>

      <button className="mt-2 w-fit rounded-md bg-blue-500 px-6 py-2.5 font-medium hover:bg-blue-600">
        {submitLabel}
      </button>
    </form>
  );
};

export default ProductForm;
