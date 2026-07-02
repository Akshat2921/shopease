import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { asyncRegisterUser, clearUserError } from "../store/reducers/userSlice";

export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const registerHandler = async (formData) => {
    dispatch(clearUserError());
    const user = { ...formData, id: nanoid(), isAdmin: false };
    const result = await dispatch(asyncRegisterUser(user));
    if (asyncRegisterUser.fulfilled.match(result)) {
      toast.success(`Welcome to ShopEase, ${result.payload.username}!`);
      navigate("/");
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-10">
      <h1 className="mb-8 text-2xl font-semibold">Create your account</h1>

      <form onSubmit={handleSubmit(registerHandler)} className="flex w-full flex-col gap-4">
        <div>
          <input
            className="w-full rounded-md border border-white/10 bg-gray-800 p-3 outline-none focus:border-blue-400"
            type="text"
            placeholder="Username e.g. john-doe"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>}
        </div>

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
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
          />
          {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          disabled={status === "loading"}
          className="mt-2 rounded-md bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {status === "loading" ? "Creating account..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link className="text-blue-400 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
