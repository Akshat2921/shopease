import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncUpdateUser } from "../../store/reducers/userSlice";

const ProfileUser = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { username: currentUser?.username, email: currentUser?.email },
  });

  const onSave = async (formData) => {
    await dispatch(asyncUpdateUser({ ...currentUser, ...formData }));
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-md py-10">
      <h1 className="mb-8 text-2xl font-semibold">My Profile</h1>

      {!editing ? (
        <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-gray-800/60 p-6">
          <div>
            <p className="text-xs uppercase text-gray-500">Username</p>
            <p className="text-lg">{currentUser.username}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-gray-500">Email</p>
            <p className="text-lg">{currentUser.email}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-gray-500">Role</p>
            <p className="text-lg">{currentUser.isAdmin ? "Admin" : "Customer"}</p>
          </div>
          {saved && <p className="text-sm text-green-400">Profile updated!</p>}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setEditing(true)}
              className="w-fit rounded-md bg-blue-500 px-4 py-2 text-sm font-medium hover:bg-blue-600"
            >
              Edit Profile
            </button>
            {!currentUser.isAdmin && (
              <>
                <Link
                  to="/orders"
                  className="w-fit rounded-md border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                >
                  My Orders
                </Link>
                <Link
                  to="/wishlist"
                  className="w-fit rounded-md border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                >
                  My Wishlist
                </Link>
              </>
            )}
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSave)}
          className="flex flex-col gap-4 rounded-xl border border-white/10 bg-gray-800/60 p-6"
        >
          <input
            className="rounded-md border border-white/10 bg-gray-900 p-3 outline-none focus:border-blue-400"
            {...register("username", { required: true })}
          />
          <input
            className="rounded-md border border-white/10 bg-gray-900 p-3 outline-none focus:border-blue-400"
            type="email"
            {...register("email", { required: true })}
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-md border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
            >
              Cancel
            </button>
            <button className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium hover:bg-blue-600">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileUser;
