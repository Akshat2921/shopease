import { useState } from "react";
import { useForm } from "react-hook-form";
import { StarInput } from "./StarRating";

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const submit = (data) => {
    if (rating === 0) {
      setRatingError("Please select a star rating");
      return;
    }
    onSubmit({ ...data, rating });
    reset();
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-gray-800/60 p-5">
      <p className="font-medium text-white">Write a review</p>
      <div>
        <StarInput value={rating} onChange={(v) => { setRating(v); setRatingError(""); }} />
        {ratingError && <p className="mt-1 text-sm text-red-400">{ratingError}</p>}
      </div>
      <textarea
        rows={3}
        placeholder="Share your experience with this product..."
        className="w-full rounded-md border border-white/10 bg-gray-900 p-3 text-sm outline-none focus:border-blue-400"
        {...register("comment", { required: "Please write a short comment" })}
      />
      {errors.comment && <p className="text-sm text-red-400">{errors.comment.message}</p>}
      <button className="w-fit rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
