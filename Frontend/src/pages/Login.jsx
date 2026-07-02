import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { asyncLoginUser, clearUserError } from "../store/reducers/userSlice";

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const loginHandler = async (credentials) => {
    dispatch(clearUserError());
    const result = await dispatch(asyncLoginUser(credentials));
    if (asyncLoginUser.fulfilled.match(result)) {
      toast.success(`Welcome back, ${result.payload.username}!`);
      navigate("/");
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-10">
      <h1 className="mb-8 text-2xl font-semibold">Login to ShopEase</h1>

      <form onSubmit={handleSubmit(loginHandler)} className="flex w-full flex-col gap-4">
        <div>
          <input
            className="w-full rounded-md border border-white/10 bg-gray-800 p-3 outline-none focus:border-blue-400"
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <input
            className="w-full rounded-md border border-white/10 bg-gray-800 p-3 outline-none focus:border-blue-400"
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          disabled={status === "loading"}
          className="mt-2 rounded-md bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link className="text-blue-400 hover:underline" to="/register">
            Register
          </Link>
        </p>

        <p className="text-center text-xs text-gray-500">
          Demo admin: admin@shop.com / admin123
        </p>
      </form>
    </div>
  );
};
