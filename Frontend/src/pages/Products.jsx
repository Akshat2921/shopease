import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetProducts, setCategory, setPage, setSearch, setSort } from "../store/reducers/productSlice";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

const CATEGORIES = [
  "all",
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

const SORT_OPTIONS = [
  { value: "", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
];

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { items, page, pageSize, totalCount, category, search, sort, status, error } = useSelector(
    (state) => state.products
  );
  const [searchInput, setSearchInput] = useState(search);

  // support deep links like /products?category=electronics from Home page tiles
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== category) dispatch(setCategory(cat));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(asyncGetProducts({ page, category, search, sort }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category, search, sort]);

  // debounce the search box so we don't hit the API on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== search) dispatch(setSearch(searchInput));
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">All Products</h1>
          {status === "succeeded" && (
            <p className="mt-1 text-sm text-gray-500">{totalCount} product(s) found</p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="rounded-md border border-white/10 bg-gray-800 px-3 py-2 text-sm outline-none focus:border-blue-400"
          />
          <select
            value={category}
            onChange={(e) => dispatch(setCategory(e.target.value === "all" ? "" : e.target.value))}
            className="rounded-md border border-white/10 bg-gray-800 px-3 py-2 text-sm outline-none focus:border-blue-400"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c[0].toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value))}
            className="rounded-md border border-white/10 bg-gray-800 px-3 py-2 text-sm outline-none focus:border-blue-400"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                Sort: {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === "loading" && <Loader label="Loading products..." />}
      {status === "failed" && <p className="text-center text-red-400">{error}</p>}

      {status === "succeeded" && items.length === 0 && (
        <p className="py-16 text-center text-gray-400">No products match your search.</p>
      )}

      {status === "succeeded" && items.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
            onPageChange={(p) => dispatch(setPage(p))}
          />
        </>
      )}
    </div>
  );
};

export default Products;
