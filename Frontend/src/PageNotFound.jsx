import { Link } from "react-router-dom";

const PageNotFound = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
    <h1 className="text-6xl font-bold text-blue-400">404</h1>
    <p className="text-gray-400">The page you're looking for doesn't exist.</p>
    <Link
      to="/"
      className="mt-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
    >
      Back to Home
    </Link>
  </div>
);

export default PageNotFound;
